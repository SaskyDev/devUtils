let mode = "json"; // json -> yaml

const setMode = (newMode, event) => {
    mode = newMode;

    document.querySelectorAll(".mode-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (event?.target) {
        event.target.classList.add("active");
    }
};


const convert = () => {

    const input = document.getElementById("input").value.trim();
    const output = document.getElementById("output");

    if (!input) {
        output.textContent = "Enter JSON or YAML input";
        if (window.showToast) window.showToast("Enter JSON or YAML input", "info");
        return;
    }

    try {

        if(mode === "json"){
            const obj = JSON.parse(input);
            output.textContent = jsonToYaml(obj);
        } else {
            const obj = yamlToJson(input);
            output.textContent = JSON.stringify(obj, null, 2);
        }

    } catch (e) {
        output.textContent = "Error: Invalid input";
        if (window.showToast) window.showToast("Invalid input", "error");
    }
};


// SIMPLE JSON → YAML
const jsonToYaml = (obj, indent = 0) => {

    let yaml = "";
    const spacing = "  ".repeat(indent);

    for (let key in obj) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
            yaml += `${spacing}${key}:\n`;
            yaml += jsonToYaml(value, indent + 1);
        } else {
            yaml += `${spacing}${key}: ${value}\n`;
        }
    }

    return yaml;
};


// SIMPLE YAML → JSON (basic)
const yamlToJson = (yaml) => {
    const lines = yaml.split("\n");
    const obj = {};

    lines.forEach(line => {
        const [key, ...rest] = line.split(":");
        if(key){
            obj[key.trim()] = rest.join(":").trim();
        }
    });

    return obj;
};


const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};