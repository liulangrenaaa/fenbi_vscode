"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeChoice = exports.parseChoiceIndexes = void 0;
const toNumber = (value) => {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : undefined;
};
const parseChoiceIndexes = (choice, multiple = false) => {
    if (Array.isArray(choice)) {
        return choice
            .map(toNumber)
            .filter((value) => value !== undefined);
    }
    if (choice === undefined || choice === null)
        return [];
    const normalized = String(choice).trim();
    if (!normalized)
        return [];
    if (/\D/.test(normalized)) {
        return normalized
            .split(/\D+/)
            .filter(Boolean)
            .map(Number)
            .filter(Number.isFinite);
    }
    if (multiple && normalized.length > 1) {
        return normalized
            .split("")
            .map(Number)
            .filter(Number.isFinite);
    }
    const numberValue = Number(normalized);
    return Number.isFinite(numberValue) ? [numberValue] : [];
};
exports.parseChoiceIndexes = parseChoiceIndexes;
const normalizeChoice = (choice, multiple = false) => {
    return (0, exports.parseChoiceIndexes)(choice, multiple)
        .slice()
        .sort((left, right) => left - right)
        .join(",");
};
exports.normalizeChoice = normalizeChoice;
//# sourceMappingURL=answerChoice.js.map