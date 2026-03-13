const loadNavbar = () => {

    const navbar = `
    <nav>
        <a href="/devUtils/">Home</a>
        <a href="/devUtils/all-tools.html">All tools</a>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);

};

window.addEventListener("load", loadNavbar);


// ---------- TOOL SEARCH ----------

const filterTools = () => {

    const filter = $("toolSearch").value.toLowerCase();

    document.querySelectorAll(".tool-item").forEach(tool => {

        const text = tool.textContent.toLowerCase();

        tool.style.display = text.includes(filter) ? "" : "none";

    });

};