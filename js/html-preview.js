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


// LIVE PREVIEW
const updatePreview = () => {

    const isDark = document.body.classList.contains("dark");

    const code = `
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

    preview.srcdoc = code;
};


// ACTIONS
const clearEditor = () => {
    htmlInput.value = "";
    cssInput.value = "";
    updatePreview();
};

const loadExample = () => {
    htmlInput.value = defaultHTML;
    cssInput.value = defaultCSS;
    updatePreview();
};

const copyCode = () => {
    const fullCode = `<style>\n${cssInput.value}\n</style>\n${htmlInput.value}`;
    navigator.clipboard.writeText(fullCode);
};


// INIT
window.addEventListener("load", () => {
    loadExample();
});

htmlInput.addEventListener("input", updatePreview);
cssInput.addEventListener("input", updatePreview);