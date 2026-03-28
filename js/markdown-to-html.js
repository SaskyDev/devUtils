const convertMarkdown = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    let html = input;

    try {
        html = html
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/gim, "<em>$1</em>")
            .replace(/^\- (.*$)/gim, "<li>$1</li>")
            .replace(/\n/g, "<br>");

        // wrap list items
        html = html.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");

        output.textContent = html;

    } catch (e) {
        output.textContent = "Error processing Markdown";
    }
};


const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};