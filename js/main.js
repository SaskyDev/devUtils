// Helper per seleccionar elements
const $ = (id) => document.getElementById(id);
function setSuccess(message = "Success") {
const status = document.getElementById("status");
if (!status) return;

status.textContent = message + " ✅";
status.className = "status-success";
}

function setError(message = "Error") {
const status = document.getElementById("status");
if (!status) return;

status.textContent = message + " ❌";
status.className = "status-error";
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