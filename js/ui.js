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

// ⚠️ ÚNICA FONT DE VERITAT — afegir noves tools aquí
// Automàticament s'inclou al cercador del navbar i a all-tools.html
const navToolsList = [
    { name: "Base Converter",            icon: "🔢", url: "tools/base-converter/",       category: "Utility Tools"    },
    { name: "Base64 Encoder / Decoder",  icon: "🔐", url: "tools/base64/",               category: "Encoding Tools"   },
    { name: "Color Converter",           icon: "🎨", url: "tools/color-converter/",      category: "Utility Tools"    },
    { name: "Color Picker",              icon: "🎨", url: "tools/color-picker/",         category: "Utility Tools"    },
    { name: "CSS Minifier",              icon: "🎨", url: "tools/css-minifier/",         category: "Developer Tools"  },
    { name: "CSV → JSON",               icon: "📄", url: "tools/csv-to-json/",          category: "Developer Tools"  },
    { name: "Date Formatter",            icon: "📅", url: "tools/date-formatter/",       category: "Utility Tools"    },
    { name: "Hash Compare",              icon: "🧬", url: "tools/hash-compare/",         category: "Security Tools"   },
    { name: "Hash Generator",            icon: "🔐", url: "tools/hash-generator/",       category: "Security Tools"   },
    { name: "HTML Minifier",             icon: "🧹", url: "tools/html-minifier/",        category: "Developer Tools"  },
    { name: "HTML Preview Editor",       icon: "🖥",  url: "tools/html-preview/",         category: "Developer Tools"  },
    { name: "JavaScript Minifier",       icon: "🧹", url: "tools/js-minifier/",          category: "Developer Tools"  },
    { name: "JSON Compare",              icon: "🆚", url: "tools/json-compare/",         category: "Developer Tools"  },
    { name: "JSON Formatter",            icon: "🧩", url: "tools/json-formatter/",       category: "Developer Tools"  },
    { name: "JSON ↔ YAML Converter",    icon: "🔄", url: "tools/json-yaml/",            category: "Developer Tools"  },
    { name: "JSON → CSV",               icon: "📄", url: "tools/json-to-csv/",          category: "Developer Tools"  },
    { name: "JSON Validator",            icon: "✔️", url: "tools/json-validator/",       category: "Developer Tools"  },
    { name: "JWT Decoder",               icon: "🔓", url: "tools/jwt-decoder/",          category: "Security Tools"   },
    { name: "JWT Encoder",               icon: "🔓", url: "tools/jwt-encoder/",          category: "Security Tools"   },
    { name: "Lorem Ipsum Generator",     icon: "📄", url: "tools/lorem-generator/",      category: "Text Tools"       },
    { name: "Markdown to HTML",          icon: "📝", url: "tools/markdown-to-html/",     category: "Developer Tools"  },
    { name: "Password Generator",        icon: "🔑", url: "tools/password-generator/",   category: "Security Tools"   },
    { name: "Password Strength Checker", icon: "🛡",  url: "tools/password-strength/",    category: "Security Tools"   },
    { name: "Query String Parser",       icon: "🔍", url: "tools/query-string-parser/",  category: "Developer Tools"  },
    { name: "Random Number Generator",   icon: "🎲", url: "tools/random-number/",        category: "Utility Tools"    },
    { name: "Regex Tester",              icon: "🧪", url: "tools/regex-tester/",         category: "Developer Tools"  },
    { name: "Slug Generator",            icon: "🔗", url: "tools/slug-generator/",       category: "Text Tools"       },
    { name: "Text Case Converter",       icon: "🔤", url: "tools/text-case/",            category: "Text Tools"       },
    { name: "Text Diff Checker",         icon: "📏", url: "tools/text-diff/",            category: "Text Tools"       },
    { name: "Text Reverser",             icon: "🔁", url: "tools/text-reverser/",        category: "Text Tools"       },
    { name: "Timestamp Converter",       icon: "⏱",  url: "tools/timestamp-converter/",  category: "Developer Tools"  },
    { name: "Timestamp Generator",       icon: "⏱",  url: "tools/timestamp-generator/",  category: "Utility Tools"    },
    { name: "URL Encoder / Decoder",     icon: "🔗", url: "tools/url-encoder/",          category: "Encoding Tools"   },
    { name: "URL Parser",                icon: "🔎", url: "tools/url-parser/",           category: "Developer Tools"  },
    { name: "UUID Generator",            icon: "🆔", url: "tools/uuid-generator/",       category: "Developer Tools"  },
    { name: "UUID Validator",            icon: "🔎", url: "tools/uuid-validator/",       category: "Developer Tools"  },
    { name: "Word Counter",              icon: "📊", url: "tools/word-counter/",         category: "Text Tools"       },
];

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
            <a href="#" id="navSearchBtn" aria-label="Search tools" class="nav-btn nav-search-btn"><span aria-hidden="true">🔍</span><span class="nav-search-label">Search</span></a>
            <button id="themeToggle" type="button" aria-label="Toggle theme">🌙</button>
        </div>

    </nav>

    <div id="searchOverlay" class="search-overlay hidden">
        <div class="search-modal">
            <input type="text" id="navSearchInput" placeholder="Search tools..." autocomplete="off">
            <div id="navSearchResults" class="search-results"></div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
    initNavSearch(basePath);
};

const initNavSearch = (basePath) => {

    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("navSearchInput");
    const results = document.getElementById("navSearchResults");
    const btn = document.getElementById("navSearchBtn");

    if (!overlay || !input || !results || !btn) return;

    const openSearch = () => {
        overlay.classList.remove("hidden");
        input.value = "";
        renderNavResults("", basePath);
        requestAnimationFrame(() => input.focus());
    };

    const closeSearch = () => {
        overlay.classList.add("hidden");
        input.value = "";
    };

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        openSearch();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeSearch();
    });

    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            overlay.classList.contains("hidden") ? openSearch() : closeSearch();
        }
        if (e.key === "Escape") closeSearch();
    });

    input.addEventListener("input", () => {
        renderNavResults(input.value, basePath);
    });
};

const renderNavResults = (query, basePath) => {

    const results = document.getElementById("navSearchResults");
    if (!results) return;

    const filter = query.toLowerCase().trim();

    const matched = (filter
        ? navToolsList.filter(t => t.name.toLowerCase().includes(filter))
        : [...navToolsList]
    ).sort((a, b) => a.name.localeCompare(b.name));

    if (matched.length === 0) {
        results.innerHTML = `<div class="search-no-results">No tools found</div>`;
        return;
    }

    results.innerHTML = matched.map(t =>
        `<a href="${basePath}${t.url}" class="search-result-item">
            <span class="search-result-icon">${t.icon}</span>
            <span class="search-result-name">${t.name}</span>
        </a>`
    ).join("");
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