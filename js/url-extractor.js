function extractURLs() {

    const input = document.getElementById("input").value;

    const regex = /(https?:\/\/[^\s]+)/g;

    const matches = input.match(regex);

    const output = document.getElementById("output");
    const status = document.getElementById("status");

    if (!matches) {
        output.textContent = "";
        status.textContent = "No URLs found";
        return;
    }

    output.textContent = matches.join("\n");
    status.textContent = matches.length + " URL(s) found ✔";

    if (window.showToast) {
        window.showToast("URLs extracted", "success");
    }
}

function clearAll() {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
    document.getElementById("status").textContent = "";
}

function copyResult() {
    const output = document.getElementById("output").textContent;

    if (!output) return;

    navigator.clipboard.writeText(output);

    if (window.showToast) {
        window.showToast("Copied", "success");
    }
}