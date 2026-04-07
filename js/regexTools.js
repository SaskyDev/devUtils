// ==================== REGEX TESTER ====================

function testRegex() {
    const output = document.getElementById("output");
    if (!output) return;

    const pattern = document.getElementById("pattern").value;
    const text = document.getElementById("text").value;

    if (!pattern) {
        output.textContent = "Enter a regex pattern";
        output.className = "output-box info";
        return;
    }

    try {
        const regex = new RegExp(pattern, "g");
        const matches = text.match(regex);

        if (matches) {
            output.textContent = "Match found ✔\n\nMatches (" + matches.length + "):\n" + matches.join("\n");
            output.className = "output-box success";
        } else {
            output.textContent = "No match ✘";
            output.className = "output-box error";
        }
    } catch {
        output.textContent = "Invalid Regex";
        output.className = "output-box error";
    }
}

// ==================== EMAIL REGEX GENERATOR ====================

const EMAIL_PATTERNS = {
    simple: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    strict: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    rfc: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
};

function getSelectedRegex() {
    const type = document.getElementById("regexType").value;
    return EMAIL_PATTERNS[type];
}

function updateOutput() {
    const output = document.getElementById("output");
    const result = document.getElementById("validationResult");
    if (!output) return;

    const regex = getSelectedRegex();
    output.textContent = regex.source;

    const email = (document.getElementById("emailInput").value || "").trim();

    if (!email) {
        if (result) result.textContent = "";
        return;
    }

    const valid = regex.test(email);

    if (result) {
        result.textContent = valid ? "✔ Valid email" : "✘ Invalid email";
        result.className = valid ? "status-success" : "status-error";
    }
}

function clearToolAction() {
    document.getElementById("emailInput").value = "";
    document.getElementById("regexType").selectedIndex = 0;
    var output = document.getElementById("output");
    if (output) output.textContent = "";
    var result = document.getElementById("validationResult");
    if (result) { result.textContent = ""; result.className = ""; }
}

// ==================== SHARED ====================

function clearAll() {
    document.querySelectorAll(".tool-ui textarea, .tool-ui input:not([type='button']):not([type='submit']):not([type='color'])").forEach(function (field) {
        field.value = "";
    });
    var output = document.getElementById("output");
    if (output) {
        output.textContent = "";
        output.className = "";
    }
}

// Live bindings (only if elements exist)
document.addEventListener("DOMContentLoaded", function () {
    var typeSelect = document.getElementById("regexType");
    var emailInput = document.getElementById("emailInput");

    if (typeSelect) typeSelect.addEventListener("change", updateOutput);
    if (emailInput) emailInput.addEventListener("input", updateOutput);

    if (typeSelect) updateOutput();
});

// REGEX CHEATSHEET TESTER

function initRegexCheatsheet() {
    const regexInput = document.getElementById("regexInput");
    const testString = document.getElementById("testString");
    const output = document.getElementById("output");

    if (!regexInput || !testString) return;

    window.runToolAction = function () {
        if (!regexInput.value) {
            output.textContent = "Enter a regex pattern";
            output.className = "output-box info";
            return;
        }

        try {
            const regex = new RegExp(regexInput.value, "g");
            const matches = testString.value.match(regex);

            if (matches) {
                output.textContent = "Match found ✔\n\nMatches (" + matches.length + "):\n" + matches.join("\n");
                output.className = "output-box success";
            } else {
                output.textContent = "❌ No match";
                output.className = "output-box error";
            }
        } catch (e) {
            output.textContent = "Invalid regex";
            output.className = "output-box error";
        }
    };
}

document.addEventListener("DOMContentLoaded", initRegexCheatsheet);

// REGEX REPLACE TOOL

function initRegexReplace() {
    const input = document.getElementById("input");
    const pattern = document.getElementById("pattern");
    const replacement = document.getElementById("replacement");
    const output = document.getElementById("output");

    const globalFlag = document.getElementById("global");
    const ignoreCase = document.getElementById("ignoreCase");

    if (!input || !pattern || !replacement) return;

    window.runToolAction = function () {
        try {
            let flags = "";
            if (globalFlag.checked) flags += "g";
            if (ignoreCase.checked) flags += "i";

            const regex = new RegExp(pattern.value, flags);

            const result = input.value.replace(regex, replacement.value);

            output.textContent = result;
        } catch (e) {
            output.textContent = "Invalid regex pattern";
        }
    };

    window.clearToolAction = function () {
        input.value = "";
        pattern.value = "";
        replacement.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initRegexReplace);