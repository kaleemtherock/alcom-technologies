"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const router = express_1.default.Router();
// Save user preferences
router.post('/preferences', authMiddleware_1.verifyToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    const { learningGoals, experienceLevel, preferredTopics, timeCommitment, careerObjectives } = req.body;
    const userPreferences = yield prisma_1.default.userPreferences.upsert({
        where: { userId },
        update: {
            learningGoals,
            experienceLevel,
            preferredTopics,
            timeCommitment,
            careerObjectives,
            updatedAt: new Date()
        },
        create: {
            userId,
            learningGoals,
            experienceLevel,
            preferredTopics,
            timeCommitment,
            careerObjectives
        }
    });
    // Get recommended courses based on preferences
    const recommendedCourses = yield prisma_1.default.course.findMany({
        where: {
            OR: [
                { topics: { hasSome: preferredTopics } },
                { difficultyLevel: experienceLevel }
            ]
        },
        take: 5,
        orderBy: { rating: 'desc' }
    });
    res.json({
        preferences: userPreferences,
        recommendedCourses
    });
})));
// Get user preferences and recommendations
router.get('/preferences', authMiddleware_1.verifyToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    const userPreferences = yield prisma_1.default.userPreferences.findUnique({
        where: { userId }
    });
    if (!userPreferences) {
        return res.json({
            preferences: null,
            recommendedCourses: []
        });
    }
    const recommendedCourses = yield prisma_1.default.course.findMany({
        where: {
            OR: [
                { topics: { hasSome: userPreferences.preferredTopics } },
                { difficultyLevel: userPreferences.experienceLevel }
            ]
        },
        take: 5,
        orderBy: { rating: 'desc' }
    });
    res.json({
        preferences: userPreferences,
        recommendedCourses
    });
})));
exports.default = router;
//# sourceMappingURL=userPreferences.js.map