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


const copyJSON = (buttonEl) => {

    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, {
            outputId: "output",
            emptyMessage: "Format or minify JSON first",
            successMessage: "JSON copied"
        });
        return;
    }

    navigator.clipboard.writeText($("output").textContent);

};


const clearJSON = () => {

    $("input").value = "";
    $("output").textContent = "";

};

const validateJSON = () => {

    const input = document.getElementById("jsonInput").value;

    try {

        JSON.parse(input);

        document.getElementById("output").textContent = "Valid JSON";

    } catch {

        document.getElementById("output").textContent = "Invalid JSON";

    }

};

const compareJSON = () => {

    const j1 = document.getElementById("json1").value;
    const j2 = document.getElementById("json2").value;

    const output = document.getElementById("output");

    try {
        const obj1 = JSON.parse(j1);
        const obj2 = JSON.parse(j2);

        let result = "";

        Object.keys(obj2).forEach(key => {
            if (obj1[key] !== obj2[key]) {
                result += `<span style="background:#fde68a;">"${key}": ${JSON.stringify(obj2[key])} (changed)</span>\n`;
            } else {
                result += `"${key}": ${JSON.stringify(obj2[key])}\n`;
            }
        });

        output.innerHTML = result;

    } catch (e) {
        output.textContent = "Invalid JSON";
    }
};


const clearAll = () => {
    document.getElementById("json1").value = "";
    document.getElementById("json2").value = "";
    document.getElementById("output").textContent = "";
};

const copyResult = () => {
    navigator.clipboard.writeText(document.getElementById("output").innerText);
};