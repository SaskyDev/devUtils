const convertTimestamp = () => {

    const input = document.getElementById("timestampInput").value;

    const date = new Date(input * 1000);

    document.getElementById("output").textContent = date.toUTCString();

};