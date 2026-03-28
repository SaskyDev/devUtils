const minifyJS = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {
        let minified = input
            .replace(/\/\/.*$/gm, "") // remove comments
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{}();,:])\s*/g, "$1")
            .trim();

        output.textContent = minified;

    } catch (e) {
        output.textContent = "Error processing JavaScript";
    }
};


const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};