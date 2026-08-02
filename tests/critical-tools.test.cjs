const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

function findFiles(directory, predicate, found = []) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
        if (entry.name === ".git" || entry.name.startsWith("._")) return;
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            findFiles(absolutePath, predicate, found);
        } else if (predicate(absolutePath)) {
            found.push(absolutePath);
        }
    });
    return found;
}

function loadScript(relativePath, elements = {}) {
    return loadScripts([relativePath], elements);
}

function loadScripts(relativePaths, elements = {}) {
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
    relativePaths.forEach((relativePath) => {
        vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context);
    });
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

test("JSON to XML escapes values and handles arrays, null and invalid tag names", () => {
    const context = loadScript("js/devTools.js");
    const xml = context.jsonToXML({
        message: "A & B < C",
        tags: ["dev", "tools"],
        empty: null,
        "first name": "Alex \"Sasky\"",
    });

    assert.match(xml, /<message>A &amp; B &lt; C<\/message>/);
    assert.match(xml, /<tags>\s*<item>dev<\/item>\s*<item>tools<\/item>\s*<\/tags>/);
    assert.match(xml, /<empty \/>/);
    assert.match(xml, /<item key="first name">Alex "Sasky"<\/item>/);
});

test("JavaScript compaction preserves comments, URLs and line boundaries", () => {
    const context = loadScript("js/devTools.js");
    const input = [
        "const url = \"https://example.com/a//b\";   ",
        "",
        "// Keep this comment",
        "returnValue()",
        "[1, 2].forEach(useValue)",
    ].join("\n");
    const compacted = context.compactJavaScript(input);

    assert.match(compacted, /https:\/\/example\.com\/a\/\/b/);
    assert.match(compacted, /\/\/ Keep this comment/);
    assert.match(compacted, /returnValue\(\)\n\[1, 2\]/);
});

test("CSS minification preserves strings, calc spaces and license comments", () => {
    const context = loadScript("js/devTools.js");
    const css = '/*! License */ .item { content: "a  b"; width: calc(100% - 1px); /* remove */ }';
    const minified = context.minifyCSSContent(css);

    assert.match(minified, /\/\*! License \*\//);
    assert.match(minified, /content:"a  b"/);
    assert.match(minified, /calc\(100% - 1px\)/);
    assert.doesNotMatch(minified, /remove/);
});

test("HTML minification preserves meaningful content and conditional comments", () => {
    const context = loadScript("js/htmlTools.js");
    const html = [
        "  <!-- remove -->",
        "<span>Hello</span> <span>world</span>",
        "<pre>  keep\n  this</pre>",
        "<script>const example = \"<!-- keep in script -->\";</script>",
        "<!-- [if IE]>keep<![endif]-->",
        "  ",
    ].join("\n");
    const minified = context.minifyHTMLContent(html);

    assert.doesNotMatch(minified, /remove/);
    assert.match(minified, /<\/span> <span>/);
    assert.match(minified, /<pre>  keep\n  this<\/pre>/);
    assert.match(minified, /keep in script/);
    assert.match(minified, /\[if IE\]/);
});

test("HTML preview iframe is sandboxed", () => {
    const html = fs.readFileSync(path.join(root, "tools/html-preview/index.html"), "utf8");
    assert.match(html, /<iframe[\s\S]*?\bsandbox=""[\s\S]*?id="preview"|<iframe[\s\S]*?id="preview"[\s\S]*?\bsandbox=""/);
});

test("Regex tester supports JavaScript flags and reports match indexes", () => {
    const context = loadScript("js/regexEngine.js");
    const result = context.RegexEngine.run("hello", "Hello hello", "gi");

    assert.equal(result.flags, "gi");
    assert.deepEqual(
        JSON.parse(JSON.stringify(result.matches)),
        [
            { value: "Hello", index: 0, groups: [] },
            { value: "hello", index: 6, groups: [] },
        ]
    );
});

test("Regex tester accepts literal syntax and capture groups", () => {
    const context = loadScript("js/regexEngine.js");
    const result = context.RegexEngine.run("/(user)-(\\d+)/i", "USER-42", "g");

    assert.equal(result.source, "(user)-(\\d+)");
    assert.equal(result.flags, "gi");
    assert.equal(result.matches[0].index, 0);
    assert.deepEqual(
        JSON.parse(JSON.stringify(result.matches[0].groups)),
        ["USER", "42"]
    );
});

test("Regex tester terminates safely for global empty matches", () => {
    const context = loadScript("js/regexEngine.js");
    const result = context.RegexEngine.run("(?=a)", "aa", "g");

    assert.deepEqual(
        JSON.parse(JSON.stringify(result.matches.map((match) => match.index))),
        [0, 1]
    );
});

test("Regex tester caps broad results before flooding the page", () => {
    const context = loadScript("js/regexEngine.js");
    const result = context.RegexEngine.run(".", "a".repeat(1100), "g");

    assert.equal(result.matches.length, 1000);
    assert.equal(result.truncated, true);
    assert.match(context.RegexEngine.format(result), /display limit reached/);
});

test("Regex Tester loads its engine before the UI and worker", () => {
    const html = fs.readFileSync(path.join(root, "tools/regex-tester/index.html"), "utf8");
    const engineIndex = html.indexOf("../../js/regexEngine.js");
    const uiIndex = html.indexOf("../../js/regexTools.js");
    const worker = fs.readFileSync(path.join(root, "js/regexWorker.js"), "utf8");

    assert.ok(engineIndex >= 0 && engineIndex < uiIndex);
    assert.match(worker, /importScripts\("regexEngine\.js"\)/);
    assert.match(worker, /RegexEngine\.run/);
});

test("User-controlled compare output does not use innerHTML", () => {
    const devTools = fs.readFileSync(path.join(root, "js/devTools.js"), "utf8");
    const textTools = fs.readFileSync(path.join(root, "js/textTools.js"), "utf8");

    assert.doesNotMatch(devTools, /\.innerHTML\s*=/);
    assert.doesNotMatch(textTools, /\.innerHTML\s*=/);
});

test("Global UI gives orphaned form controls an accessible fallback name", () => {
    const ui = fs.readFileSync(path.join(root, "js/ui.js"), "utf8");

    assert.match(ui, /input:not\(\[type='hidden'\]\), textarea, select/);
    assert.match(ui, /control\.closest\("label"\)/);
    assert.match(ui, /control\.setAttribute\("aria-label", fallbackLabel\)/);
    assert.match(ui, /initAccessibleFormControls\(\)/);
});

test("Every sitemap URL is unique and resolves to a local page", () => {
    const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>(https:\/\/devutilskit\.com\/[^<]*)<\/loc>/g)]
        .map((match) => match[1]);

    assert.equal(urls.length, new Set(urls).size);
    assert.doesNotMatch(sitemap, /\/tools\/html-encoder\/decoder\//);

    urls.forEach((url) => {
        const pathname = new URL(url).pathname;
        const relativePath = pathname === "/"
            ? "index.html"
            : pathname.endsWith("/")
                ? path.join(pathname.slice(1), "index.html")
                : pathname.slice(1);
        assert.equal(fs.existsSync(path.join(root, relativePath)), true, `${url} has no local page`);
    });
});

test("The live catalog has 68 unique tool routes with complete pages", () => {
    const registry = fs.readFileSync(path.join(root, "js/ui.js"), "utf8");
    const routes = [...registry.matchAll(/url:\s*"(tools\/[^"]+\/)"/g)]
        .map((match) => match[1]);

    assert.equal(routes.length, 68);
    assert.equal(routes.length, new Set(routes).size);
    routes.forEach((route) => {
        assert.equal(
            fs.existsSync(path.join(root, route, "index.html")),
            true,
            `${route} is missing index.html`
        );
    });
});

test("Every catalog tool has core SEO metadata and valid JSON-LD", () => {
    const registry = fs.readFileSync(path.join(root, "js/ui.js"), "utf8");
    const routes = [...registry.matchAll(/url:\s*"(tools\/[^"]+\/)"/g)]
        .map((match) => match[1]);
    const canonicals = new Set();

    routes.forEach((route) => {
        const html = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
        assert.match(html, /<meta name="viewport"[^>]*>/i, `${route} needs viewport metadata`);
        assert.match(html, /<meta name="description" content="[^"]+"/i, `${route} needs a description`);
        assert.match(html, /<meta property="og:title" content="[^"]+"/i, `${route} needs og:title`);
        assert.match(html, /<meta property="og:description" content="[^"]+"/i, `${route} needs og:description`);
        assert.match(html, /<meta property="og:url" content="[^"]+"/i, `${route} needs og:url`);
        assert.match(html, /<meta name="twitter:card" content="[^"]+"/i, `${route} needs twitter:card`);
        assert.match(html, /<h1>[\s\S]*?<\/h1>/i, `${route} needs an h1`);

        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
        assert.ok(canonical, `${route} needs a canonical URL`);
        assert.equal(canonicals.has(canonical), false, `${canonical} is duplicated`);
        canonicals.add(canonical);

        const jsonLdBlocks = [...html.matchAll(
            /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
        )].map((match) => match[1]);
        assert.ok(jsonLdBlocks.length >= 2, `${route} needs application and breadcrumb JSON-LD`);
        jsonLdBlocks.forEach((block) => assert.doesNotThrow(() => JSON.parse(block), `${route} has invalid JSON-LD`));
    });
});

test("Local links and assets referenced by HTML pages exist", () => {
    const htmlFiles = findFiles(
        root,
        (file) => file.endsWith(".html") && !file.includes(`${path.sep}templates${path.sep}`)
    );

    htmlFiles.forEach((htmlFile) => {
        const html = fs.readFileSync(htmlFile, "utf8");
        const references = [...html.matchAll(/\b(?:href|src)="([^"]+)"/gi)]
            .map((match) => match[1])
            .filter((reference) => !/^(?:https?:|mailto:|tel:|data:|#)/i.test(reference));

        references.forEach((reference) => {
            const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
            if (!cleanReference) return;
            let target = cleanReference.startsWith("/")
                ? path.join(root, cleanReference.slice(1))
                : path.resolve(path.dirname(htmlFile), cleanReference);
            if (cleanReference.endsWith("/") || (fs.existsSync(target) && fs.statSync(target).isDirectory())) {
                target = path.join(target, "index.html");
            }
            assert.equal(
                fs.existsSync(target),
                true,
                `${path.relative(root, htmlFile)} references missing ${reference}`
            );
        });
    });
});
