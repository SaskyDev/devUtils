# Project Log


## Savepoint – 5 Tools Implemented

Date: 2026-03-10

Current status of the DevUtils project.

The goal of the project is to build a collection of lightweight developer tools that run directly in the browser.

Main objectives:
- Practice programming
- Build useful tools
- Potential future passive income through SEO and ads

---

## Project Architecture

The project uses a simple structure:

HTML  
Each tool has its own page.

Example:
tools/json-formatter/index.html

CSS  
A single global stylesheet shared by all tools.

css/styles.css

JavaScript  
All tool logic is implemented in one shared file.

js/main.js

This makes maintenance easier and avoids duplicated code.

---

## Tools Implemented

### JSON Formatter

Purpose:
Format and validate JSON data.

Functions:
- Format JSON
- Minify JSON
- Copy result
- Clear input

Key concepts used:
- JSON.parse()
- JSON.stringify()
- try / catch error handling
- DOM manipulation

---

### Base64 Encoder / Decoder

Purpose:
Convert text to Base64 and decode Base64 back to text.

Key concepts used:
- btoa()
- atob()
- clipboard usage
- text processing

---

### UUID Generator

Purpose:
Generate random UUID v4 identifiers.

Example use cases:
- database IDs
- API identifiers
- testing environments

Key concept used:
- crypto.randomUUID()

---

### Regex Tester

Purpose:
Test regular expressions against text input.

Key concepts used:
- RegExp()
- regex.test()

---

### Password Generator

Purpose:
Generate random passwords with customizable length.

Key concepts used:
- Math.random()
- Math.floor()
- loops
- string indexing

---

## Current Tool Count

5 tools implemented.

Planned future direction:
- Add more developer tools
- Improve UI and navigation
- Introduce tool categories
- Optimize pages for SEO

Project brand:
DevUtils — by SaskyDev