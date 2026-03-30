function convertToXML() {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {
        const obj = JSON.parse(input);

        const toXML = (obj, nodeName = "root") => {

            let xml = `<${nodeName}>`;

            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    xml += toXML(obj[key], key);
                } else {
                    xml += `<${key}>${obj[key]}</${key}>`;
                }
            }

            xml += `</${nodeName}>`;
            return xml;
        };

        const result = toXML(obj);

        output.textContent = result;
        output.className = "output-box success";

        if (window.showToast) {
            window.showToast("Converted to XML", "success");
        }

    } catch {
        output.textContent = "Invalid JSON ❌";
        output.className = "output-box error";

        if (window.showToast) {
            window.showToast("Invalid JSON", "error");
        }
    }
}

function clearAll() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (input) input.value = "";
    if (output) {
        output.textContent = "";
        output.className = "output-box";
    }
}

function copyResult(buttonEl) {
    const output = document.getElementById("output");
    const text = (output?.textContent || "").trim();

    if (!text) {
        if (window.showToast) window.showToast("Nothing to copy yet", "info");
        return;
    }

    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, {
            outputId: "output",
            emptyMessage: "Nothing to copy yet",
            successMessage: "XML copied"
        });
        return;
    }

    navigator.clipboard.writeText(text);
}