"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_NAME = void 0;
const parser = require("postcss-selector-parser");
exports.PLUGIN_NAME = "postcss-scope";
const parse = (scope) => parser((selectors) => {
    let done = false;
    selectors.walkNesting((nesting) => {
        done = true;
        nesting.replaceWith(parser.string({ value: scope }));
    });
    if (done) {
        return;
    }
    selectors.first.prepend(parser.selector({
        value: "scope",
        nodes: [parser.string({ value: scope + " " })],
    }));
});
function processNode(node, scopes) {
    if (node.type === "atrule") {
        node.nodes.forEach((node) => processNode(node, scopes));
        return;
    }
    if (node.type === "rule") {
        if (/^(body|html|:root)/.test(node.selector)) {
            node.selector = node.selector.replace(/^(body|html|:root)/, scopes.join(", "));
            return;
        }
        const selectors = [];
        for (const scope of scopes) {
            const scoped = node.selectors.map((selector) => {
                return parse(scope).processSync(selector);
            });
            selectors.push(...scoped);
        }
        node.selectors = selectors;
    }
}
function includes(array, item) {
    return array.some((i) => i === item);
}
function getConfig(nodes) {
    const config = {
        scope: "",
        ignoreFile: false,
        ignoreRules: [],
    };
    for (const node of nodes) {
        if (node.type !== "comment") {
            continue;
        }
        const comment = node;
        const index = nodes.indexOf(comment);
        if (!comment.text.startsWith(`${exports.PLUGIN_NAME}:`)) {
            continue;
        }
        const [, action] = comment.text.split(":");
        switch (action) {
            case "ignore-file":
                config.ignoreFile = true;
                break;
            case "ignore":
                config.ignoreRules.push(index + 1);
                break;
            default:
                config.scope = action;
        }
    }
    return config;
}
/**
 * Initialise the plugin with options
 * @param options
 */
function plugin(options) {
    const opts = typeof options === "string" || Array.isArray(options)
        ? { scope: options }
        : options;
    return {
        postcssPlugin: exports.PLUGIN_NAME,
        Root(root) {
            const { nodes } = root;
            const config = getConfig(nodes);
            if (config.ignoreFile) {
                return;
            }
            const scope = config.scope || opts.scope;
            const scopes = Array.isArray(scope) ? scope : [scope];
            for (const node of nodes) {
                const index = nodes.indexOf(node);
                if (includes(config.ignoreRules, index)) {
                    continue;
                }
                processNode(node, scopes);
            }
        },
    };
}
module.exports.postcss = true;
module.exports = plugin;
exports.default = plugin;
