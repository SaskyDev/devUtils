// Helper per seleccionar elements
const $ = (id) => document.getElementById(id);


// ================= GA4 TOOL USAGE TRACKING =================

const initToolTracking = () => {
    if (typeof gtag !== "function") return;

    const path = window.location.pathname;
    const match = path.match(/\/tools\/([^/]+)/);
    if (!match) return;

    const toolSlug = match[1];

    // Track actual tool actions (not copy/clear)
    const ignoredActions = ["copyOutput", "copyResult", "copyPassword", "clearAll", "clearToolAction", "clearJSON", "clearBase64"];

    document.querySelectorAll("button[onclick], .tool-actions button").forEach(btn => {
        const onclick = btn.getAttribute("onclick") || "";
        const fnName = onclick.replace(/\(.*$/, "");

        if (!fnName || ignoredActions.some(ignored => onclick.includes(ignored))) return;

        btn.addEventListener("click", () => {
            gtag("event", "tool_use", {
                tool_name: toolSlug,
                action: fnName
            });
        }, { once: false, passive: true });
    });

    // Track page engagement (user interacted with inputs)
    let interacted = false;
    document.querySelectorAll("textarea, input:not([type=hidden])").forEach(el => {
        el.addEventListener("input", () => {
            if (interacted) return;
            interacted = true;
            gtag("event", "tool_interact", {
                tool_name: toolSlug
            });
        }, { once: true, passive: true });
    });
};

document.addEventListener("DOMContentLoaded", initToolTracking);
function setSuccess(message = "Success") {
const status = document.getElementById("status") || document.getElementById("output");
if (!status) return;

status.textContent = message + " ✅";
status.classList.remove("status-error");
status.classList.add("status-success");
}

function setError(message = "Error") {
const status = document.getElementById("status") || document.getElementById("output");
if (!status) return;

status.textContent = message + " ❌";
status.classList.remove("status-success");
status.classList.add("status-error");
}

function setTemporaryButtonText(buttonEl, text, duration = 1200) {
if (!buttonEl) return;

const originalText = buttonEl.textContent;
buttonEl.textContent = text;

setTimeout(() => {
	buttonEl.textContent = originalText;
}, duration);
}

async function copyOutput(buttonEl, options = {}) {
const outputId = options.outputId || buttonEl?.dataset?.copyTarget || "output";
const output = document.getElementById(outputId);
const value = (output?.textContent || "").trim();

const emptyMessage = options.emptyMessage || buttonEl?.dataset?.copyEmpty || "Nothing to copy yet";
const successMessage = options.successMessage || buttonEl?.dataset?.copySuccess || "Copied to clipboard";

if (!value) {
	setTemporaryButtonText(buttonEl, "Nothing to copy");
	if (window.showToast) {
	window.showToast(emptyMessage, "info");
	}
	return;
}

try {
	await navigator.clipboard.writeText(value);
	setTemporaryButtonText(buttonEl, "Copied!");
	if (window.showToast) {
	window.showToast(successMessage, "success");
	}
} catch {
	setTemporaryButtonText(buttonEl, "Copy failed");
	if (window.showToast) {
	window.showToast("Clipboard blocked", "error");
	}
}
}