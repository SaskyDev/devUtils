const generateRandom = () => {

    const min = parseInt(document.getElementById("min").value);

    const max = parseInt(document.getElementById("max").value);

    const number =
        Math.floor(Math.random() * (max - min + 1)) + min;

    document.getElementById("output").textContent = number;

};