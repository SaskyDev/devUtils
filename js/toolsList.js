const tools = [

{ name: "🧩 JSON Formatter", url: "tools/json-formatter/", category: "Developer Tools" },
{ name: "✔️ JSON Validator", url: "tools/json-validator/", category: "Developer Tools" },
{ name: "🧪 Regex Tester", url: "tools/regex-tester/", category: "Developer Tools" },
{ name: "🆔 UUID Generator", url: "tools/uuid-generator/", category: "Developer Tools" },
{ name: "🔎 UUID Validator", url: "tools/uuid-validator/", category: "Developer Tools" },
{ name: "⏱ Timestamp Converter", url: "tools/timestamp-converter/", category: "Developer Tools" },
{ name: "🔍 Query String Parser", url: "tools/query-string-parser/", category: "Developer Tools" },
{ name: "📄 CSV → JSON", url: "tools/csv-to-json/", category: "Developer Tools" },
{ name: "📄 JSON → CSV", url: "tools/json-to-csv/", category: "Developer Tools" },

{ name: "🔐 Base64 Encoder / Decoder", url: "tools/base64/", category: "Encoding Tools" },
{ name: "🔗 URL Encoder / Decoder", url: "tools/url-encoder/", category: "Encoding Tools" },

{ name: "🔑 Password Generator", url: "tools/password-generator/", category: "Security Tools" },
{ name: "🛡 Password Strength Checker", url: "tools/password-strength/", category: "Security Tools" },

{ name: "🔤 Text Case Converter", url: "tools/text-case/", category: "Text Tools" },
{ name: "🔗 Slug Generator", url: "tools/slug-generator/", category: "Text Tools" },
{ name: "📊 Word Counter", url: "tools/word-counter/", category: "Text Tools" },
{ name: "📄 Lorem Ipsum Generator", url: "tools/lorem-generator/", category: "Text Tools" },
{ name: "🔁 Text Reverser", url: "tools/text-reverser/", category: "Text Tools" },

{ name: "🎲 Random Number Generator", url: "tools/random-number/", category: "Utility Tools" },
{ name: "🎨 Color Picker", url: "tools/color-picker/", category: "Utility Tools" }

];


const container = document.getElementById("allTools");

const categories = {};

tools.forEach(tool => {

if (!categories[tool.category]) {
categories[tool.category] = [];
}

categories[tool.category].push(tool);

});

Object.keys(categories).forEach(category => {

const title = document.createElement("h2");
title.textContent = category;

container.appendChild(title);

const grid = document.createElement("div");
grid.className = "tools-grid";

categories[category].forEach(tool => {

const card = document.createElement("div");
card.className = "tool-card tool-item";

card.innerHTML = `<a href="${tool.url}">${tool.name}</a>`;

grid.appendChild(card);

});

container.appendChild(grid);

});