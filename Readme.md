# DevUtils

Lightweight browser-based utilities for formatting, validating, encoding and inspecting developer data.

Live site: <https://devutilskit.com>

Domain status: custom domain purchased and configured (`devutilskit.com`).

Current catalog: 48 tools.

Current categories:

* Core Dev
* Encoding Tools
* Validation Tools
* Security Tools
* Text Tools
* Utility Tools
* Color Tools
* HTML Tools

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

* Reorganized JavaScript by logical domains (`devTools`, `validationTools`, `htmlTools`, etc.)
* Added new tool pages including Code Beautifier, SQL Formatter, Email Validator, IP Validator and HTML to Markdown
* Cleaned legacy JS files and aligned canonical URLs, examples and category navigation

Project structure:

* `js/ui.js` contains the global tool registry and shared navbar/search UI
* `js/main.js` contains shared helpers such as output copy feedback
* Domain files such as `js/devTools.js` and `js/securityTools.js` group tool logic by responsibility
* Each tool has its own page under `tools/<tool-name>/index.html`

Validation notes:

* Tool routes in `js/ui.js` resolve to existing pages
* Critical regressions checked after refactor: JWT UTF-8 decoding and JSON Compare layout preservation
* Main documentation and smoke checklist updated to match the current taxonomy

---

## Author

Created by **SaskyDev**
