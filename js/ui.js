// ---------- NAVBAR ----------

const loadNavbar = () => {

    const navbar = `
    <nav>
        <a href="../../index.html">Home</a>
        <a href="../json-formatter/index.html">JSON Formatter</a>
        <a href="../base64/index.html">Base64</a>
        <a href="../uuid-generator/index.html">UUID</a>
        <a href="../regex-tester/index.html">Regex</a>
        <a href="../password-generator/index.html">Password</a>
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