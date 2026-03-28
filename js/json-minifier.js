const minifyJSON = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {
        const obj = JSON.parse(input);
        output.textContent = JSON.stringify(obj);
    } catch (e) {
        output.textContent = "Invalid JSON";
    }
};

const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};