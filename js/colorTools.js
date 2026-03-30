function hexToRGB() {
    const hex = document.getElementById("colorInput").value.replace("#", "");
    const output = document.getElementById("output");
    if (!output) return;

    if (hex.length !== 6) {
        output.textContent = "Invalid HEX color";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid HEX color", "error");
        return;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    output.textContent = `rgb(${r}, ${g}, ${b})`;
    output.className = "output-box success";
    if (window.showToast) window.showToast("Color converted to RGB", "success", 1400);
}

function rgbToHEX() {
    const raw = document.getElementById("colorInput").value.replace(/rgb\s*\(/i, "").replace(/\)/, "").trim();
    const output = document.getElementById("output");
    if (!output) return;

    const input = raw.split(",");
    if (input.length !== 3) {
        output.textContent = "Invalid RGB format. Use: 255,0,0 or rgb(255,0,0)";
        output.className = "output-box error";
        if (window.showToast) window.showToast("Invalid RGB format", "error");
        return;
    }

    const nums = input.map((value) => parseInt(value.trim(), 10));
    if (nums.some((value) => Number.isNaN(value) || value < 0 || value > 255)) {
        output.textContent = "Invalid RGB values. Each component must be 0–255";
        output.className = "output-box error";
        if (window.showToast) window.showToast("RGB values must be between 0 and 255", "error");
        return;
    }

    const toHex = (value) => value.toString(16).padStart(2, "0");
    output.textContent = `#${toHex(nums[0])}${toHex(nums[1])}${toHex(nums[2])}`;
    output.className = "output-box success";
    if (window.showToast) window.showToast("Color converted to HEX", "success", 1400);
}

function getColorValues() {
    const color = document.getElementById("colorInput").value;
    const output = document.getElementById("output");
    if (!output) return;

    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    output.textContent = "HEX: " + color + "\nRGB: rgb(" + r + "," + g + "," + b + ")";
    output.className = "output-box success";
}