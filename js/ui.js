// ================= NAVBAR =================

const getSiteBasePath = () => {

    const script = Array.from(document.scripts).find(currentScript => {

        const source = currentScript.getAttribute("src") || "";

        return source.endsWith("js/ui.js");

    });

    if (!script) {
        return "./";
    }

    const source = script.getAttribute("src") || "";

    return source.slice(0, -"js/ui.js".length);
};

const loadNavbar = () => {

    const basePath = getSiteBasePath();

    const navbar = `
    <nav class="navbar">

        <div class="nav-left">
            <a href="${basePath}index.html" class="nav-brand">DevUtils</a>
        </div>

        <div class="nav-right">
            <a href="${basePath}index.html" class="nav-btn">Home</a>
            <a href="${basePath}all-tools.html" class="nav-btn">All tools</a>
            <button id="themeToggle" aria-label="Toggle theme">🌙</button>
        </div>

    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
};


// ================= DARK MODE =================

const toggleTheme = () => {

    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateIcon();
};

const loadTheme = () => {

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        document.body.classList.add("dark");
    }
};

const updateIcon = () => {

    const btn = document.getElementById("themeToggle");

    if (btn) {
        btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    }
};


// ================= TOOL SEARCH =================

const filterTools = () => {

    const input = document.getElementById("toolSearch");

    if (!input) return;

    const filter = input.value.toLowerCase();

    document.querySelectorAll(".tool-item").forEach(tool => {

        const text = tool.textContent.toLowerCase();

        tool.style.display = text.includes(filter) ? "" : "none";

    });

};


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

    loadNavbar();
    loadTheme();
    updateIcon();

    const btn = document.getElementById("themeToggle");

    if (btn) {
        btn.addEventListener("click", toggleTheme);
    }

});