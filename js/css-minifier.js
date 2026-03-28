const minifyCSS = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {
        let minified = input
            .replace(/\s+/g, " ")
            .replace(/\s*{\s*/g, "{")
            .replace(/\s*}\s*/g, "}")
            .replace(/\s*:\s*/g, ":")
            .replace(/\s*;\s*/g, ";")
            .replace(/;}/g, "}")
            .trim();

        output.textContent = minified;

    } catch (e) {
        output.textContent = "Error processing CSS";
    }
};


const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};