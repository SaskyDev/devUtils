# Project Log

## Savepoint – New Tools, Security Fix and SEO Cleanup

Date: 2026-04-07

### Main outcomes

- Added 6 new tool pages: Email Regex Generator, Regex Cheatsheet, Regex Replace, Remove Duplicate Lines, Sort Lines and Text Cleaner
- Created `js/regexTools.js` with logic for all Regex category tools (tester, email-regex-generator, cheatsheet, replace)
- Registered Regex Replace in `js/ui.js` navToolsList — catalog now has 54 tools
- Added Regex Tools filter button to `all-tools.html`
- Fixed password generator: replaced insecure `Math.random()` with `crypto.getRandomValues()` in `js/securityTools.js`
- Fixed `copyResult` using wrong key (`sourceId` → `outputId`) in `js/securityTools.js`
- Enhanced Regex Cheatsheet: expanded content (quantifiers, groups, lookaround), mini-tester shows all matches with count, added Copy/Clear buttons
- Added canonical links to ~33 tool pages that were missing them
- Added Google Analytics tag to 6 tool pages that were missing it
- Updated `sitemap.xml` with 6 new entries — now 57 URLs total
- Removed 126 AppleDouble (`._*`) files from the repository

### Current catalog snapshot

- Total tools in the catalog: 54
- Active categories: Core Dev, Encoding Tools, Validation Tools, Security Tools, Text Tools, Utility Tools, Color Tools, HTML Tools and Regex Tools
- Source of truth for the live catalog: `js/ui.js`

### Architecture snapshot

- `js/regexTools.js` groups regex tester, email regex generator, regex cheatsheet and regex replace logic
- All other domain JS files unchanged from previous savepoint

### Validation completed

- 54 entries in navToolsList match 54 tool folders
- Sitemap has 57 URLs (54 tools + 2 main pages + 1 sub-page)
- All tool pages have Google Analytics (G-FXL6J1QX2M) and canonical links
- No lint or editor diagnostics errors in changed files
- Commit `d4d4e80` pushed to main

---

## Savepoint – Domain Refactor and Catalog Cleanup

Date: 2026-03-31

This savepoint captures the current production-aligned state of DevUtils after the domain-based refactor.

### Main outcomes for 2026-03-29

- Reorganized browser logic into domain files such as `js/devTools.js`, `js/validationTools.js` and `js/htmlTools.js`
- Added and normalized tool pages including Code Beautifier, SQL Formatter, Email Validator, IP Validator, HTML Encoder / Decoder, HTML to Markdown and JSON String Escape
- Removed legacy JavaScript files no longer referenced by any tool page
- Fixed semantic regressions discovered after the refactor, including JWT UTF-8 decoding and JSON Compare layout preservation
- Updated category navigation, canonical URLs, examples and Markdown documentation

### Current catalog snapshot

- Total tools in the catalog: 48
- Active categories: Core Dev, Encoding Tools, Validation Tools, Security Tools, Text Tools, Utility Tools, Color Tools and HTML Tools
- Source of truth for the live catalog: `js/ui.js`

### Architecture snapshot

- `js/ui.js` contains the tool registry, navbar and shared search UI
- `js/main.js` contains shared helper behavior such as copy feedback and output helpers
- `js/devTools.js` groups JSON, parsing, formatting, diff and minification utilities
- `js/encodingTools.js` groups Base64, URL, HTML, JSON escaping and image conversion helpers
- `js/validationTools.js` groups email, IP, UUID and password strength validation
- `js/securityTools.js` groups hashing, JWT and password generation flows
- `js/textTools.js` keeps text manipulation utilities only
- `js/utilityTools.js` groups date, timestamp, random number and base conversion utilities
- `js/colorTools.js` groups color conversion and picker helpers
- `js/htmlTools.js` groups HTML and Markdown conversion, minification and preview logic

### Validation completed for 2026-03-29

- Canonical links aligned with real routes, including JWT Decoder and JSON XML Converter
- Tool routes declared in `js/ui.js` resolve to existing pages
- JSON Compare keeps its structural layout after rendering diffs
- JWT Decoder handles Base64URL and UTF-8 payloads correctly
- Updated pages pass editor diagnostics in the changed files reviewed during this savepoint

---

## Savepoint – SEO Expansion and UX Fixes

Date: 2026-03-29

### Main outcomes

- Expanded SEO metadata and explanatory content in multiple tool pages
- Improved UX feedback in selected JavaScript tools
- Updated `sitemap.xml` priorities for stronger indexing signals
- Confirmed production domain purchase and configuration

### Updated pages and logic

- `sitemap.xml`
- `js/securityTools.js`
- `tools/base64/index.html`
- `tools/json-compare/index.html`
- `tools/json-formatter/index.html`
- `tools/password-generator/index.html`
- `tools/regex-tester/index.html`
- `tools/text-diff/index.html`
- `tools/url-extractor/index.html`

### Validation completed

- JavaScript syntax checks passed for the updated JS files in that iteration
- `sitemap.xml` validated as well-formed XML
- No unresolved merge conflict markers detected

---

## Savepoint – Early Public Foundation

Date: 2026-03-21

This stage established the first public foundation of the project.

### Foundation highlights

- Homepage, shared layout and tool-card presentation were standardized
- Search and navigation were added to improve discoverability
- Tool pages adopted a repeatable SEO-friendly structure with examples and related links
- The site became publicly accessible under the custom domain
- Initial Google Search Console and sitemap setup were completed

### Historical note

At that point the project had a smaller catalog and simpler JavaScript organization. The current architecture and tool taxonomy supersede that earlier structure.

---

## Current Direction

- Keep the catalog documentation synchronized with `js/ui.js`
- Continue expanding the tool set beyond the current 54 tools
- Maintain a consistent output UX and shared tool-page structure
- Preserve SEO correctness when routes, canonicals or category links change
