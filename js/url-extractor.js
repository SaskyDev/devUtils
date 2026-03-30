function extractURLs() {

    const input = document.getElementById("input").value;

    const regex = /(https?:\/\/[^\s]+)/g;

    const matches = input.match(regex);

    const output = document.getElementById("output");

    if (!matches) {
        output.textContent = "No URLs found";
        return;
    }

    output.textContent = matches.join("\n");

    if (window.showToast) {
        window.showToast(matches.length + " URL(s) found", "success");
    }
}

function clearAll() {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
}

function copyResult() {
    const output = document.getElementById("output").textContent;

    if (!output) return;

    navigator.clipboard.writeText(output);

    if (window.showToast) {
        window.showToast("Copied", "success");
    }
}