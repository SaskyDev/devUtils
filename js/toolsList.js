// ================= DATA =================
// Derivat de navToolsList (definit a ui.js) — afegir noves tools només a navToolsList de ui.js

const tools = navToolsList
    .map(t => ({
        icon: t.icon,
        title: t.name,
        url: t.url,
        category: t.category
    }))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("allTools");
if (!container) return;


// ================= STATE =================

let currentCategory = "All";

// Read category from URL param if present
const urlParams = new URLSearchParams(window.location.search);
const paramCategory = urlParams.get("category");

if (paramCategory) {
    const validCategories = [...new Set(tools.map(tool => tool.category))];
    if (validCategories.includes(paramCategory)) {
        currentCategory = paramCategory;
    }
}


// ================= RENDER =================

tools.forEach(tool => {

const card = document.createElement("div");
card.className = "tool-card tool-item";
card.setAttribute("data-category", tool.category);

card.innerHTML = `
<a href="${tool.url}">
<span class="tool-icon">${tool.icon}</span>
<span class="tool-title">${tool.title}</span>
</a>
`;

container.appendChild(card);

});


// ================= FILTER FUNCTION =================

const applyFilters = () => {

const searchValue = document.getElementById("toolSearch").value.toLowerCase();

document.querySelectorAll(".tool-item").forEach(tool => {

const text = tool.textContent.toLowerCase();
const category = tool.getAttribute("data-category");

const matchSearch = text.includes(searchValue);
const matchCategory = currentCategory === "All" || category === currentCategory;

tool.style.display = (matchSearch && matchCategory) ? "" : "none";

});

};


// ================= SEARCH =================

document.getElementById("toolSearch").addEventListener("input", applyFilters);


// ================= FILTER BUTTONS =================

document.querySelectorAll(".filter-btn").forEach(btn => {

btn.addEventListener("click", () => {

document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

btn.classList.add("active");

currentCategory = btn.getAttribute("data-category");

applyFilters();

});

// Activate matching button if category came from URL
if (paramCategory && btn.getAttribute("data-category") === currentCategory) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

});

// Apply initial filter if category param was set
if (paramCategory) {
    applyFilters();
}

});