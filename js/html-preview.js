// ---------- HTML PREVIEW TOOL ----------

const htmlInput = document.getElementById("htmlInput");
const previewFrame = document.getElementById("preview");

const EXAMPLE_HTML = `<h1>Hello World</h1>
<p>This is a preview</p>`;

const updatePreview = () => {

	if (!htmlInput || !previewFrame) return;

	const isDark = document.body.classList.contains("dark");
	const darkStyle = isDark
		? '<style>html{background:#1f2937;color:#e5e7eb;}a{color:#60a5fa;}</style>'
		: '';

	previewFrame.srcdoc = darkStyle + htmlInput.value;

};

const loadExample = () => {

	if (!htmlInput) return;

	htmlInput.value = EXAMPLE_HTML;
	updatePreview();

	if (window.showToast) {
		window.showToast("Example loaded", "success");
	}

};

const clearEditor = () => {

	if (!htmlInput) return;

	htmlInput.value = "";
	updatePreview();

	if (window.showToast) {
		window.showToast("Editor cleared", "info");
	}

};

const copyCode = async () => {

	const value = (htmlInput?.value || "").trim();

	if (!value) {
		if (window.showToast) {
			window.showToast("Write HTML first", "info");
		}
		return;
	}

	try {
		await navigator.clipboard.writeText(htmlInput.value);

		if (window.showToast) {
			window.showToast("HTML copied", "success");
		}
	} catch {
		if (window.showToast) {
			window.showToast("Clipboard blocked", "error");
		}
	}

};

if (htmlInput && previewFrame) {
	if (!htmlInput.value.trim()) {
		htmlInput.value = EXAMPLE_HTML;
	}

	htmlInput.addEventListener("input", updatePreview);
	updatePreview();

	new MutationObserver(updatePreview).observe(document.body, {
		attributes: true,
		attributeFilter: ["class"]
	});
}

window.loadExample = loadExample;
window.clearEditor = clearEditor;
window.copyCode = copyCode;