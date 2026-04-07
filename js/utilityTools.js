function generateRandom() {
    const minValue = document.getElementById("min").value.trim();
    const maxValue = document.getElementById("max").value.trim();
    const output = document.getElementById("output");
    if (!output) return;

    if (!minValue || !maxValue) {
        output.textContent = "Please enter both minimum and maximum values.";
        output.className = "output-box error";
        return;
    }

    const min = parseInt(minValue, 10);
    const max = parseInt(maxValue, 10);
    output.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
    output.className = "output-box success";
}

function convertBase() {
    const input = document.getElementById("baseInput").value.trim();
    const fromBase = parseInt(document.getElementById("fromBase").value, 10);
    const output = document.getElementById("output");
    if (!output) return;

    if (!input) {
        output.textContent = "Enter a number";
        if (window.showToast) window.showToast("Enter a number first", "info");
        output.className = "output-box error";
        return;
    }

    try {
        const decimal = parseInt(input, fromBase);
        if (Number.isNaN(decimal)) throw new Error();

        output.textContent = `Decimal: ${decimal}\nBinary: ${decimal.toString(2)}\nHex: ${decimal.toString(16).toUpperCase()}`;
        output.className = "output-box success";
        if (window.showToast) window.showToast("Base converted", "success", 1400);
    } catch {
        output.textContent = "Invalid input for selected base";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid value for selected base", "error");
    }
}

function formatDate() {
    const input = document.getElementById("dateInput").value.trim();
    const output = document.getElementById("output");
    if (!output) return;

    if (!input) {
        output.textContent = "Enter a date or timestamp";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Enter a date or timestamp", "info");
        return;
    }

    const isNumericInput = Number.isNaN(Number(input)) === false;
    const date = isNumericInput
        ? new Date(input.length === 13 ? parseInt(input, 10) : parseInt(input, 10) * 1000)
        : new Date(input);

    if (Number.isNaN(date.getTime())) {
        output.textContent = "Invalid date";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid date format", "error");
        return;
    }

    output.textContent = `ISO: ${date.toISOString()}\nLocal: ${date.toLocaleString()}\nUnix: ${Math.floor(date.getTime() / 1000)}`;
    output.className = "output-box success";
    if (window.showToast) window.showToast("Date converted", "success", 1400);
}

function convertTimestamp() {
    const input = document.getElementById("timestampInput").value.trim();
    const output = document.getElementById("output");
    const baseInput = document.getElementById("epochBase")?.value.trim() || "1970-01-01T00:00:00Z";
    if (!output) return;

    if (!input) {
        output.textContent = "Enter a timestamp";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Enter a timestamp", "info");
        return;
    }

    const baseDate = new Date(baseInput);
    if (Number.isNaN(baseDate.getTime())) {
        output.textContent = "Invalid base date. Use ISO format like 1970-01-01T00:00:00Z";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid base date", "error");
        return;
    }

    if (!/^-?\d+$/.test(input)) {
        output.textContent = "Timestamp must be a valid integer";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Timestamp must be an integer", "error");
        return;
    }

    const numericTimestamp = parseInt(input, 10);
    const timestampMs = input.length === 13 ? numericTimestamp : numericTimestamp * 1000;
    const date = new Date(baseDate.getTime() + timestampMs);

    if (Number.isNaN(date.getTime())) {
        output.textContent = "Invalid timestamp";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid timestamp", "error");
        return;
    }

    output.textContent =
        "Base (UTC): " + baseDate.toISOString() + "\n" +
        "ISO: " + date.toISOString() + "\n" +
        "Local: " + date.toLocaleString();
    output.className = "output-box success";
    if (window.showToast) window.showToast("Timestamp converted", "success", 1400);
}

function generateTimestamp() {
    const output = document.getElementById("output");
    const baseInput = document.getElementById("epochBase")?.value.trim() || "1970-01-01T00:00:00Z";
    if (!output) return;

    const baseDate = new Date(baseInput);
    if (Number.isNaN(baseDate.getTime())) {
        output.textContent = "Invalid base date. Use ISO format like 1970-01-01T00:00:00Z";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid base date", "error");
        return;
    }

    const nowMs = Date.now();
    const elapsedMs = nowMs - baseDate.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);

    output.textContent =
        `Seconds: ${elapsedSeconds}\nMilliseconds: ${elapsedMs}\nBase (UTC): ${baseDate.toISOString()}\nNow (UTC): ${new Date(nowMs).toISOString()}`;
    output.className = "output-box success";
    if (window.showToast) window.showToast("Timestamp generated", "success", 1400);
}

// RANDOM STRING GENERATOR (PRO)

function initRandomStringGenerator() {
    const output = document.getElementById("output");

    if (!output) return;

    function getCharset() {
        let chars = "";

        if (document.getElementById("letters").checked) {
            chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        if (document.getElementById("numbers").checked) {
            chars += "0123456789";
        }

        if (document.getElementById("symbols").checked) {
            chars += "!@#$%^&*()_+[]{}<>?";
        }

        if (document.getElementById("excludeAmbiguous").checked) {
            chars = chars.replace(/[0OIl1]/g, "");
        }

        return chars;
    }

    function generateString(length, chars) {
        let result = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }

        return result;
    }

    window.runToolAction = function () {
        const length = parseInt(document.getElementById("length").value) || 16;
        const count = parseInt(document.getElementById("count").value) || 1;

        const chars = getCharset();

        if (!chars) {
            output.textContent = "❌ Select at least one character type";
            return;
        }

        let results = [];

        for (let i = 0; i < count; i++) {
            results.push(generateString(length, chars));
        }

        output.textContent = results.join("\n");
    };

    window.clearToolAction = function () {
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initRandomStringGenerator);

// UUID CONVERTER (PRO)

function initUuidConverter() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (!input || !output) return;

    function isValidUUID(uuid) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    }

    function getVersion(uuid) {
        return uuid[14];
    }

    window.runToolAction = function () {
        let value = input.value.trim();

        if (!isValidUUID(value)) {
            output.textContent = "❌ Invalid UUID";
            return;
        }

        const version = getVersion(value);

        if (document.getElementById("removeDashes").checked) {
            value = value.replace(/-/g, "");
        }

        if (document.getElementById("uppercase").checked) {
            value = value.toUpperCase();
        }

        if (document.getElementById("lowercase").checked) {
            value = value.toLowerCase();
        }

        output.textContent = `
✅ Valid UUID

Version: v${version}

Result:
${value}
`;
    };

    window.clearToolAction = function () {
        input.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initUuidConverter);