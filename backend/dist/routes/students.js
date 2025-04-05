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
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
// Fix middleware typing
const verifyTokenHandler = authMiddleware_1.verifyToken;
// Mock data - replace with actual database queries
const mockCourses = [
    { id: '1', title: 'Introduction to AI', progress: 45 },
    { id: '2', title: 'Machine Learning Basics', progress: 30 }
];
const mockDiscussions = [
    { id: '1', courseId: '1', title: 'Welcome Discussion', lastActivity: '2024-03-20', unreadMessages: 2 }
];
router.get('/:studentId/courses', verifyTokenHandler, roleMiddleware_1.checkRoleStudent, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(mockCourses);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses' });
    }
})));
router.get('/:studentId/discussions', verifyTokenHandler, roleMiddleware_1.checkRoleStudent, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(mockDiscussions);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch discussions' });
    }
})));
router.get('/certificate-eligibility', verifyTokenHandler, roleMiddleware_1.checkRoleStudent, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if user has any active enrollments
        const enrollments = yield prisma_1.default.enrollment.findMany({
            where: {
                userId,
                status: 'ACTIVE',
            },
        });
        if (!enrollments.length) {
            return res.json({ isEligible: false });
        }
        // Check if user has passed all exams for any course
        const examSubmissions = yield prisma_1.default.examSubmission.findMany({
            where: {
                studentId: userId,
            },
            include: {
                exam: true
            }
        });
        const hasPassedExams = examSubmissions.some((submission) => submission.passed);
        if (!hasPassedExams) {
            return res.json({ isEligible: false });
        }
        // Check if user has submitted all required assignments
        const assignments = yield prisma_1.default.assignment.findMany({
            where: {
                required: true,
                courseId: {
                    in: enrollments.map(e => e.courseId)
                }
            },
            include: {
                submissions: {
                    where: {
                        studentId: userId,
                    },
                },
            },
        });
        const allAssignmentsSubmitted = assignments.every((assignment) => assignment.submissions && assignment.submissions.length > 0);
        res.json({ isEligible: allAssignmentsSubmitted });
    }
    catch (error) {
        console.error('Certificate eligibility check error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})));
exports.default = router;
//# sourceMappingURL=students.js.map