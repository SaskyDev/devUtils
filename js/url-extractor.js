const extractURLs = () => {

    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    const regex = /(https?:\/\/[^\s]+)/g;

    const matches = input.match(regex);

    output.textContent = matches ? matches.join("\n") : "No URLs found";
};

const clearAll = () => {
    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};