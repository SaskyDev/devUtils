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

function encodeBase64() {

    const input = document.getElementById("input").value;

    const encoded = btoa(input);

    document.getElementById("output").textContent = encoded;

}

function decodeBase64() {

    const input = document.getElementById("input").value;

    try {

        const decoded = atob(input);

        document.getElementById("output").textContent = decoded;

    } catch {

        document.getElementById("output").textContent = "Invalid Base64";

    }

}

function clearBase64() {

    document.getElementById("input").value = "";

    document.getElementById("output").textContent = "";

}

function generateUUID() {

    const uuid = crypto.randomUUID();

    document.getElementById("output").textContent = uuid;

}

function testRegex() {

    const pattern = document.getElementById("pattern").value;
    const text = document.getElementById("text").value;

    try {

        const regex = new RegExp(pattern);

        const result = regex.test(text);

        document.getElementById("output").textContent = result;

    } catch {

        document.getElementById("output").textContent = "Invalid Regex";

    }

}

function generatePassword() {

    const length = document.getElementById("length").value;

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(Math.random() * chars.length);

        password += chars[randomIndex];

    }

    document.getElementById("output").textContent = password;

}