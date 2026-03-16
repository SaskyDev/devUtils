const tools = [

{ name: "🧩 JSON Formatter", url: "tools/json-formatter/" },
{ name: "✔️ JSON Validator", url: "tools/json-validator/" },
{ name: "🧪 Regex Tester", url: "tools/regex-tester/" },
{ name: "🆔 UUID Generator", url: "tools/uuid-generator/" },
{ name: "🔎 UUID Validator", url: "tools/uuid-validator/" },
{ name: "⏱ Timestamp Converter", url: "tools/timestamp-converter/" },

{ name: "🔐 Base64 Encoder / Decoder", url: "tools/base64/" },
{ name: "🔗 URL Encoder / Decoder", url: "tools/url-encoder/" },

{ name: "🔑 Password Generator", url: "tools/password-generator/" },

{ name: "🔤 Text Case Converter", url: "tools/text-case/" },
{ name: "🔗 Slug Generator", url: "tools/slug-generator/" },
{ name: "📊 Word Counter", url: "tools/word-counter/" },
{ name: "📄 Lorem Ipsum Generator", url: "tools/lorem-generator/" },
{ name: "🔁 Text Reverser", url: "tools/text-reverser/" },

{ name: "🎲 Random Number Generator", url: "tools/random-number/" },

/* ===== NEW TOOLS ===== */

{ name: "🔓 JWT Decoder", url: "tools/jwt-decoder/" },
{ name: "🔐 Hash Generator", url: "tools/hash-generator/" },
{ name: "🎨 Color Converter", url: "tools/color-converter/" },
{ name: "⏱ Timestamp Generator", url: "tools/timestamp-generator/" },
{ name: "🔎 URL Parser", url: "tools/url-parser/" },
{ name: "🛡 Password Strength Checker", url: "tools/password-strength/" },
{ name: "🔍 Query String Parser", url: "tools/query-string-parser/" },
{ name: "📄 CSV → JSON", url: "tools/csv-to-json/" },
{ name: "📄 JSON → CSV", url: "tools/json-to-csv/" },

];
    

const container = document.getElementById("allTools");

tools.forEach(tool => {

const card = document.createElement("div");

card.className = "tool-card";

card.innerHTML = `<a href="${tool.url}">${tool.name}</a>`;

container.appendChild(card);

});