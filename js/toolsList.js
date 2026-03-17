// ================= DATA =================

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
{ name: "🔎 URL Parser", url: "tools/url-parser/", category: "Developer Tools" },

{ name: "🔐 Base64 Encoder / Decoder", url: "tools/base64/", category: "Encoding Tools" },
{ name: "🔗 URL Encoder / Decoder", url: "tools/url-encoder/", category: "Encoding Tools" },

{ name: "🔑 Password Generator", url: "tools/password-generator/", category: "Security Tools" },
{ name: "🛡 Password Strength Checker", url: "tools/password-strength/", category: "Security Tools" },
{ name: "🔐 Hash Generator", url: "tools/hash-generator/", category: "Security Tools" },
{ name: "🔓 JWT Decoder", url: "tools/jwt-decoder/", category: "Security Tools" },

{ name: "🔤 Text Case Converter", url: "tools/text-case/", category: "Text Tools" },
{ name: "🔗 Slug Generator", url: "tools/slug-generator/", category: "Text Tools" },
{ name: "📊 Word Counter", url: "tools/word-counter/", category: "Text Tools" },
{ name: "📄 Lorem Ipsum Generator", url: "tools/lorem-generator/", category: "Text Tools" },
{ name: "🔁 Text Reverser", url: "tools/text-reverser/", category: "Text Tools" },

{ name: "🎲 Random Number Generator", url: "tools/random-number/", category: "Utility Tools" },
{ name: "🎨 Color Picker", url: "tools/color-picker/", category: "Utility Tools" },
{ name: "⏱ Timestamp Generator", url: "tools/timestamp-generator/", category: "Utility Tools" },
{ name: "🎨 Color Converter", url: "tools/color-converter/", category: "Utility Tools" }

];


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("allTools");

if (!container) return;


// ================= GROUP BY CATEGORY =================

const categories = {};

tools.forEach(tool => {

if (!categories[tool.category]) {
categories[tool.category] = [];
}

categories[tool.category].push(tool);

});


// ================= RENDER =================

Object.keys(categories).forEach(category => {

// const title = document.createElement("h2");
// title.textContent = category;
// container.appendChild(title);

const grid = document.createElement("div");
grid.className = "tools-grid";

categories[category].forEach(tool => {

const card = document.createElement("div");
card.className = "tool-card tool-item";
card.setAttribute("data-category", tool.category);

card.innerHTML = `
<a href="${tool.url}">
    <span class="tool-icon">${tool.name.split(" ")[0]}</span>
    <span class="tool-title">${tool.name.replace(tool.name.split(" ")[0], "").trim()}</span>
</a>
`;

grid.appendChild(card);

});

container.appendChild(grid);

});


// ================= FILTER =================

const filterByCategory = (category) => {

document.querySelectorAll(".tool-item").forEach(tool => {

const toolCategory = tool.getAttribute("data-category");

if (category === "All" || toolCategory === category) {
tool.style.display = "";
} else {
tool.style.display = "none";
}

});

};


// ================= FILTER BUTTON EVENTS =================

document.querySelectorAll(".filter-btn").forEach(btn => {

btn.addEventListener("click", () => {

document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

btn.classList.add("active");

const category = btn.getAttribute("data-category");

filterByCategory(category);

});

});

});