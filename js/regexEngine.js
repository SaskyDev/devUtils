(function (scope) {
    "use strict";

    const MAX_MATCHES = 1000;

    function normalizePattern(pattern, selectedFlags = "") {
        const literal = pattern.match(/^\/([\s\S]*)\/([gimsuy]*)$/);
        const source = literal ? literal[1] : pattern;
        const combinedFlags = selectedFlags + (literal ? literal[2] : "");
        const flags = [...new Set(combinedFlags)].join("");

        return { source, flags };
    }

    function advanceIndex(text, index, unicode) {
        if (!unicode || index >= text.length) return index + 1;
        const first = text.charCodeAt(index);
        if (first < 0xD800 || first > 0xDBFF || index + 1 >= text.length) {
            return index + 1;
        }
        const second = text.charCodeAt(index + 1);
        return second >= 0xDC00 && second <= 0xDFFF ? index + 2 : index + 1;
    }

    function run(pattern, text, selectedFlags = "") {
        const normalized = normalizePattern(pattern, selectedFlags);
        const regex = new RegExp(normalized.source, normalized.flags);
        const matches = [];
        let truncated = false;
        let match;

        if (regex.global || regex.sticky) {
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    value: match[0],
                    index: match.index,
                    groups: match.slice(1),
                });

                if (matches.length >= MAX_MATCHES) {
                    truncated = true;
                    break;
                }

                if (match[0] === "") {
                    regex.lastIndex = advanceIndex(text, regex.lastIndex, regex.unicode);
                }
            }
        } else {
            match = regex.exec(text);
            if (match) {
                matches.push({
                    value: match[0],
                    index: match.index,
                    groups: match.slice(1),
                });
            }
        }

        return {
            source: normalized.source,
            flags: normalized.flags,
            matches,
            truncated,
        };
    }

    function format(result) {
        const expression = `/${result.source}/${result.flags}`;
        if (result.matches.length === 0) {
            return `${expression}\n\nNo matches found ✘`;
        }

        const lines = result.matches.map((match, index) => {
            const value = match.value === "" ? "(empty match)" : JSON.stringify(match.value);
            const captures = match.groups.length
                ? ` | groups: ${match.groups.map((group) => JSON.stringify(group ?? null)).join(", ")}`
                : "";
            return `${index + 1}. ${value} — index ${match.index}${captures}`;
        });

        const summary = result.truncated
            ? `First ${result.matches.length} matches shown (display limit reached) ✔`
            : `${result.matches.length} match${result.matches.length === 1 ? "" : "es"} found ✔`;
        return `${expression}\n\n${summary}\n${lines.join("\n")}`;
    }

    scope.RegexEngine = {
        MAX_MATCHES,
        format,
        normalizePattern,
        run,
    };
})(typeof self !== "undefined" ? self : globalThis);
