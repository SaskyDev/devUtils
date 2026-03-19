// ---------- PASSWORD TOOL ----------

const generatePassword = () => {

    const length = $("length").value;

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    $("output").textContent = password;
};


// ✅ FORA de la funció
function copyPassword() {

    const password = document.getElementById("output").textContent;

    if (!password) return;

    navigator.clipboard.writeText(password);

    document.getElementById("output").textContent = "Copied to clipboard ✅";
}

// ---------- UUID TOOL ----------

const generateUUID = () => {

    $("output").textContent = crypto.randomUUID();

};

const validateUUID = () => {

    const uuid = document.getElementById("uuidInput").value;

    const regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const valid = regex.test(uuid);

    document.getElementById("output").textContent =
        valid ? "Valid UUID" : "Invalid UUID";

};

function decodeJWT() {

const token = document.getElementById("jwtInput").value.trim();
const output = document.getElementById("output");

try {

const parts = token.split(".");

if (parts.length !== 3) {
output.textContent = "Invalid JWT format";
return;
}

const header = JSON.parse(atob(parts[0]));
const payload = JSON.parse(atob(parts[1]));

output.textContent =
"HEADER:\n" +
JSON.stringify(header, null, 2) +
"\n\nPAYLOAD:\n" +
JSON.stringify(payload, null, 2);

} catch {

output.textContent = "Unable to decode token";

}

}

async function generateHash(type) {

const text = document.getElementById("hashInput").value;
const output = document.getElementById("output");

const encoder = new TextEncoder();
const data = encoder.encode(text);

const hashBuffer = await crypto.subtle.digest(type, data);

const hashArray = Array.from(new Uint8Array(hashBuffer));

const hashHex = hashArray
.map(b => b.toString(16).padStart(2, "0"))
.join("");

output.textContent = hashHex;

};

function checkPasswordStrength() {

const password = document.getElementById("passwordInput").value;
const output = document.getElementById("output");

let score = 0;

if (password.length >= 8) score++;
if (/[A-Z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;

if (score <= 1) {
output.textContent = "Weak password";
}
else if (score <= 3) {
output.textContent = "Medium password";
}
else {
output.textContent = "Strong password";
}

};

// ================= HELPERS =================

function base64url(input) {
return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function encodeJSON(obj) {
return base64url(new TextEncoder().encode(JSON.stringify(obj)));
}


// ================= MAIN =================

async function generateJWT() {
try {
    const header = JSON.parse(document.getElementById("jwtHeader").value);
    const payload = JSON.parse(document.getElementById("jwtPayload").value);
    const secret = document.getElementById("jwtSecret").value;

    if (!secret) {
    alert("Secret is required");
    return;
    }

    const headerEncoded = encodeJSON(header);
    const payloadEncoded = encodeJSON(payload);

    const data = `${headerEncoded}.${payloadEncoded}`;

    // 🔐 Crear clave HMAC SHA256
    const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
    );

    // 🔐 Firmar
    const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
    );

    const signature = base64url(signatureBuffer);

    const token = `${data}.${signature}`;

    document.getElementById("output").textContent = token;

} catch (e) {
    document.getElementById("output").textContent = "Invalid JSON";
}
};

// ================= HASH COMPARE =================

function compareHash() {
const h1 = document.getElementById("hash1").value.trim();
const h2 = document.getElementById("hash2").value.trim();

if (!h1 || !h2) {
    document.getElementById("output").textContent = "Enter both hashes";
    return;
}

if (h1 === h2) {
    document.getElementById("output").textContent = "Match ✅";
} else {
    document.getElementById("output").textContent = "Do not match ❌";
}
};