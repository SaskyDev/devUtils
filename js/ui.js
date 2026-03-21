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
            <button id="themeToggle" type="button" aria-label="Toggle theme">🌙</button>
        </div>

    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
};

const updateNavbarOnScroll = () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const shouldCompact = window.scrollY > 14;

    navbar.classList.toggle("nav-compact", shouldCompact);
};

const initNavbarScrollState = () => {

    updateNavbarOnScroll();

    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
};


// ================= DARK MODE =================

const toggleTheme = () => {

    const isDark = document.body.classList.toggle("dark");

    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
        // No bloquear el toggle si el storage está restringido.
    }

    updateIcon();

    if (window.showToast) {
        window.showToast(isDark ? "Dark mode enabled" : "Light mode enabled", "info", 1200);
    }
};

const loadTheme = () => {

    let saved = null;

    try {
        saved = localStorage.getItem("theme");
    } catch {
        saved = null;
    }

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

const ensureToastStack = () => {

    let stack = document.getElementById("toastStack");

    if (!stack) {
        stack = document.createElement("div");
        stack.id = "toastStack";
        stack.className = "toast-stack";
        document.body.appendChild(stack);
    }

    return stack;
};

const showToast = (message, type = "info", duration = 1800) => {

    const safeType = ["success", "error", "info"].includes(type) ? type : "info";
    const stack = ensureToastStack();
    const toast = document.createElement("div");

    toast.className = `toast toast-${safeType}`;
    toast.textContent = message;
    stack.appendChild(toast);

    window.setTimeout(() => {
        toast.style.animation = "toastOut .2s ease forwards";
        window.setTimeout(() => {
            toast.remove();
        }, 220);
    }, duration);
};

const classifyOutputState = (text) => {

    const normalized = (text || "").trim().toLowerCase();

    if (!normalized) {
        return "info";
    }

    if (/(invalid|error|failed|unable|do not match|required|enter both|enter text|copy failed)/.test(normalized)) {
        return "error";
    }

    if (/(match|valid|strong|copied|generated|success|rgb\(|^#([0-9a-f]{6}|[0-9a-f]{3}))/i.test(normalized)) {
        return "success";
    }

    return "info";
};

const applyOutputStateClass = (preEl) => {

    if (!preEl) return;

    const state = classifyOutputState(preEl.textContent);

    preEl.classList.add("output-state");
    preEl.classList.remove("output-success", "output-error", "output-info");
    preEl.classList.add(`output-${state}`);
};

const initOutputStateObserver = () => {

    const outputs = document.querySelectorAll("pre#output");

    outputs.forEach((pre) => {

        applyOutputStateClass(pre);

        const observer = new MutationObserver(() => {
            applyOutputStateClass(pre);
        });

        observer.observe(pre, {
            childList: true,
            characterData: true,
            subtree: true
        });
    });
};

document.addEventListener("click", (event) => {

    const { target } = event;

    if (target && target.id === "themeToggle") {
        toggleTheme();
    }
});


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
    initNavbarScrollState();
    loadTheme();
    updateIcon();

    initOutputStateObserver();

    window.showToast = showToast;

    requestAnimationFrame(() => {
        document.body.classList.add("ui-ready");
    });

});