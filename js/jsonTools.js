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

const validateJSON = () => {

    const input = document.getElementById("jsonInput").value;

    try {

        JSON.parse(input);

        document.getElementById("output").textContent = "Valid JSON";

    } catch {

        document.getElementById("output").textContent = "Invalid JSON";

    }

};