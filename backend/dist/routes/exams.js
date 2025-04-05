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
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const router = express_1.default.Router();
// Fix middleware typing
const verifyTokenHandler = authMiddleware_1.verifyToken;
// ✅ Create an Exam (Admins/Instructors)
router.post("/create", verifyTokenHandler, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, title, description, duration, passingScore, questions } = req.body;
    if (!courseId || !title || !description || !duration || !passingScore) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    // ✅ Ensure the course exists
    const course = yield prisma_1.default.course.findUnique({ where: { id: courseId } });
    if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
    }
    // ✅ Create Exam & Questions if provided
    const examData = {
        courseId,
        title,
        description,
        duration,
        passingScore
    };
    if (questions && questions.length > 0) {
        examData.questions = {
            create: questions.map((q) => ({
                question: q.question,
                type: q.type,
                options: q.options,
                correctAnswer: q.correctAnswer,
            })),
        };
    }
    const exam = yield prisma_1.default.exam.create({
        data: examData,
        include: { questions: true }
    });
    res.status(201).json({ message: "Exam created successfully", exam });
})));
// ✅ Fetch Exams for a Course (Students)
router.get("/course/:courseId", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const exams = yield prisma_1.default.exam.findMany({
        where: { courseId },
        include: { questions: true },
    });
    if (!exams.length)
        return res.status(404).json({ message: "No exams found for this course" });
    return res.json(exams);
})));
// ✅ Submit Exam Answers
router.post("/:examId/submit", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { examId } = req.params;
    const { answers } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId || !answers) {
        return res.status(400).json({ message: "Missing student or answers" });
    }
    // fetch questions
    const exam = yield prisma_1.default.exam.findUnique({
        where: { id: examId },
        include: { questions: true },
    });
    if (!exam)
        return res.status(404).json({ message: "Exam not found" });
    let score = 0;
    exam.questions.forEach((q) => {
        const submittedAnswer = answers[q.id];
        if (submittedAnswer &&
            JSON.stringify(submittedAnswer) === JSON.stringify(q.correctAnswer)) {
            score++;
        }
    });
    const percentage = (score / exam.questions.length) * 100;
    const passed = percentage >= exam.passingScore;
    // create submission record
    const submission = yield prisma_1.default.examSubmission.create({
        data: {
            studentId,
            examId,
            answers,
            score: Math.round(percentage),
            passed,
        },
    });
    return res.status(201).json({
        message: "Submission received",
        score: Math.round(percentage),
        passed: submission.passed
    });
})));
exports.default = router;
//# sourceMappingURL=exams.js.map