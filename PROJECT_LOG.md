# Project Log


## Savepoint – 15 Tools Implemented

Date: 2026-03-12

Current status of the DevUtils project.

The goal of the project is to build a collection of lightweight developer tools that run directly in the browser.

Main objectives:
- Practice programming
- Build useful tools
- Potential future passive income through SEO and ads

---

# Project Architecture

The project uses a modular and scalable structure.

HTML  
Each tool has its own page.

Example:
tools/json-formatter/index.html

CSS  
A single global stylesheet shared by all tools.

css/styles.css

JavaScript  

The logic is separated by categories to keep the project organized.

Example structure:

js/ui.js → navbar and UI elements  
js/main.js → global helper functions  
js/jsonTools.js → JSON tools  
js/encodingTools.js → encoding tools  
js/securityTools.js → security tools  
js/textTools.js → text related tools  
js/utilsTools.js → general utilities

---

# UI Improvements

Several improvements were implemented to make the project look more like a real web product.

Hero Section
- Added a hero section on the homepage
- Includes project title, description and tool search

Tool Cards
- Tools are now displayed in a responsive grid
- Each tool uses a card layout

Icons
- Added icons to all tools for better visual identification

Search
- Implemented a search input to filter tools dynamically

Navbar
- Simplified navigation to keep the interface clean

---

# Tool Pages Improvements

Tools now include additional documentation sections.

Each tool page contains:

Tool interface  
Explanation  
How to use section  
Example  
Tip section  

This improves:

- usability
- SEO potential
- clarity for users

Example implemented in:

JSON Formatter tool page.

---

# Navigation Improvements

Related Tools

Each tool page now includes a "Related tools" section that links to other relevant tools.

This improves:

- user navigation
- session duration
- tool discovery

---

# Additional Pages

All Tools Page

A new page was created:

all-tools.html

This page displays all tools in a grid using a JavaScript generated list.

File used:

js/toolsList.js

This makes it easier to scale the project when new tools are added.

---

# Tools Implemented

Developer Tools
- JSON Formatter
- JSON Validator
- Regex Tester
- UUID Generator
- UUID Validator
- Timestamp Converter

Encoding Tools
- Base64 Encoder / Decoder
- URL Encoder / Decoder

Security Tools
- Password Generator

Text Tools
- Text Case Converter
- Slug Generator
- Word Counter
- Lorem Ipsum Generator
- Text Reverser

Utility Tools
- Random Number Generator

---

# Current Tool Count

15 tools implemented.

---

# Project Brand

DevUtils — by SaskyDev

---

# Next Steps

Planned improvements for the next development sessions:

- Improve SEO base (sitemap, robots.txt, meta tags)
- Improve tool documentation pages
- Continue expanding the tool collection
- Improve UI polish
- Prepare the project for potential public release