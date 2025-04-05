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
// src/routes/lessons.ts
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const superadminMiddleware_1 = require("../middleware/superadminMiddleware");
const router = express_1.default.Router();
// ✅ Instructor/Admin - Upload lesson
router.post("/", authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, courseId, contentUrl, contentType } = req.body;
    if (!title || !description || !courseId || !contentType) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const lesson = yield prisma_1.default.lesson.create({
        data: {
            title,
            description,
            contentUrl,
            contentType,
            courseId,
            createdById: req.user.userId,
            isApproved: false,
        },
    });
    res.status(201).json(lesson);
})));
// ✅ Instructor/Admin - View lessons by course
router.get("/", authMiddleware_1.verifyToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.query;
    const lessons = yield prisma_1.default.lesson.findMany({
        where: courseId ? { courseId: String(courseId) } : undefined,
        orderBy: { createdAt: "desc" },
    });
    res.json(lessons);
})));
// ✅ Superadmin - View pending lessons
router.get("/pending", superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingLessons = yield prisma_1.default.lesson.findMany({
        where: { isApproved: false },
        orderBy: { createdAt: "desc" },
    });
    res.json(pendingLessons);
})));
// ✅ Superadmin - Approve lesson
router.patch("/:id/approve", superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const updated = yield prisma_1.default.lesson.update({
        where: { id },
        data: {
            isApproved: true,
            approvedBy: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || "system",
        },
    });
    res.json(updated);
})));
// ✅ Superadmin - Delete lesson
router.delete("/:id", superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.lesson.delete({ where: { id } });
    res.json({ message: "Lesson deleted" });
})));
exports.default = router;
//# sourceMappingURL=lessons.js.map