// ================= NAVBAR =================

const loadNavbar = () => {

    const navbar = `
    <nav class="navbar">

        <div class="nav-left">
            <a href="/devUtils/" class="nav-brand">DevUtils</a>
        </div>

        <div class="nav-right">
            <a href="/devUtils/">Home</a>
            <a href="/devUtils/all-tools.html">All tools</a>
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