const minifyHTML = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    try {
        let minified = input
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .replace(/>\s+</g, "><")
            .trim();

        output.textContent = minified;

    } catch (e) {
        output.textContent = "Error processing HTML";
    }
};


const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};