function getHtmlOutput() {
    return document.getElementById("output");
}

function clearAll() {
    document.querySelectorAll(".tool-ui textarea, .tool-ui input:not([type='button']):not([type='submit'])").forEach((field) => {
        field.value = "";
    });
    const output = getHtmlOutput();
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
    const text = (getHtmlOutput()?.textContent || "").trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast("Copied", "success");
}

function minifyHTML() {
    const input = document.getElementById("input").value;
    const output = getHtmlOutput();
    if (!output) return;

    try {
        output.textContent = input
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .replace(/>\s+</g, "><")
            .trim();
        output.className = "output-box success";
    } catch {
        output.textContent = "Error processing HTML";
        output.className = "output-box error";
    }
}

function convertToMarkdown() {
    const input = document.getElementById("input").value;
    const output = getHtmlOutput();
    if (!output) return;

    if (!input.trim()) {
        output.textContent = "Enter HTML ❌";
        output.className = "output-box error";
        return;
    }

    try {
        const markdown = input
            .replace(/<h1>(.*?)<\/h1>/gi, "# $1\n\n")
            .replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n")
            .replace(/<h3>(.*?)<\/h3>/gi, "### $1\n\n")
            .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
            .replace(/<b>(.*?)<\/b>/gi, "**$1**")
            .replace(/<em>(.*?)<\/em>/gi, "*$1*")
            .replace(/<i>(.*?)<\/i>/gi, "*$1*")
            .replace(/<a\s+href=["'](.*?)["'].*?>(.*?)<\/a>/gi, "[$2]($1)")
            .replace(/<li>(.*?)<\/li>/gi, "- $1\n")
            .replace(/<p>(.*?)<\/p>/gi, "$1\n\n")
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

        output.textContent = markdown;
        output.className = "output-box success";
        if (window.showToast) window.showToast("Converted to Markdown", "success");
    } catch {
        output.textContent = "Error converting ❌";
        output.className = "output-box error";
    }
}

function convertMarkdown() {
    const input = document.getElementById("input").value;
    const output = getHtmlOutput();
    if (!output) return;

    try {
        let html = input
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/gim, "<em>$1</em>")
            .replace(/^\- (.*$)/gim, "<li>$1</li>")
            .replace(/\n/g, "<br>");

        html = html.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");

        output.textContent = html;
        output.className = "output-box success";
    } catch {
        output.textContent = "Error processing Markdown";
        output.className = "output-box error";
    }
}

const htmlInput = document.getElementById("htmlInput");
const cssInput = document.getElementById("cssInput");
const preview = document.getElementById("preview");

const defaultHTML = `<h1>Hello DevUtils 🚀</h1> 
<p>Edit this HTML and CSS to see changes live.</p>

<div class="card">
<h2>What is HTML?</h2>
<p>HTML defines the <strong>structure</strong> of a web page using tags like <em>headings</em>, <em>paragraphs</em>, <em>lists</em> and more.</p>
</div>

<div class="card">
<h2>Try these tags</h2>
<ul>
<li><strong>&lt;h1&gt;</strong> to <strong>&lt;h6&gt;</strong> — Headings</li>
<li><strong>&lt;p&gt;</strong> — Paragraph</li>
<li><strong>&lt;a href="#"&gt;</strong> — Link</li>
<li><strong>&lt;img&gt;</strong> — Image</li>
<li><strong>&lt;ul&gt; / &lt;ol&gt;</strong> — Lists</li>
</ul>
</div>

<a href="#" class="btn">I'm a button ✨</a>`;

const defaultCSS = `h1 {
color: #3b82f6;
margin-bottom: 4px;
}

h1 + p {
color: #94a3b8;
margin-top: 0;
}

.card {
background: rgba(100, 116, 139, 0.12);
border: 1px solid rgba(100, 116, 139, 0.25);
border-radius: 10px;
padding: 16px 20px;
margin-bottom: 14px;
}

.card h2 {
font-size: 16px;
margin-top: 0;
color: inherit;
}

.card p {
font-size: 14px;
line-height: 1.6;
}

ul {
padding-left: 20px;
}

li {
margin-bottom: 6px;
font-size: 14px;
}

.btn {
display: inline-block;
background: #3b82f6;
color: white;
padding: 10px 22px;
border-radius: 8px;
text-decoration: none;
font-weight: 600;
font-size: 14px;
}

.btn:hover {
background: #2563eb;
}`;

function updatePreview() {
    if (!htmlInput || !cssInput || !preview) return;

    const isDark = document.body.classList.contains("dark");
    preview.srcdoc = `
        <html>
        <head>
            <style>
                body {
                    font-family: system-ui;
                    padding: 10px;
                    background: ${isDark ? "#111827" : "#ffffff"};
                    color: ${isDark ? "#e5e7eb" : "#111827"};
                }
                ${cssInput.value}
            </style>
        </head>
        <body>
            ${htmlInput.value}
        </body>
        </html>
    `;
}

function clearEditor() {
    if (!htmlInput || !cssInput) return;
    htmlInput.value = "";
    cssInput.value = "";
    updatePreview();
}

function loadExample() {
    if (!htmlInput || !cssInput) return;
    htmlInput.value = defaultHTML;
    cssInput.value = defaultCSS;
    updatePreview();
}

function copyCode() {
    if (!htmlInput || !cssInput) return;
    navigator.clipboard.writeText(`<style>\n${cssInput.value}\n</style>\n${htmlInput.value}`);
}

if (htmlInput && cssInput && preview) {
    window.addEventListener("load", () => {
        loadExample();
    });

    htmlInput.addEventListener("input", updatePreview);
    cssInput.addEventListener("input", updatePreview);
}