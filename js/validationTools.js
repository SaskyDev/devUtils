function getValidationOutput() {
    return document.getElementById("output");
}

function clearAll() {
    document.querySelectorAll(".tool-ui textarea, .tool-ui input:not([type='button']):not([type='submit'])").forEach((field) => {
        field.value = "";
    });

    const output = getValidationOutput();
    if (output) {
        output.textContent = "";
        output.className = "output-box";
    }
}

function copyResult(buttonEl) {
    if (typeof window.copyOutput === "function") {
        window.copyOutput(buttonEl, { outputId: "output" });
        return;
    }

    const text = (getValidationOutput()?.textContent || "").trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast("Copied", "success");
}

function validateEmails() {
    const input = document.getElementById("input").value;
    const output = getValidationOutput();
    if (!output) return;

    const lines = input.split("\n");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let result = "";
    let hasError = false;

    lines.forEach((email) => {
        const value = email.trim();
        if (!value) return;

        if (regex.test(value)) result += "✔ " + value + "\n";
        else {
            result += "❌ " + value + "\n";
            hasError = true;
        }
    });

    if (!result) {
        output.textContent = "Enter email(s) ❌";
        output.className = "output-box error";
        return;
    }

    output.textContent = result.trim();
    output.className = hasError ? "output-box error" : "output-box success";
    if (window.showToast) window.showToast("Validation complete", "success");
}

function validateIPs() {
    const input = document.getElementById("input").value;
    const output = getValidationOutput();
    if (!output) return;

    const lines = input.split("\n");
    const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    let result = "";
    let hasError = false;

    lines.forEach((ip) => {
        const value = ip.trim();
        if (!value) return;

        if (ipv4.test(value) || ipv6.test(value)) result += "✔ " + value + "\n";
        else {
            result += "❌ " + value + "\n";
            hasError = true;
        }
    });

    if (!result) {
        output.textContent = "Enter IP(s) ❌";
        output.className = "output-box error";
        return;
    }

    output.textContent = result.trim();
    output.className = hasError ? "output-box error" : "output-box success";
    if (window.showToast) window.showToast("Validation complete", "success");
}

function validateUUID() {
    const uuid = document.getElementById("uuidInput").value;
    const output = getValidationOutput();
    if (!output) return;

    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const valid = regex.test(uuid);

    output.textContent = valid ? "Valid UUID" : "Invalid UUID";
    output.className = valid ? "output-box success" : "output-box error";
}

function checkPasswordStrength() {
    const password = document.getElementById("passwordInput").value;
    const output = getValidationOutput();
    if (!output) return;

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
        output.textContent = "Weak password";
        output.className = "output-box error";
    } else if (score <= 3) {
        output.textContent = "Medium password";
        output.className = "output-box info";
    } else {
        output.textContent = "Strong password";
        output.className = "output-box success";
    }
}

// JSON SCHEMA VALIDATOR

function initJsonSchemaValidator() {
    const jsonInput = document.getElementById("jsonInput");
    const schemaInput = document.getElementById("schemaInput");
    const output = document.getElementById("output");

    if (!jsonInput || !schemaInput) return;

    // LOAD EXAMPLE
    window.loadExample = function () {
        jsonInput.value = JSON.stringify({
            name: "John",
            age: 30
        }, null, 2);

        schemaInput.value = JSON.stringify({
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "number" }
            },
            required: ["name", "age"]
        }, null, 2);
    };

    // VALIDATE
    window.runToolAction = function () {
        try {
            const jsonData = JSON.parse(jsonInput.value);
            const schemaData = JSON.parse(schemaInput.value);

            const ajv = new Ajv({ allErrors: true });
            const validate = ajv.compile(schemaData);

            const valid = validate(jsonData);

            if (valid) {
                output.textContent = "✅ Valid JSON (matches schema)";
            } else {
                const formattedErrors = validate.errors.map(err => {
                    return `❌ ${err.instancePath || "root"} → ${err.message}`;
                }).join("\n");

                output.textContent = formattedErrors;
            }

        } catch (e) {
            output.textContent = "❌ Invalid JSON or Schema format";
        }
    };

    // CLEAR
    window.clearToolAction = function () {
        jsonInput.value = "";
        schemaInput.value = "";
        output.textContent = "Validation result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initJsonSchemaValidator);

// URL VALIDATOR

function initUrlValidator() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (!input || !output) return;

    window.runToolAction = function () {
        try {
            const url = new URL(input.value);

            const result = `
✅ Valid URL

Protocol: ${url.protocol}
Host: ${url.hostname}
Port: ${url.port || "default"}
Path: ${url.pathname}
Query: ${url.search || "none"}
Hash: ${url.hash || "none"}
`;

            output.textContent = result;

        } catch (e) {
            output.textContent = "❌ Invalid URL";
        }
    };

    window.clearToolAction = function () {
        input.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initUrlValidator);

// CREDIT CARD VALIDATOR (PRO)

function initCreditCardValidator() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    if (!input || !output) return;

    function luhnCheck(num) {
        let sum = 0;
        let shouldDouble = false;

        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num[i]);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    }

    function detectCardType(num) {
        if (/^4/.test(num)) return "Visa";
        if (/^5[1-5]/.test(num)) return "Mastercard";
        if (/^3[47]/.test(num)) return "American Express";
        if (/^6/.test(num)) return "Discover";
        return "Unknown";
    }

    window.runToolAction = function () {
        const value = input.value.replace(/\s+/g, "");

        if (!/^\d+$/.test(value)) {
            output.textContent = "❌ Invalid input (numbers only)";
            return;
        }

        const isValid = luhnCheck(value);
        const type = detectCardType(value);
        const last4 = value.slice(-4);

        output.textContent = `
${isValid ? "✅ Valid card" : "❌ Invalid card"}

Type: ${type}
Last 4 digits: ${last4}
Length: ${value.length}
`;
    };

    window.clearToolAction = function () {
        input.value = "";
        output.textContent = "Result will appear here...";
    };
}

document.addEventListener("DOMContentLoaded", initCreditCardValidator);