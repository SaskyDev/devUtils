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