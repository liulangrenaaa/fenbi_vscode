"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectiveResultStats = void 0;
const answerChoice_1 = require("./answerChoice");
const getObjectiveResultStats = (solutions = []) => {
    let questionCount = 0;
    let correctCount = 0;
    solutions.forEach((item) => {
        var _a, _b;
        const multiple = item.type === 2;
        const answer = (0, answerChoice_1.normalizeChoice)((_a = item.userAnswer) === null || _a === void 0 ? void 0 : _a.choice, multiple);
        const expected = (0, answerChoice_1.normalizeChoice)((_b = item.correctAnswer) === null || _b === void 0 ? void 0 : _b.choice, multiple);
        if (!answer || !expected)
            return;
        questionCount += 1;
        if (answer === expected)
            correctCount += 1;
    });
    return { questionCount, correctCount };
};
exports.getObjectiveResultStats = getObjectiveResultStats;
//# sourceMappingURL=resultStats.js.map