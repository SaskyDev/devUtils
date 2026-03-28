const convertImage = () => {

    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");

    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "Please select an image";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        output.textContent = reader.result;
    };

    reader.onerror = () => {
        output.textContent = "Error reading file";
    };

    reader.readAsDataURL(file);
};


const clearAll = () => {
    document.getElementById("fileInput").value = "";
    document.getElementById("output").textContent = "";
};

const copyOutput = () => {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
};