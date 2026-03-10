function formatJSON() {

    const input = document.getElementById("input").value;

    try {

        const parsed = JSON.parse(input);

        const formatted = JSON.stringify(parsed, null, 2);

        document.getElementById("output").textContent = formatted;

    } catch (error) {

        document.getElementById("output").textContent = "Invalid JSON";

    }

}


function minifyJSON() {

    const input = document.getElementById("input").value;

    try {

        const parsed = JSON.parse(input);

        const minified = JSON.stringify(parsed);

        document.getElementById("output").textContent = minified;

    } catch (error) {

        document.getElementById("output").textContent = "Invalid JSON";

    }

}


function copyJSON() {

    const output = document.getElementById("output").textContent;

    navigator.clipboard.writeText(output);

}


function clearJSON() {

    document.getElementById("input").value = "";

    document.getElementById("output").textContent = "";

}