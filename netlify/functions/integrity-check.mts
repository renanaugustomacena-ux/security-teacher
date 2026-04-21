/**
 * integrity-check.mts — Netlify scheduled function
 *
 * Runs weekly (Monday 12:00 UTC). For each vendored asset pinned in
 * vendor/integrity.json it:
 *   1. Fetches the live production URL.
 *   2. Computes the sha256 of the response body.
 *   3. Compares it with the repo pin.
 *
 * It also spot-checks that the deployed HTML carries the critical security
 * response headers (CSP / HSTS / COOP / X-Content-Type-Options). Any mismatch
 * or missing header is logged and — if INTEGRITY_WEBHOOK env var is set —
 * posted to that URL as a JSON payload for paging / Discord / email relay.
 *
 * Env:
 *   URL                  Netlify-provided primary production URL.
 *   INTEGRITY_WEBHOOK    Optional outbound webhook for alerts.
 *   INTEGRITY_TARGET     Optional override for the base URL (tests / staging).
 */
import integrity from '../../vendor/integrity.json' with { type: 'json' };

// Inline the Netlify scheduled-function config shape to avoid a devDep for
// types only. Netlify runtime reads the `schedule` field from `config`.
type ScheduledConfig = { schedule: string };

type AssetReport = {
  asset: string;
  expected: string;
  actual: string;
  status: number;
  ok: boolean;
  error?: string;
};

type HeaderReport = {
  header: string;
  present: boolean;
  sample: string;
};

type Report = {
  at: string;
  base: string;
  assets: AssetReport[];
  headers: HeaderReport[];
  ok: boolean;
};

const REQUIRED_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'cross-origin-opener-policy',
  'x-content-type-options',
  'referrer-policy',
];

async function sha256Hex(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getBaseUrl(): string | null {
  const override = process.env.INTEGRITY_TARGET;
  if (override) return override.replace(/\/+$/, '');
  const primary = process.env.URL;
  if (primary) return primary.replace(/\/+$/, '');
  return null;
}

async function checkAsset(base: string, path: string, expected: string): Promise<AssetReport> {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const buf = await res.arrayBuffer();
    const actual = await sha256Hex(buf);
    return {
      asset: path,
      expected,
      actual,
      status: res.status,
      ok: res.ok && actual === expected,
    };
  } catch (err) {
    return {
      asset: path,
      expected,
      actual: '',
      status: 0,
      ok: false,
      error: (err as Error).message,
    };
  }
}

async function checkHeaders(base: string): Promise<HeaderReport[]> {
  try {
    const res = await fetch(`${base}/`, { cache: 'no-store', redirect: 'follow' });
    return REQUIRED_HEADERS.map((name) => {
      const raw = res.headers.get(name) ?? '';
      return {
        header: name,
        present: raw.length > 0,
        sample: raw.length > 80 ? `${raw.slice(0, 80)}…` : raw,
      };
    });
  } catch {
    return REQUIRED_HEADERS.map((name) => ({ header: name, present: false, sample: '' }));
  }
}

async function forward(report: Report): Promise<void> {
  const webhook = process.env.INTEGRITY_WEBHOOK;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(report),
    });
  } catch (err) {
    console.warn('[integrity] webhook failed:', (err as Error).message);
  }
}

export default async (): Promise<Response> => {
  const base = getBaseUrl();
  if (!base) {
    console.warn('[integrity] no URL env var; skipping');
    return new Response('no base url', { status: 500 });
  }

  const entries = Object.entries(integrity.assets) as Array<[string, string]>;
  const assets = await Promise.all(entries.map(([path, hash]) => checkAsset(base, path, hash)));
  const headers = await checkHeaders(base);
  const ok = assets.every((a) => a.ok) && headers.every((h) => h.present);

  const report: Report = {
    at: new Date().toISOString(),
    base,
    assets,
    headers,
    ok,
  };

  if (ok) {
    console.info('[integrity] ok', JSON.stringify({ base, checked: assets.length }));
  } else {
    console.warn('[integrity] DRIFT', JSON.stringify(report));
    await forward(report);
  }

  return Response.json(report);
};

export const config: ScheduledConfig = {
  schedule: '0 12 * * 1',
};
