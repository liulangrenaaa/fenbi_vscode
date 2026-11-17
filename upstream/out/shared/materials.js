"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMaterialsForQuestions = void 0;
const getQuestionCardNodes = (card) => {
    return ((card === null || card === void 0 ? void 0 : card.children) || []).flatMap((chapter) => chapter.children || []);
};
const buildMaterialsForQuestions = (cards, materials = []) => {
    const materialContentMap = new Map(materials.map((material) => [material.globalId, material.content]));
    const usedMaterialKeys = new Set();
    const materialsForRender = [];
    const questions = getQuestionCardNodes(cards);
    questions.forEach((question, index) => {
        const keys = question.materialKeys;
        if (!keys || keys.length === 0) {
            materialsForRender[index] = null;
            return;
        }
        const key = keys[0];
        if (!usedMaterialKeys.has(key)) {
            usedMaterialKeys.add(key);
            materialsForRender[index] = {
                globalId: key,
                content: materialContentMap.get(key) || null,
            };
            return;
        }
        materialsForRender[index] = null;
    });
    return materialsForRender;
};
exports.buildMaterialsForQuestions = buildMaterialsForQuestions;
//# sourceMappingURL=materials.js.map