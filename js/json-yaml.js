let mode = "json"; // json -> yaml

const setMode = (newMode) => {
    mode = newMode;

    document.querySelectorAll(".mode-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");
};


const convert = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {

        if(mode === "json"){
            const obj = JSON.parse(input);
            output.value = jsonToYaml(obj);
        } else {
            const obj = yamlToJson(input);
            output.value = JSON.stringify(obj, null, 2);
        }

    } catch (e) {
        output.value = "Error: Invalid input";
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
    document.getElementById("output").value = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").value);
};