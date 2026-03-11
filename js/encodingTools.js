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