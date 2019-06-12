"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const optionsUtil = __importStar(require("../cli/util/options"));
exports.parse = optionsUtil.parse;
/** Generates the help text for the specified configuration. */
function help(config, options) {
    if (!options)
        options = {};
    var indent = options.indent || 2;
    var padding = options.padding || 24;
    var eol = options.eol || "\n";
    var sb = [];
    console.log(Object.getOwnPropertyNames(config));
    console.log(config.help);
    Object.keys(config).forEach(key => {
        console.log("in help " + key);
        var option = config[key];
        if (option.description == null)
            return;
        var text = "";
        while (text.length < indent)
            text += " ";
        text += "--" + key;
        if (option.alias)
            text += ", -" + option.alias;
        while (text.length < padding)
            text += " ";
        if (Array.isArray(option.description)) {
            sb.push(text + option.description[0] + option.description.slice(1).map(line => {
                for (let i = 0; i < padding; ++i)
                    line = " " + line;
                return eol + line;
            }).join(""));
        }
        else
            sb.push(text + option.description);
    });
    return sb.join(eol);
}
exports.help = help;
