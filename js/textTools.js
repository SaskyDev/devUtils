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

    const t1 = document.getElementById("text1").value.split("\n");
    const t2 = document.getElementById("text2").value.split("\n");

    const output = document.getElementById("output");

    if (!t1.length || !t2.length) {
        output.textContent = "Enter both texts";
        return;
    }

    if (window.showToast) {
        window.showToast("Comparison done", "success");
    }

    let html = `
    <div class="diff-table">
        <div class="diff-header">Text 1</div>
        <div class="diff-header">Text 2</div>
    `;

    const maxLength = Math.max(t1.length, t2.length);

    for (let i = 0; i < maxLength; i++) {

        const line1 = t1[i] || "";
        const line2 = t2[i] || "";

        let className = "";

        if (!line1) className = "added";
        else if (!line2) className = "removed";
        else if (line1 !== line2) className = "changed";
        else className = "same";

        html += `
            <div class="cell ${className}">
                <span class="line-number">${i + 1}</span> ${line1}
            </div>
            <div class="cell ${className}">
                <span class="line-number">${i + 1}</span> ${line2}
            </div>
        `;
    }

    html += `</div>`;

    output.innerHTML = html;
}


function clearAll() {
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("output").innerHTML = "";
}


function copyResult() {
    navigator.clipboard.writeText(
        document.getElementById("output").innerText
    );
}