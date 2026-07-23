const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

function loadScript(relativePath, elements = {}) {
    const context = {
        console,
        TextDecoder,
        TextEncoder,
        Uint8Array,
        URL,
        atob,
        btoa,
        document: {
            addEventListener() {},
            body: { classList: { contains: () => false } },
            getElementById(id) {
                return elements[id] || null;
            },
            querySelectorAll() {
                return [];
            },
        },
        $(id) {
            return elements[id] || null;
        },
        navigator: { clipboard: { writeText() {} } },
        window: {},
    };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context);
    return context;
}

test("Base64 round-trips Unicode as UTF-8", () => {
    const elements = {
        input: { value: "á😊" },
        output: { textContent: "" },
    };
    const context = loadScript("js/encodingTools.js", elements);

    vm.runInContext("encodeBase64()", context);
    assert.equal(elements.output.textContent, "w6Hwn5iK");

    elements.input.value = elements.output.textContent;
    vm.runInContext("decodeBase64()", context);
    assert.equal(elements.output.textContent, "á😊");
});

test("IP validator accepts compressed IPv6 and rejects invalid input", () => {
    const elements = {
        input: { value: "::1\n2001:db8::1\n2001:::1" },
        output: { textContent: "", className: "" },
    };
    const context = loadScript("js/validationTools.js", elements);

    context.validateIPs();
    assert.match(elements.output.textContent, /✔ ::1/);
    assert.match(elements.output.textContent, /✔ 2001:db8::1/);
    assert.match(elements.output.textContent, /❌ 2001:::1/);
});

test("CSV parser supports commas, escaped quotes and multiline fields", () => {
    const context = loadScript("js/devTools.js");
    const parsed = context.parseCSV(
        'name,note\n"Alex, Jr.","said ""hello"""\nSam,"two\nlines"'
    );

    assert.deepEqual(
        JSON.parse(JSON.stringify(parsed)),
        [
            ["name", "note"],
            ["Alex, Jr.", 'said "hello"'],
            ["Sam", "two\nlines"],
        ]
    );
    assert.equal(context.escapeCSVField('a,"b"'), '"a,""b"""');
});

test("YAML conversion preserves nested objects, arrays and scalar types", () => {
    const context = loadScript("js/devTools.js");
    const input = {
        name: "Alex",
        active: true,
        age: 29,
        profile: { city: "Barcelona", note: "a: b" },
        tags: ["dev", "tools"],
    };

    const yaml = context.jsonToYaml(input);
    const roundTrip = context.yamlToJson(yaml);
    assert.deepEqual(JSON.parse(JSON.stringify(roundTrip)), input);
});

test("HTML preview iframe is sandboxed", () => {
    const html = fs.readFileSync(path.join(root, "tools/html-preview/index.html"), "utf8");
    assert.match(html, /<iframe[\s\S]*?\bsandbox=""[\s\S]*?id="preview"|<iframe[\s\S]*?id="preview"[\s\S]*?\bsandbox=""/);
});
