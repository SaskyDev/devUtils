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

const encodeURL = () => {

    const input = document.getElementById("urlInput").value;

    document.getElementById("output").textContent = encodeURIComponent(input);

};


const decodeURL = () => {

    const input = document.getElementById("urlInput").value;

    document.getElementById("output").textContent = decodeURIComponent(input);

};