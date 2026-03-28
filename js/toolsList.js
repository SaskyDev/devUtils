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
{ name: "🎨 Color Converter", url: "tools/color-converter/", category: "Utility Tools" },
{ name: "🔓 JWT Encoder", url: "tools/jwt-encoder/", category: "Security Tools" },
{ name: "📏 Text Diff Checker", url: "tools/text-diff/", category: "Text Tools" },
{ name: "🔢 Base Converter", url: "tools/base-converter/", category: "Utility Tools" },
{ name: "📅 Date Formatter", url: "tools/date-formatter/", category: "Utility Tools" },
{ name: "🧬 Hash Compare", url: "tools/hash-compare/", category: "Security Tools" },
{ name: "🖥 HTML Preview Editor", url: "tools/html-preview/", category: "Developer Tools" },
{ name: "🔄 JSON ↔ YAML Converter", url: "tools/json-yaml/", category: "Developer Tools" },
{ name: "🆚 JSON Compare", url: "tools/json-compare/", category: "Developer Tools" },
{ name: "🧹 HTML Minifier", url: "tools/html-minifier/", category: "Developer Tools" },
{ name: "🎨 CSS Minifier", url: "tools/css-minifier/", category: "Developer Tools" },
{ name: "🧹 JavaScript Minifier", url: "tools/js-minifier/", category: "Developer Tools" },

];


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("allTools");
if (!container) return;


// ================= STATE =================

let currentCategory = "All";

// Read category from URL param if present
const urlParams = new URLSearchParams(window.location.search);
const paramCategory = urlParams.get("category");

if (paramCategory) {
    const validCategories = ["Developer Tools", "Encoding Tools", "Security Tools", "Text Tools", "Utility Tools"];
    if (validCategories.includes(paramCategory)) {
        currentCategory = paramCategory;
    }
}


// ================= RENDER =================

tools.forEach(tool => {

const card = document.createElement("div");
card.className = "tool-card tool-item";
card.setAttribute("data-category", tool.category);

card.innerHTML = `
<a href="${tool.url}">
<span class="tool-icon">${tool.name.split(" ")[0]}</span>
<span class="tool-title">${tool.name.replace(tool.name.split(" ")[0], "").trim()}</span>
</a>
`;

container.appendChild(card);

});


// ================= FILTER FUNCTION =================

const applyFilters = () => {

const searchValue = document.getElementById("toolSearch").value.toLowerCase();

document.querySelectorAll(".tool-item").forEach(tool => {

const text = tool.textContent.toLowerCase();
const category = tool.getAttribute("data-category");

const matchSearch = text.includes(searchValue);
const matchCategory = currentCategory === "All" || category === currentCategory;

tool.style.display = (matchSearch && matchCategory) ? "" : "none";

});

};


// ================= SEARCH =================

document.getElementById("toolSearch").addEventListener("input", applyFilters);


// ================= FILTER BUTTONS =================

document.querySelectorAll(".filter-btn").forEach(btn => {

btn.addEventListener("click", () => {

document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

btn.classList.add("active");

currentCategory = btn.getAttribute("data-category");

applyFilters();

});

// Activate matching button if category came from URL
if (paramCategory && btn.getAttribute("data-category") === currentCategory) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

});

// Apply initial filter if category param was set
if (paramCategory) {
    applyFilters();
}

});