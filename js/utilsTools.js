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