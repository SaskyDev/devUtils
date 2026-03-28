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
    const status = document.getElementById("status");

    try {
        const obj1 = JSON.parse(j1);
        const obj2 = JSON.parse(j2);

        if (typeof window.setSuccess === "function") {
            window.setSuccess("Valid JSON");
        } else if (status) {
            status.textContent = "Valid JSON";
            status.classList.remove("status-error");
            status.classList.add("status-success");
        }

        let html = `
        <div class="diff-table">
            <div class="diff-header">JSON 1</div>
            <div class="diff-header">JSON 2</div>
        `;

        const allKeys = Array.from(new Set([
            ...Object.keys(obj1),
            ...Object.keys(obj2)
        ])).sort(); // 🔥 ORDENAR

        allKeys.forEach(key => {

            const val1 = obj1[key];
            const val2 = obj2[key];

            let className = "";

            if (val1 === undefined) className = "added";
            else if (val2 === undefined) className = "removed";
            else if (JSON.stringify(val1) !== JSON.stringify(val2)) className = "changed";
            else className = "same";

            html += `
                <div class="cell ${className}">
                    <strong>${key}:</strong> 
                    ${val1 !== undefined ? JSON.stringify(val1) : ""}
                </div>
                <div class="cell ${className}">
                    <strong>${key}:</strong> 
                    ${val2 !== undefined ? JSON.stringify(val2) : ""}
                </div>
            `;
        });

        html += `</div>`;

        output.innerHTML = html;

    } catch (e) {

        if (typeof window.setError === "function") {
            window.setError("Error: " + e.message);
        } else if (status) {
            status.textContent = "Error: " + e.message;
            status.classList.remove("status-success");
            status.classList.add("status-error");
        }

        output.innerHTML = "";
    }
};


const clearAll = () => {
    document.getElementById("json1").value = "";
    document.getElementById("json2").value = "";
    document.getElementById("output").innerHTML = "";

    const status = document.getElementById("status");
    if (status) {
        status.textContent = "";
        status.classList.remove("status-success", "status-error", "output-state", "output-success", "output-error", "output-info");
    }
};


const copyResult = () => {
    navigator.clipboard.writeText(
        document.getElementById("output").innerText
    );
};