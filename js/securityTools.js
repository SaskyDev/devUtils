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