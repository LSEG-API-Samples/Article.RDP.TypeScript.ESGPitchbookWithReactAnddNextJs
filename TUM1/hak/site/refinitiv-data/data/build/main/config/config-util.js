"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceConfigTemplates = exports.getConfigFilePath = void 0;
const get_1 = __importDefault(require("lodash/get"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const isUndefined_1 = __importDefault(require("lodash/isUndefined"));
const pick_1 = __importDefault(require("lodash/pick"));
const object_hash_1 = __importDefault(require("object-hash"));
const path_1 = __importDefault(require("path"));
const contracts_1 = require("./contracts");
function getConfigFilePath(env = contracts_1.DEFAULT_CONFIG_PLATFORM, dir = contracts_1.DEFAULT_CONFIG_DIR, ext = contracts_1.DEFAULT_CONFIG_FILE_EXTENSION) {
    const fileName = `${contracts_1.DEFAULT_CONFIG_FILE_NAME}.${env}.${ext}`;
    return path_1.default.resolve(dir, fileName);
}
exports.getConfigFilePath = getConfigFilePath;
function replaceConfigTemplates(jsonAsString, search = contracts_1.CONFIG_TEMPLATE_TO_REPLACE) {
    const jsonContent = JSON.parse(jsonAsString);
    const withReplacedEnv = replaceTemplateValuesFromEnv(jsonAsString, search);
    const replacedTemplates = replaceTemplateValuesFromFile(withReplacedEnv, search);
    const result = JSON.parse(replacedTemplates);
    if (object_hash_1.default(jsonContent) !== object_hash_1.default(result)) {
        return replaceConfigTemplates(replacedTemplates, search);
    }
    return result;
}
exports.replaceConfigTemplates = replaceConfigTemplates;
function getMatches(source, regex) {
    const result = new Map();
    let match;
    do {
        match = regex.exec(source);
        if (match) {
            result.set(match[0], match[1].split(contracts_1.CONFIG_TEMPLATE_DIVIDER));
        }
    } while (match);
    return result;
}
function replaceTemplateValuesFromFile(source, regex) {
    const templateValues = new Map();
    const sourceAsJson = JSON.parse(source);
    const templatesMap = getMatches(source, regex);
    for (const [template, templatePath] of templatesMap) {
        const value = pick_1.default(sourceAsJson, templatePath);
        if (value && !isUndefined_1.default(get_1.default(value, templatePath))) {
            const setValue = get_1.default(value, templatePath);
            const isObjectValue = isPlainObject_1.default(setValue);
            const templateToReplace = isObjectValue ? `"${template}"` : template;
            const valueToReplace = isObjectValue ? JSON.stringify(setValue) : setValue;
            templateValues.set(templateToReplace, valueToReplace);
        }
        else {
            templateValues.set(template, template);
        }
    }
    let result = source;
    templateValues.forEach((value, template) => {
        result = result.replace(template, value);
    });
    return result;
}
function replaceTemplateValuesFromEnv(source, regex) {
    const templates = getMatches(source, regex);
    let result = source;
    for (const [template, paths] of templates) {
        const envName = paths.join(contracts_1.CONFIG_TEMPLATE_DIVIDER);
        const value = process.env[envName];
        if (value !== undefined) {
            result = result.replace(template, value);
        }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2NvbmZpZy11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUE2QjtBQUM3Qix5RUFBaUQ7QUFDakQscUVBQTZDO0FBQzdDLHVEQUErQjtBQUMvQiw4REFBK0I7QUFDL0IsZ0RBQXdCO0FBRXhCLDJDQU9xQjtBQVVyQixTQUFnQixpQkFBaUIsQ0FDN0IsTUFBYyxtQ0FBdUIsRUFDckMsTUFBYyw4QkFBa0IsRUFDaEMsTUFBYyx5Q0FBNkI7SUFFM0MsTUFBTSxRQUFRLEdBQUcsR0FBRyxvQ0FBd0IsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0QsT0FBTyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBUEQsOENBT0M7QUFVRCxTQUFnQixzQkFBc0IsQ0FBQyxZQUFvQixFQUFFLFNBQWlCLHNDQUEwQjtJQUNwRyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTdDLE1BQU0sZUFBZSxHQUFHLDRCQUE0QixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxNQUFNLGlCQUFpQixHQUFHLDZCQUE2QixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVqRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFN0MsSUFBSSxxQkFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLHFCQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsT0FBTyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM1RDtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFiRCx3REFhQztBQVNELFNBQVMsVUFBVSxDQUFDLE1BQWMs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