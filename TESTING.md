# DevUtils Testing

## Critical regression tests

The first automated suite protects the highest-priority fixes from the initial
audit:

- UTF-8 Base64 encoding and decoding.
- compressed IPv6 validation.
- quoted, escaped and multiline CSV fields.
- nested JSON/YAML values and scalar types.
- sandboxing of the HTML Preview iframe.

Run it with Node.js:

```bash
node --test tests/critical-tools.test.cjs
```

The suite is intentionally dependency-free so it can run without installing a
package manager or changing the static-site architecture.

## What these tests do not prove

Passing this suite does not certify all 68 tools. It proves only the named
regressions. Each future bug fix should add a small failing test before or with
the correction so the safety net grows from verified behaviour rather than
assumptions.
