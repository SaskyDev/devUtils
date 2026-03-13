const loadNavbar = () => {

const navbar = `
<nav class="navbar">

<div class="nav-left">
<a href="/devUtils/" class="nav-brand">DevUtils</a>
</div>

<div class="nav-right">
<a href="/devUtils/">Home</a>
<a href="/devUtils/all-tools.html">All tools</a>
</div>

</nav>
`;

document.body.insertAdjacentHTML("afterbegin", navbar);

};

window.addEventListener("load", loadNavbar);

window.addEventListener("load", loadNavbar);


// ---------- TOOL SEARCH ----------

const filterTools = () => {

    const input = document.getElementById("toolSearch");

    if (!input) return;

    const filter = input.value.toLowerCase();

    document.querySelectorAll(".tool-item").forEach(tool => {

        const text = tool.textContent.toLowerCase();

        tool.style.display = text.includes(filter) ? "" : "none";

    });

};