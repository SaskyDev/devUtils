// ---------- REGEX TOOL ----------

const testRegex = () => {

    try {

        const regex = new RegExp($("pattern").value);

        $("output").textContent = regex.test($("text").value);

    } catch {

        $("output").textContent = "Invalid Regex";

    }
};