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
async function copyPassword(buttonEl) {

    const output = document.getElementById("output");
    const password = output.textContent.trim();
    const copyButton = buttonEl || document.getElementById("copyPasswordButton");

    if (!password) {
        if (copyButton) {
            const originalText = copyButton.textContent;
            copyButton.textContent = "Generate first";
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 1200);
        }
        if (window.showToast) {
            window.showToast("Generate a password first", "info");
        }
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        if (copyButton) {
            const originalText = copyButton.textContent;
            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 1200);
        }
        if (window.showToast) {
            window.showToast("Password copied", "success");
        }
    } catch {
        if (copyButton) {
            const originalText = copyButton.textContent;
            copyButton.textContent = "Copy failed";
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 1200);
        }
        if (window.showToast) {
            window.showToast("Clipboard blocked", "error");
        }
    }
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

const decodeBase64UrlJSON = (segment) => {
const base64 = segment
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(segment.length / 4) * 4, "=");

const binary = atob(base64);
const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
const jsonText = new TextDecoder().decode(bytes);

return JSON.parse(jsonText);
};

const header = decodeBase64UrlJSON(parts[0]);
const payload = decodeBase64UrlJSON(parts[1]);

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

if (!text) {
output.textContent = "Enter text";
return;
}

// 🔐 MD5 → CryptoJS
if (type === "md5") {
output.textContent = CryptoJS.MD5(text).toString();
return;
}

const data = utf8Bytes(text);

try {
if (window.crypto && window.crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest(type, data);
    output.textContent = bytesToHex(new Uint8Array(hashBuffer));
    return;
}
} catch {
// Si Web Crypto falla (ej. file://), sigue al fallback local.
}

if (type === "SHA-1") {
output.textContent = bytesToHex(sha1Bytes(data));
return;
}

if (type === "SHA-256") {
output.textContent = bytesToHex(sha256Bytes(data));
return;
}

output.textContent = "Unsupported hash type";
}

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

function rotr(x, n) {
return (x >>> n) | (x << (32 - n));
}

function bytesToHex(bytes) {
return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function utf8Bytes(str) {
if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str);
}

const bytes = [];
for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);

    if (code < 0x80) {
    bytes.push(code);
    } else if (code < 0x800) {
    bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff) {
    i++;
    const next = str.charCodeAt(i);
    const cp = 0x10000 + (((code & 0x3ff) << 10) | (next & 0x3ff));
    bytes.push(
        0xf0 | (cp >> 18),
        0x80 | ((cp >> 12) & 0x3f),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f)
    );
    } else {
    bytes.push(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
    );
    }
}

return new Uint8Array(bytes);
}

function sha256Bytes(messageBytes) {
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

let h0 = 0x6a09e667;
let h1 = 0xbb67ae85;
let h2 = 0x3c6ef372;
let h3 = 0xa54ff53a;
let h4 = 0x510e527f;
let h5 = 0x9b05688c;
let h6 = 0x1f83d9ab;
let h7 = 0x5be0cd19;

const ml = messageBytes.length * 8;
const withOne = messageBytes.length + 1;
const totalLen = (((withOne + 8 + 63) >> 6) << 6);
const padded = new Uint8Array(totalLen);

padded.set(messageBytes);
padded[messageBytes.length] = 0x80;

const view = new DataView(padded.buffer);
view.setUint32(totalLen - 8, Math.floor(ml / 0x100000000), false);
view.setUint32(totalLen - 4, ml >>> 0, false);

const w = new Uint32Array(64);

for (let i = 0; i < totalLen; i += 64) {
    for (let t = 0; t < 16; t++) {
    w[t] = view.getUint32(i + t * 4, false);
    }

    for (let t = 16; t < 64; t++) {
    const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
    const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
    w[t] = (((w[t - 16] + s0) | 0) + ((w[t - 7] + s1) | 0)) | 0;
    }

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;

    for (let t = 0; t < 64; t++) {
    const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
    const ch = (e & f) ^ (~e & g);
    const temp1 = ((((h + S1) | 0) + ((ch + K[t]) | 0)) | 0) + w[t] | 0;
    const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
    const maj = (a & b) ^ (a & c) ^ (b & c);
    const temp2 = (S0 + maj) | 0;

    h = g;
    g = f;
    f = e;
    e = (d + temp1) | 0;
    d = c;
    c = b;
    b = a;
    a = (temp1 + temp2) | 0;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
    h5 = (h5 + f) | 0;
    h6 = (h6 + g) | 0;
    h7 = (h7 + h) | 0;
}

const out = new Uint8Array(32);
const outView = new DataView(out.buffer);
outView.setUint32(0, h0 >>> 0, false);
outView.setUint32(4, h1 >>> 0, false);
outView.setUint32(8, h2 >>> 0, false);
outView.setUint32(12, h3 >>> 0, false);
outView.setUint32(16, h4 >>> 0, false);
outView.setUint32(20, h5 >>> 0, false);
outView.setUint32(24, h6 >>> 0, false);
outView.setUint32(28, h7 >>> 0, false);

return out;
}

function sha1Bytes(messageBytes) {
let h0 = 0x67452301;
let h1 = 0xefcdab89;
let h2 = 0x98badcfe;
let h3 = 0x10325476;
let h4 = 0xc3d2e1f0;

const ml = messageBytes.length * 8;
const withOne = messageBytes.length + 1;
const totalLen = (((withOne + 8 + 63) >> 6) << 6);
const padded = new Uint8Array(totalLen);

padded.set(messageBytes);
padded[messageBytes.length] = 0x80;

const view = new DataView(padded.buffer);
view.setUint32(totalLen - 8, Math.floor(ml / 0x100000000), false);
view.setUint32(totalLen - 4, ml >>> 0, false);

const w = new Uint32Array(80);

for (let i = 0; i < totalLen; i += 64) {
    for (let t = 0; t < 16; t++) {
    w[t] = view.getUint32(i + t * 4, false);
    }

    for (let t = 16; t < 80; t++) {
    w[t] = rotr(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 31);
    }

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;

    for (let t = 0; t < 80; t++) {
    let f;
    let k;

    if (t < 20) {
        f = (b & c) | (~b & d);
        k = 0x5a827999;
    } else if (t < 40) {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
    } else if (t < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8f1bbcdc;
    } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
    }

    const temp = ((rotr(a, 27) + f + e + k + w[t]) | 0);
    e = d;
    d = c;
    c = rotr(b, 2);
    b = a;
    a = temp;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
}

const out = new Uint8Array(20);
const outView = new DataView(out.buffer);
outView.setUint32(0, h0 >>> 0, false);
outView.setUint32(4, h1 >>> 0, false);
outView.setUint32(8, h2 >>> 0, false);
outView.setUint32(12, h3 >>> 0, false);
outView.setUint32(16, h4 >>> 0, false);

return out;
}

function hmacSha256Bytes(secret, message) {
const blockSize = 64;
let key = utf8Bytes(secret);

if (key.length > blockSize) {
    key = sha256Bytes(key);
}

const keyBlock = new Uint8Array(blockSize);
keyBlock.set(key);

const oKeyPad = new Uint8Array(blockSize);
const iKeyPad = new Uint8Array(blockSize);

for (let i = 0; i < blockSize; i++) {
    oKeyPad[i] = keyBlock[i] ^ 0x5c;
    iKeyPad[i] = keyBlock[i] ^ 0x36;
}

const inner = new Uint8Array(iKeyPad.length + message.length);
inner.set(iKeyPad);
inner.set(message, iKeyPad.length);

const innerHash = sha256Bytes(inner);

const outer = new Uint8Array(oKeyPad.length + innerHash.length);
outer.set(oKeyPad);
outer.set(innerHash, oKeyPad.length);

return sha256Bytes(outer);
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

    let signature;

    if (window.crypto && window.crypto.subtle) {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(data)
    );

    signature = base64url(signatureBuffer);
    } else {
    const signatureBytes = hmacSha256Bytes(secret, utf8Bytes(data));
    signature = base64url(signatureBytes);
    }

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