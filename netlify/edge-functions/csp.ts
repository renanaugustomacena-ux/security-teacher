/**
 * csp.ts — Netlify Edge Function
 *
 * Generates a cryptographically random nonce per HTML response, rewrites every
 * <script> / <style> open tag to include nonce="{NONCE}", and emits a strict
 * Content-Security-Policy header referencing the same nonce. 'strict-dynamic'
 * lets the nonced bootstrap transitively trust its module imports without
 * per-path allowlisting.
 *
 * Binding: netlify.toml [[edge_functions]] path = "/*" (HTML only is enforced
 * by the content-type check below; non-HTML responses pass through untouched).
 */
import type { Context } from 'https://edge.netlify.com';

// CSP base — {NONCE} placeholder is replaced per request. Keep sources pinned
// to concrete origins; no wildcards outside googleusercontent.com for avatars.
const CSP_TEMPLATE = [
  "default-src 'self'",
  "script-src 'self' 'nonce-{NONCE}' 'strict-dynamic' https://accounts.google.com",
  "style-src 'self' 'nonce-{NONCE}'",
  "img-src 'self' blob: data: https://lh3.googleusercontent.com https://*.googleusercontent.com",
  "media-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://lrclib.net https://api.mymemory.translated.net https://accounts.google.com https://oauth2.googleapis.com",
  "frame-src https://accounts.google.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
  "require-trusted-types-for 'script'",
  "trusted-types default",
  'report-uri /csp-report',
].join('; ');

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/=+$/, '');
}

export default async (request: Request, context: Context): Promise<Response | void> => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('text/html')) return response;

  const nonce = generateNonce();
  const originalHtml = await response.text();

  // Inject nonce into every <script ...> and <style ...> open tag that does
  // not already carry one. Self-closing and inline variants are both covered
  // by matching the tag prefix up to the next whitespace / '>'.
  const withNonce = originalHtml.replace(
    /<(script|style)(\s[^>]*)?>/gi,
    (match, tag, attrs = '') => {
      if (/\snonce\s*=/.test(match)) return match;
      return `<${tag} nonce="${nonce}"${attrs || ''}>`;
    }
  );

  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', CSP_TEMPLATE.replaceAll('{NONCE}', nonce));
  headers.delete('content-length');

  return new Response(withNonce, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = {
  path: '/*',
};
