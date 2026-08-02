# DevUtils

Lightweight browser-based utilities for formatting, validating, encoding and inspecting developer data.

Live site: <https://devutilskit.com>

Domain status: custom domain purchased and configured (`devutilskit.com`).

Current catalog: 68 tools.

Current categories:

* JSON Tools
* Code Tools
* Parser Tools
* Encoding Tools
* Validation Tools
* Security Tools
* Text Tools
* Utility Tools
* Color Tools
* HTML Tools
* Regex Tools

Featured tools:

* JSON Formatter and JSON Compare
* Code Beautifier and SQL Formatter
* JWT Encoder / Decoder
* Base64 Encoder / Decoder
* HTML Encoder / Decoder
* Email, IP and UUID validation
* Markdown to HTML and HTML to Markdown
* Timestamp Converter and Date Formatter

Goal of the project:

Build a fast, scalable collection of client-side developer tools with consistent UX, good SEO structure and zero backend dependency.

All tools work **client-side (JavaScript)** and require no backend.

Recent updates:

* Added real JavaScript flags, literal syntax, match indexes and capture groups
  to Regex Tester, isolated in a timeout-controlled Web Worker
* Replaced unsafe JavaScript, CSS and HTML minification with conservative
  transformations that preserve syntax-sensitive content
* Added dependency-free regression tests for critical conversions and tools
* Hardened JSON Compare and Text Diff so user input is rendered as text
* Corrected JSON to XML escaping, arrays, null values and invalid tag names
* Sandboxed HTML Preview and corrected Unicode Base64, IPv6, CSV and YAML cases
* Added accessible-name fallbacks for legacy form controls
* Reorganized JavaScript by logical domains (`devTools`, `validationTools`, `htmlTools`, etc.)
* Added new tool pages including Code Beautifier, SQL Formatter, Email Validator, IP Validator and HTML to Markdown
* Cleaned legacy JS files and aligned canonical URLs, examples and category navigation

Project structure:

* `js/ui.js` contains the global tool registry and shared navbar/search UI
* `js/main.js` contains shared helpers such as output copy feedback
* Domain files such as `js/devTools.js` and `js/securityTools.js` group tool logic by responsibility
* Each tool has its own page under `tools/<tool-name>/index.html`
* `tests/critical-tools.test.cjs` contains the dependency-free regression suite

Run the critical tests with Node.js:

```bash
node --test tests/critical-tools.test.cjs
```

Validation notes:

* Tool routes in `js/ui.js` resolve to existing pages
* Critical regressions are documented in `TESTING.md`
* Main documentation and smoke checklist updated to match the current taxonomy

---

## Author

Created by **SaskyDev**
