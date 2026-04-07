// ---------- BASE64 TOOL ----------

const encodeBase64 = () => {

    $("output").textContent = btoa($("input").value);

};


const decodeBase64 = () => {

    try {

        $("output").textContent = atob($("input").value);

    } catch {

        $("output").textContent = "Invalid Base64";

    }

};


const clearBase64 = () => {

    $("input").value = "";
    $("output").textContent = "";

};

const encodeURL = () => {

    const input = document.getElementById("urlInput").value;

    document.getElementById("output").textContent = encodeURIComponent(input);

};


const decodeURL = () => {

    const input = document.getElementById("urlInput").value;

    document.getElementById("output").textContent = decodeURIComponent(input);

};


function clearAll() {
    document.querySelectorAll(".tool-ui textarea, .tool-ui input:not([type='button']):not([type='submit']):not([type='file'])").forEach((field) => {
        field.value = "";
    });

    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";

    const output = document.getElementById("output");
    if (output) {
        output.textContent = "";
        output.className = "output-box";
    }
}

function copyResult(buttonEl) {
    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, { outputId: "output" });
        return;
    }

    const text = (document.getElementById("output")?.textContent || "").trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast("Copied", "success");
}

function escapeJSON() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    if (!output) return;

    if (!input.trim()) {
        output.textContent = "Enter text ❌";
        output.className = "output-box error";
        return;
    }

    output.textContent = input
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n");
    output.className = "output-box success";
}

function unescapeJSON() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    if (!output) return;

    try {
        output.textContent = input
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\")
            .replace(/\\n/g, "\n");
        output.className = "output-box success";
    } catch {
        output.textContent = "Error ❌";
        output.className = "output-box error";
    }
}

function encodeHTML() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    if (!output) return;

    if (!input.trim()) {
        output.textContent = "Enter text ❌";
        output.className = "output-box error";
        return;
    }

    output.textContent = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    output.className = "output-box success";
}

function decodeHTML() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    if (!output) return;

    try {
        output.textContent = input
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, "&");
        output.className = "output-box success";
    } catch {
        output.textContent = "Error ❌";
        output.className = "output-box error";
    }
}

function convertImage() {
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");
    if (!output) return;

    const file = fileInput?.files?.[0];
    if (!file) {
        output.textContent = "Please select an image";
        output.className = "output-box error";
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        output.textContent = reader.result;
        output.className = "output-box success";
    };
    reader.onerror = () => {
        output.textContent = "Error reading file";
        output.className = "output-box error";
    };
    reader.readAsDataURL(file);
}

// BINARY ↔ TEXT CONVERTER

function initBinaryTextConverter() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (!input || !output) return;

    window.textToBinary = function () {
        const text = input.value;

        if (!text) {
            output.textContent = "❌ Enter text";
            return;
        }

        const binary = text
            .split("")
            .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" ");

        output.textContent = binary;
    };

    window.binaryToText = function () {
        try {
            const text = input.value
                .trim()
                .split(" ")
                .map(bin => String.fromCharCode(parseInt(bin, 2)))
                .join("");

            output.textContent = text;
        } catch (e) {
            output.textContent = "❌ Invalid binary input";
        }
    };

    window.clearToolAction = function () {
        input.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initBinaryTextConverter);

// ASCII ↔ TEXT CONVERTER

function initAsciiTextConverter() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (!input || !output) return;

    window.textToAscii = function () {
        const text = input.value;

        if (!text) {
            output.textContent = "❌ Enter text";
            return;
        }

        const ascii = text
            .split("")
            .map(char => char.charCodeAt(0))
            .join(" ");

        output.textContent = ascii;
    };

    window.asciiToText = function () {
        try {
            const text = input.value
                .trim()
                .split(" ")
                .map(num => String.fromCharCode(parseInt(num)))
                .join("");

            output.textContent = text;
        } catch (e) {
            output.textContent = "❌ Invalid ASCII input";
        }
    };

    window.clearToolAction = function () {
        input.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initAsciiTextConverter);