const generateRandom = () => {

    const minValue = document.getElementById("min").value.trim();

    const maxValue = document.getElementById("max").value.trim();

    const output = document.getElementById("output");

    if (!minValue || !maxValue) {

        output.textContent = "Please enter both minimum and maximum values.";

        return;

    }

    const min = parseInt(minValue);

    const max = parseInt(maxValue);

    const number =
        Math.floor(Math.random() * (max - min + 1)) + min;

    output.textContent = number;

};

function hexToRGB() {

const hex = document.getElementById("colorInput").value.replace("#","");
const output = document.getElementById("output");

if (hex.length !== 6) {
output.textContent = "Invalid HEX color";
return;
}

const r = parseInt(hex.substring(0,2),16);
const g = parseInt(hex.substring(2,4),16);
const b = parseInt(hex.substring(4,6),16);

output.textContent = `rgb(${r}, ${g}, ${b})`;

}


function rgbToHEX() {

const input = document.getElementById("colorInput").value.split(",");
const output = document.getElementById("output");

if (input.length !== 3) {
output.textContent = "Invalid RGB format";
return;
}

const r = parseInt(input[0]).toString(16).padStart(2,"0");
const g = parseInt(input[1]).toString(16).padStart(2,"0");
const b = parseInt(input[2]).toString(16).padStart(2,"0");

output.textContent = `#${r}${g}${b}`;

}

function parseURL() {

const input = document.getElementById("urlInput").value;
const output = document.getElementById("output");

try {

const url = new URL(input);

output.textContent =
"protocol: " + url.protocol + "\n" +
"hostname: " + url.hostname + "\n" +
"path: " + url.pathname + "\n" +
"query: " + url.search + "\n" +
"hash: " + url.hash;

} catch {

output.textContent = "Invalid URL";

}

};

function parseQuery() {

const input = document.getElementById("queryInput").value.trim();
const output = document.getElementById("output");

try {

const params = new URLSearchParams(input);

let result = "";

params.forEach((value, key) => {
result += key + ": " + value + "\n";
});

output.textContent = result || "No parameters found";

} catch {

output.textContent = "Invalid query string";

}

};

function convertCSVtoJSON() {

const csv = document.getElementById("csvInput").value.trim();
const output = document.getElementById("output");

if (!csv) {
output.textContent = "Enter CSV data";
return;
}

try {

// 🔥 separar línies + eliminar buides
const lines = csv
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line !== "");

// 🔥 validar mínim
if (lines.length < 2) {
    output.textContent = "CSV must have headers and at least one row";
    return;
}

const headers = lines[0].split(",").map(h => h.trim());

const result = lines.slice(1).map(line => {

    const values = line.split(",");
    let obj = {};

    headers.forEach((header, index) => {
    obj[header] = values[index]?.trim() || "";
    });

    return obj;

});

output.textContent = JSON.stringify(result, null, 2);

} catch (error) {
output.textContent = "Invalid CSV data";
}
}

function convertJSONtoCSV() {

const json = document.getElementById("jsonInput").value.trim();
const output = document.getElementById("output");

try {

const data = JSON.parse(json);

if (!Array.isArray(data)) {
output.textContent = "JSON must be an array";
return;
}

const headers = Object.keys(data[0]);

const csvRows = [];

csvRows.push(headers.join(","));

data.forEach(obj => {

const values = headers.map(header => obj[header]);

csvRows.push(values.join(","));

});

output.textContent = csvRows.join("\n");

} catch {

output.textContent = "Invalid JSON data";

}

};

function getColorValues() {

const color = document.getElementById("colorInput").value;
const output = document.getElementById("output");

const r = parseInt(color.substring(1,3),16);
const g = parseInt(color.substring(3,5),16);
const b = parseInt(color.substring(5,7),16);

output.textContent =
"HEX: " + color +
"\nRGB: rgb(" + r + "," + g + "," + b + ")";

};

// ================= BASE CONVERTER =================

function convertBase() {
const input = document.getElementById("baseInput").value.trim();
const fromBase = parseInt(document.getElementById("fromBase").value);

if (!input) {
    document.getElementById("output").textContent = "Enter a number";
    return;
}

try {
    const decimal = parseInt(input, fromBase);

    if (isNaN(decimal)) {
    throw new Error();
    }

    const binary = decimal.toString(2);
    const hex = decimal.toString(16).toUpperCase();

    document.getElementById("output").textContent =
`Decimal: ${decimal}
Binary: ${binary}
Hex: ${hex}`;

} catch {
    document.getElementById("output").textContent = "Invalid input for selected base";
}
};

// ================= DATE FORMATTER =================

function formatDate() {
const input = document.getElementById("dateInput").value.trim();

if (!input) {
    document.getElementById("output").textContent = "Enter a date or timestamp";
    return;
}

let date;

  // Detecta si és timestamp
if (!isNaN(input)) {
    const timestamp = parseInt(input);

    // Detecta segons o mil·lisegons
    date = input.length === 13
    ? new Date(timestamp)
    : new Date(timestamp * 1000);

} else {
    // Intenta parsejar com data
    date = new Date(input);
}

if (isNaN(date.getTime())) {
    document.getElementById("output").textContent = "Invalid date";
    return;
}

const iso = date.toISOString();
const local = date.toLocaleString();
const unix = Math.floor(date.getTime() / 1000);

document.getElementById("output").textContent =
`ISO: ${iso}
Local: ${local}
Unix: ${unix}`;
};

// ================= TIMESTAMP CONVERTER =================

function convertTimestamp() {
const input = document.getElementById("timestampInput").value.trim();
const output = document.getElementById("output");
const baseInput = document.getElementById("epochBase")?.value.trim() || "1970-01-01T00:00:00Z";

if (!input) {
    output.textContent = "Enter a timestamp";
    return;
}

const baseDate = new Date(baseInput);

if (isNaN(baseDate.getTime())) {
    output.textContent = "Invalid base date. Use ISO format like 1970-01-01T00:00:00Z";
    return;
}

if (!/^-?\d+$/.test(input)) {
    output.textContent = "Timestamp must be a valid integer";
    return;
}

let date;
const numericTimestamp = parseInt(input, 10);
const timestampMs = input.length === 13 ? numericTimestamp : numericTimestamp * 1000;

  // Count from custom base date instead of always using Unix epoch.
date = new Date(baseDate.getTime() + timestampMs);

if (isNaN(date.getTime())) {
    output.textContent = "Invalid timestamp";
    return;
}

output.textContent =
    "Base (UTC): " + baseDate.toISOString() + "\n" +
    "ISO: " + date.toISOString() + "\n" +
    "Local: " + date.toLocaleString();
}