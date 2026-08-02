# DevUtils Testing

## Critical regression tests

The first automated suite protects the highest-priority fixes from the initial
audit:

- UTF-8 Base64 encoding and decoding.
- compressed IPv6 validation.
- quoted, escaped and multiline CSV fields.
- nested JSON/YAML values and scalar types.
- JSON to XML escaping, arrays, null values and invalid XML tag names.
- Conservative JavaScript, CSS and HTML minification safety cases.
- sandboxing of the HTML Preview iframe.
- Regex Tester flags, literal syntax, capture groups, match indexes and
  zero-length match safety, including a 1,000-result display cap and isolated
  worker wiring.
- User-controlled comparison output avoids `innerHTML`.
- Legacy form controls receive a shared accessible-name fallback when no
  explicit or wrapping label exists.
- Sitemap URLs are unique and resolve to local pages.
- The 68 catalog routes exist and have core SEO metadata plus valid JSON-LD.
- Local links, stylesheets, scripts and images referenced by HTML pages exist.

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
