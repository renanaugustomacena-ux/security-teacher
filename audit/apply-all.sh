#!/bin/bash
# Apply all per-domain fixes JSONs, then re-audit and validate.
set -e

cd "$(dirname "$0")/.."

echo "=== Applying per-domain fixes ==="
for json in audit/per-domain/*.fixes.json; do
  [ -f "$json" ] || continue
  domain=$(basename "$json" .fixes.json | sed 's/\.chunk[0-9]*//')
  src="js/topics/data/${domain}.js"
  if [ ! -f "$src" ]; then
    echo "SKIP: $domain (no source file)"
    continue
  fi
  echo "--- $(basename "$json") → $domain ---"
  node audit/apply-fixes.js "$src" "$json" 2>&1 | tail -1
  if ! node --check "$src" 2>/dev/null; then
    echo "SYNTAX ERROR in $src — attempting recovery"
    node audit/fix-syntax-errors.js "$src" 2>&1 | tail -3
  fi
done

echo ""
echo "=== Re-running prettier (normalizes any quoting drift) ==="
npx prettier --write 'js/topics/data/*.js' 2>&1 | tail -3

echo ""
echo "=== Final syntax check ==="
for f in js/topics/data/*.js; do
  if ! node --check "$f" 2>/dev/null; then
    echo "STILL BROKEN: $f"
  fi
done

echo ""
echo "=== Re-running audit ==="
node audit/exercise-quality-audit.js 2>&1 | tail -30
