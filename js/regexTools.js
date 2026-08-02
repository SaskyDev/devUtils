// ==================== REGEX TESTER ====================

const REGEX_TESTER_FLAGS = [
    ["regexFlagGlobal", "g"],
    ["regexFlagIgnoreCase", "i"],
    ["regexFlagMultiline", "m"],
    ["regexFlagDotAll", "s"],
    ["regexFlagUnicode", "u"],
];
const REGEX_TIMEOUT_MS = 1500;
const REGEX_WORKER_URL = typeof document !== "undefined" && document.currentScript?.src
    ? new URL("regexWorker.js", document.currentScript.src)
    : "../../js/regexWorker.js";
let activeRegexWorker = null;

function getRegexTesterFlags() {
    return REGEX_TESTER_FLAGS
        .filter(([id]) => document.getElementById(id)?.checked)
        .map(([, flag]) => flag)
        .join("");
}

function stopActiveRegexWorker() {
    if (activeRegexWorker) {
        activeRegexWorker.terminate();
        activeRegexWorker = null;
    }
}

function setRegexRunning(running) {
    const button = document.getElementById("testRegexButton");
    const output = document.getElementById("output");
    if (button) {
        button.disabled = running;
        button.textContent = running ? "Testing…" : "Test Regex";
    }
    if (output) output.setAttribute("aria-busy", String(running));
}

function runRegexInWorker(pattern, text, flags) {
    if (typeof Worker === "undefined") {
        return Promise.resolve(RegexEngine.run(pattern, text, flags));
    }

    stopActiveRegexWorker();
    const worker = new Worker(REGEX_WORKER_URL);
    activeRegexWorker = worker;
    const requestId = `${Date.now()}-${Math.random()}`;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            worker.terminate();
            if (activeRegexWorker === worker) activeRegexWorker = null;
            const error = new Error(`Pattern exceeded the ${REGEX_TIMEOUT_MS / 1000}-second safety limit`);
            error.name = "RegexTimeoutError";
            reject(error);
        }, REGEX_TIMEOUT_MS);

        worker.addEventListener("message", (event) => {
            if (event.data.id !== requestId) return;
            clearTimeout(timeout);
            worker.terminate();
            if (activeRegexWorker === worker) activeRegexWorker = null;
            if (event.data.error) {
                reject(new Error(event.data.error));
                return;
            }
            resolve(event.data.result);
        });

        worker.addEventListener("error", (event) => {
            clearTimeout(timeout);
            worker.terminate();
            if (activeRegexWorker === worker) activeRegexWorker = null;
            reject(new Error(event.message || "Regex worker failed"));
        });

        worker.postMessage({ id: requestId, pattern, text, flags });
    });
}

async function testRegex() {
    const output = document.getElementById("output");
    if (!output) return;

    const pattern = document.getElementById("pattern")?.value || "";
    const text = document.getElementById("text")?.value || "";

    if (!pattern) {
        output.textContent = "Enter a regex pattern";
        output.className = "output-box info";
        return;
    }

    try {
        setRegexRunning(true);
        output.textContent = "Testing pattern…";
        output.className = "output-box info";
        const result = await runRegexInWorker(pattern, text, getRegexTesterFlags());
        output.textContent = RegexEngine.format(result);
        output.className = result.matches.length ? "output-box success" : "output-box error";
    } catch (error) {
        output.textContent = error.name === "RegexTimeoutError"
            ? `${error.message}. Try a simpler expression or a shorter test string.`
            : `Invalid regex: ${error.message}`;
        output.className = "output-box error";
    } finally {
        setRegexRunning(false);
    }
}

function clearRegexTester() {
    const pattern = document.getElementById("pattern");
    const text = document.getElementById("text");
    const output = document.getElementById("output");

    stopActiveRegexWorker();
    setRegexRunning(false);
    if (pattern) pattern.value = "";
    if (text) text.value = "";
    REGEX_TESTER_FLAGS.forEach(([id, flag]) => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = flag === "g";
    });
    if (output) {
        output.textContent = "Results will appear here.";
        output.className = "output-box";
    }
    pattern?.focus();
}

function initRegexTester() {
    const pattern = document.getElementById("pattern");
    const text = document.getElementById("text");
    if (!pattern || !text) return;

    [pattern, text].forEach((field) => {
        field.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                testRegex();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initRegexTester);

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
