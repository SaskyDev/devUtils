const loadNavbar = () => {

    const getRootPrefix = () => {

        const path = window.location.pathname;

        if (path.includes("/tools/")) return "../../";

        if (path.includes("/templates/")) return "../";

        return "";

    };

    const prefix = getRootPrefix();

    const navbar = `
    <nav>
        <a href="${prefix}index.html">Home</a>
        <a href="${prefix}all-tools.html">All tools</a>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);

};

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