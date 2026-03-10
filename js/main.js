// Helper per seleccionar elements
const $ = (id) => document.getElementById(id);


// ---------- NAVBAR ----------

const loadNavbar = () => {

    const navbar = `
    <nav>
        <a href="../../index.html">Home</a>
        <a href="../json-formatter/">JSON Formatter</a>
        <a href="../base64/">Base64</a>
        <a href="../uuid-generator/">UUID</a>
        <a href="../regex-tester/">Regex</a>
        <a href="../password-generator/">Password</a>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);

};

window.addEventListener("load", loadNavbar);


// ---------- JSON TOOL ----------

const formatJSON = () => {

    try {

        const parsed = JSON.parse($("input").value);

        $("output").textContent = JSON.stringify(parsed, null, 2);

    } catch {

        $("output").textContent = "Invalid JSON";

    }

};


const minifyJSON = () => {

    try {

        const parsed = JSON.parse($("input").value);

        $("output").textContent = JSON.stringify(parsed);

    } catch {

        $("output").textContent = "Invalid JSON";

    }

};


const copyJSON = () => {

    navigator.clipboard.writeText($("output").textContent);

};


const clearJSON = () => {

    $("input").value = "";
    $("output").textContent = "";

};


// ---------- BASE64 TOOL ----------

const encodeBase64 = () => {

    $("output").textContent = btoa($("input").value);

};


const decodeBase64 = () => {

    try {

        $("output").textContent = atob($("input").value);

    } catch {

        $("output").textContent = "Invalid Base64";

    }

};


const clearBase64 = () => {

    $("input").value = "";
    $("output").textContent = "";

};


// ---------- UUID TOOL ----------

const generateUUID = () => {

    $("output").textContent = crypto.randomUUID();

};


// ---------- REGEX TOOL ----------

const testRegex = () => {

    try {

        const regex = new RegExp($("pattern").value);

        $("output").textContent = regex.test($("text").value);

    } catch {

        $("output").textContent = "Invalid Regex";

    }

};


// ---------- PASSWORD TOOL ----------

const generatePassword = () => {

    const length = $("length").value;

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(Math.random() * chars.length);

        password += chars[randomIndex];

    }

    $("output").textContent = password;

};


// ---------- TOOL SEARCH ----------

const filterTools = () => {

    const filter = $("toolSearch").value.toLowerCase();

    document.querySelectorAll(".tool-item").forEach(tool => {

        const text = tool.textContent.toLowerCase();

        tool.style.display = text.includes(filter) ? "" : "none";

    });

};