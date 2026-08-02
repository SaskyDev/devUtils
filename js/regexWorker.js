"use strict";

importScripts("regexEngine.js");

self.addEventListener("message", (event) => {
    const { id, pattern, text, flags } = event.data;

    try {
        self.postMessage({
            id,
            result: self.RegexEngine.run(pattern, text, flags),
        });
    } catch (error) {
        self.postMessage({
            id,
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
