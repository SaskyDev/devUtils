const convertTimestamp = () => {

    const input = document.getElementById("timestampInput").value.trim();
    const output = document.getElementById("output");
    const baseInput = document.getElementById("epochBase")?.value.trim() || "1970-01-01T00:00:00Z";

    if (!input) {
        output.textContent = "Enter a timestamp";
        if (window.showToast) window.showToast("Enter a timestamp", "info");
        return;
    }

    const baseDate = new Date(baseInput);

    if (isNaN(baseDate.getTime())) {
        output.textContent = "Invalid base date. Use ISO format like 1970-01-01T00:00:00Z";
        if (window.showToast) window.showToast("Invalid base date", "error");
        return;
    }

    if (!/^-?\d+$/.test(input)) {
        output.textContent = "Timestamp must be a valid integer";
        if (window.showToast) window.showToast("Timestamp must be an integer", "error");
        return;
    }

    const numericTimestamp = parseInt(input, 10);
    const timestampMs = input.length === 13 ? numericTimestamp : numericTimestamp * 1000;
    const date = new Date(baseDate.getTime() + timestampMs);

    if (isNaN(date.getTime())) {
        output.textContent = "Invalid timestamp";
        if (window.showToast) window.showToast("Invalid timestamp", "error");
        return;
    }

    output.textContent =
        "Base (UTC): " + baseDate.toISOString() + "\n" +
        "ISO: " + date.toISOString() + "\n" +
        "Local: " + date.toLocaleString();

    if (window.showToast) window.showToast("Timestamp converted", "success", 1400);

};

function generateTimestamp() {

const output = document.getElementById("output");
const baseInput = document.getElementById("epochBase")?.value.trim() || "1970-01-01T00:00:00Z";
const baseDate = new Date(baseInput);

if (isNaN(baseDate.getTime())) {
output.textContent = "Invalid base date. Use ISO format like 1970-01-01T00:00:00Z";
if (window.showToast) window.showToast("Invalid base date", "error");
return;
}

const nowMs = Date.now();
const elapsedMs = nowMs - baseDate.getTime();
const elapsedSeconds = Math.floor(elapsedMs / 1000);

output.textContent =
`Seconds: ${elapsedSeconds}
Milliseconds: ${elapsedMs}
Base (UTC): ${baseDate.toISOString()}
Now (UTC): ${new Date(nowMs).toISOString()}`;

if (window.showToast) window.showToast("Timestamp generated", "success", 1400);

};