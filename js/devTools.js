function getDevOutput() {
    const output = document.getElementById("output");
    if (output && !output.dataset.baseClass) {
        output.dataset.baseClass = output.className || "output-box";
    }
    return output;
}

function resetDevOutput() {
    const output = getDevOutput();
    if (!output) return;
    output.textContent = "";
    output.innerHTML = "";
    output.className = output.dataset.baseClass || "output-box";
}

function clearAll() {
    document.querySelectorAll(".tool-ui textarea, .tool-ui input:not([type='button']):not([type='submit']):not([type='color']), .tool-ui select").forEach((field) => {
        if (field.tagName === "SELECT") {
            field.selectedIndex = 0;
            return;
        }
        field.value = "";
    });
    resetDevOutput();
}

function copyResult(buttonEl) {
    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, { outputId: "output" });
        return;
    }

    const text = (getDevOutput()?.innerText || getDevOutput()?.textContent || "").trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast("Copied", "success");
}

function copyJSON(buttonEl) {
    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, {
            outputId: "output",
            emptyMessage: "Format or minify JSON first",
            successMessage: "JSON copied"
        });
        return;
    }
    copyResult(buttonEl);
}

function clearJSON() {
    const input = document.getElementById("input");
    if (input) input.value = "";
    resetDevOutput();
}

function formatJSON() {
    const output = getDevOutput();
    if (!output) return;

    try {
        const parsed = JSON.parse(document.getElementById("input").value);
        output.textContent = JSON.stringify(parsed, null, 2);
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid JSON";
        output.className = "output-box error";
    }
}

function minifyJSON() {
    const output = getDevOutput();
    if (!output) return;

    try {
        const inputEl = document.getElementById("input") || document.getElementById("jsonInput");
        const parsed = JSON.parse(inputEl.value);
        output.textContent = JSON.stringify(parsed);
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid JSON";
        output.className = "output-box error";
    }
}

function validateJSON() {
    const input = document.getElementById("jsonInput")?.value || document.getElementById("input")?.value || "";
    const output = getDevOutput();
    if (!output) return;

    try {
        JSON.parse(input);
        output.textContent = "Valid JSON";
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid JSON";
        output.className = "output-box error";
    }
}

function compareJSON() {
    const j1 = document.getElementById("json1").value;
    const j2 = document.getElementById("json2").value;
    const output = getDevOutput();
    if (!output) return;

    try {
        const obj1 = JSON.parse(j1);
        const obj2 = JSON.parse(j2);

        if (window.showToast) {
            window.showToast("Valid JSON", "success");
        }

        let html = `
        <div class="diff-table">
            <div class="diff-header">JSON 1</div>
            <div class="diff-header">JSON 2</div>
        `;

        const allKeys = Array.from(new Set([
            ...Object.keys(obj1),
            ...Object.keys(obj2)
        ])).sort();

        allKeys.forEach((key) => {
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

        html += "</div>";
        output.innerHTML = html;
        output.className = output.dataset.baseClass || output.className || "";
    } catch (error) {
        output.textContent = "Error: " + error.message;
        output.className = output.dataset.baseClass || "output-box";
    }
}

let mode = "json";

function setMode(newMode, event) {
    mode = newMode;

    document.querySelectorAll(".mode-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    if (event?.target) {
        event.target.classList.add("active");
    }
}

function convert() {
    const input = document.getElementById("input").value.trim();
    const output = getDevOutput();
    if (!output) return;

    if (!input) {
        output.textContent = "Enter JSON or YAML input";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Enter JSON or YAML input", "info");
        return;
    }

    try {
        if (mode === "json") {
            const obj = JSON.parse(input);
            output.textContent = jsonToYaml(obj);
        } else {
            const obj = yamlToJson(input);
            output.textContent = JSON.stringify(obj, null, 2);
        }
        output.className = "output-box success";
    } catch {
        output.textContent = "Error: Invalid input";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid input", "error");
    }
}

function jsonToYaml(obj, indent = 0) {
    let yaml = "";
    const spacing = "  ".repeat(indent);

    for (const key in obj) {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            yaml += `${spacing}${key}:\n`;
            yaml += jsonToYaml(value, indent + 1);
        } else {
            yaml += `${spacing}${key}: ${value}\n`;
        }
    }

    return yaml;
}

function yamlToJson(yaml) {
    const lines = yaml.split("\n");
    const obj = {};

    lines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key) {
            obj[key.trim()] = rest.join(":").trim();
        }
    });

    return obj;
}

function convertToXML() {
    const input = document.getElementById("input").value;
    const output = getDevOutput();
    if (!output) return;

    try {
        const obj = JSON.parse(input);

        const toXML = (value, nodeName = "root") => {
            let xml = `<${nodeName}>`;

            for (const key in value) {
                if (typeof value[key] === "object" && value[key] !== null) {
                    xml += toXML(value[key], key);
                } else {
                    xml += `<${key}>${value[key]}</${key}>`;
                }
            }

            xml += `</${nodeName}>`;
            return xml;
        };

        output.textContent = toXML(obj);
        output.className = "output-box success";
        if (window.showToast) window.showToast("Converted to XML", "success");
    } catch {
        output.textContent = "Invalid JSON ❌";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid JSON", "error");
    }
}

function convertCSVtoJSON() {
    const csv = document.getElementById("csvInput").value.trim();
    const output = getDevOutput();
    if (!output) return;

    if (!csv) {
        output.textContent = "Enter CSV data";
        output.className = "output-box error";
        return;
    }

    try {
        const lines = csv
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line !== "");

        if (lines.length < 2) {
            output.textContent = "CSV must have headers and at least one row";
            output.className = "output-box error";
            return;
        }

        const headers = lines[0].split(",").map((header) => header.trim());
        const result = lines.slice(1).map((line) => {
            const values = line.split(",");
            const row = {};

            headers.forEach((header, index) => {
                row[header] = values[index]?.trim() || "";
            });

            return row;
        });

        output.textContent = JSON.stringify(result, null, 2);
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid CSV data";
        output.className = "output-box error";
    }
}

function convertJSONtoCSV() {
    const json = document.getElementById("jsonInput").value.trim();
    const output = getDevOutput();
    if (!output) return;

    try {
        const data = JSON.parse(json);

        if (!Array.isArray(data) || data.length === 0) {
            output.textContent = "JSON must be a non-empty array";
            output.className = "output-box error";
            return;
        }

        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(",")];

        data.forEach((obj) => {
            const values = headers.map((header) => obj[header]);
            csvRows.push(values.join(","));
        });

        output.textContent = csvRows.join("\n");
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid JSON data";
        output.className = "output-box error";
    }
}

function parseURL() {
    const input = document.getElementById("urlInput").value;
    const output = getDevOutput();
    if (!output) return;

    try {
        const url = new URL(input);
        output.textContent =
            "protocol: " + url.protocol + "\n" +
            "hostname: " + url.hostname + "\n" +
            "path: " + url.pathname + "\n" +
            "query: " + url.search + "\n" +
            "hash: " + url.hash;
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid URL";
        output.className = "output-box error";
    }
}

function parseQuery() {
    const input = document.getElementById("queryInput").value.trim();
    const output = getDevOutput();
    if (!output) return;

    try {
        const params = new URLSearchParams(input);
        let result = "";

        params.forEach((value, key) => {
            result += key + ": " + value + "\n";
        });

        output.textContent = result || "No parameters found";
        output.className = "output-box success";
    } catch {
        output.textContent = "Invalid query string";
        output.className = "output-box error";
    }
}

function formatSQL() {
    const input = document.getElementById("input").value;
    const output = getDevOutput();
    if (!output) return;

    if (!input.trim()) {
        output.textContent = "Enter SQL query ❌";
        output.className = "output-box error";
        return;
    }

    try {
        const formatted = input
            .replace(/\s+/g, " ")
            .replace(/SELECT/gi, "\nSELECT")
            .replace(/FROM/gi, "\nFROM")
            .replace(/WHERE/gi, "\nWHERE")
            .replace(/ORDER BY/gi, "\nORDER BY")
            .replace(/GROUP BY/gi, "\nGROUP BY")
            .replace(/\bAND\b/gi, "\n  AND")
            .replace(/\bOR\b/gi, "\n  OR");

        output.textContent = formatted.trim();
        output.className = "output-box success";
        if (window.showToast) window.showToast("SQL formatted", "success");
    } catch {
        output.textContent = "Error formatting SQL ❌";
        output.className = "output-box error";
    }
}

function formatCode() {
    const input = document.getElementById("input").value;
    const type = document.getElementById("type").value;
    const output = getDevOutput();
    if (!output) return;

    if (!input.trim()) {
        output.textContent = "Enter code ❌";
        output.className = "output-box error";
        return;
    }

    try {
        let result = input;

        if (type === "json") result = JSON.stringify(JSON.parse(input), null, 2);
        if (type === "html") result = input.replace(/></g, ">\n<");
        if (type === "js") {
            result = input
                .replace(/{/g, "{\n")
                .replace(/;/g, ";\n")
                .replace(/}/g, "\n}");
        }

        output.textContent = result;
        output.className = "output-box success";
    } catch {
        output.textContent = "Format error ❌";
        output.className = "output-box error";
    }
}

function minifyJS() {
    const input = document.getElementById("input").value;
    const output = getDevOutput();
    if (!output) return;

    try {
        output.textContent = input
            .replace(/\/\/.*$/gm, "")
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{}();,:])\s*/g, "$1")
            .trim();
        output.className = "output-box success";
    } catch {
        output.textContent = "Error processing JavaScript";
        output.className = "output-box error";
    }
}

function minifyCSS() {
    const input = document.getElementById("input").value;
    const output = getDevOutput();
    if (!output) return;

    try {
        output.textContent = input
            .replace(/\s+/g, " ")
            .replace(/\s*{\s*/g, "{")
            .replace(/\s*}\s*/g, "}")
            .replace(/\s*:\s*/g, ":")
            .replace(/\s*;\s*/g, ";")
            .replace(/;}/g, "}")
            .trim();
        output.className = "output-box success";
    } catch {
        output.textContent = "Error processing CSS";
        output.className = "output-box error";
    }
}

function extractURLs() {
    const input = document.getElementById("input").value;
    const output = getDevOutput();
    if (!output) return;

    const matches = input.match(/(https?:\/\/[^\s]+)/g);

    if (!matches) {
        output.textContent = "No URLs found";
        output.className = "output-box info";
        return;
    }

    output.textContent = matches.join("\n");
    output.className = "output-box success";
    if (window.showToast) window.showToast(matches.length + " URL(s) found", "success");
}