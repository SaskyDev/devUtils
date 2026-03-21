const toUpperCaseText = () => {

    const input = document.getElementById("textInput").value;

    document.getElementById("output").textContent = input.toUpperCase();

};


const toLowerCaseText = () => {

    const input = document.getElementById("textInput").value;

    document.getElementById("output").textContent = input.toLowerCase();

};


const capitalizeText = () => {

    const input = document.getElementById("textInput").value;

    const capitalized = input
        .toLowerCase()
        .replace(/(^|[\s([{"'¿¡-]+)(\p{L})/gu, (_, prefix, letter) => {
            return `${prefix}${letter.toUpperCase()}`;
        });

    document.getElementById("output").textContent = capitalized;

};

const toSentenceCaseText = () => {

    const input = document.getElementById("textInput").value;

    const sentenceCase = input
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+)([¿¡"'([{]*)(\p{L})/gu, (_, prefix, opening, letter) => {
            return `${prefix}${opening}${letter.toUpperCase()}`;
        });

    document.getElementById("output").textContent = sentenceCase;

};

const generateSlug = () => {

    const input = document.getElementById("slugInput").value;

    const slug = input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    document.getElementById("output").textContent = slug;

};

const countWords = () => {

    const text = document.getElementById("textInput").value.trim();

    const words = text ? text.split(/\s+/).length : 0;

    const chars = text.length;

    document.getElementById("output").textContent =
        `Words: ${words} | Characters: ${chars}`;

};

const generateLorem = () => {

    const p = document.getElementById("paragraphs").value;

    const lorem =
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.";

    let result = "";

    for (let i = 0; i < p; i++) {

        result += lorem + "\n\n";

    }

    document.getElementById("output").textContent = result;

};

const reverseText = () => {

    const text = document.getElementById("textInput").value;

    const reversed = text.split("").reverse().join("");

    document.getElementById("output").textContent = reversed;

};

// ================= TEXT DIFF =================

function compareText() {

const t1 = document.getElementById("text1").value;
const t2 = document.getElementById("text2").value;
const output = document.getElementById("output");

if (!t1 || !t2) {
output.textContent = "Enter both texts";
return;
}

let result = "";

const maxLength = Math.max(t1.length, t2.length);

for (let i = 0; i < maxLength; i++) {

const char1 = t1[i] || "";
const char2 = t2[i] || "";

if (char1 === char2) {
    result += char1;
} else {
    if (char1) {
    result += `<span style="background:#fee2e2;color:#991b1b;padding:1px 2px;border-radius:3px;">${char1}</span>`;
    }
    if (char2) {
    result += `<span style="background:#dcfce7;color:#166534;padding:1px 2px;border-radius:3px;">${char2}</span>`;
    }
}
}

output.innerHTML = result;
}