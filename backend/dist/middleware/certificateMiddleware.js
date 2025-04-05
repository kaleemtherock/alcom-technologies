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
exports.checkCertificateEligibility = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const checkCertificateEligibility = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { courseId } = req.params;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if user is enrolled in the course
        const enrollment = yield prisma_1.default.enrollment.findFirst({
            where: {
                userId,
                courseId,
                status: 'ACTIVE',
            },
        });
        if (!enrollment) {
            return res.status(403).json({
                message: 'You must be enrolled in this course to access the certificate',
            });
        }
        // Check if user has completed the course exams
        const examSubmissions = yield prisma_1.default.examSubmission.findMany({
            where: {
                studentId: userId,
                exam: {
                    courseId,
                },
            },
            include: {
                exam: true
            }
        });
        const hasPassedAllExams = examSubmissions.every((submission) => submission.passed);
        if (!hasPassedAllExams) {
            return res.status(403).json({
                message: 'You must pass all course exams to receive the certificate',
            });
        }
        // Check if all required assignments are submitted
        const assignments = yield prisma_1.default.assignment.findMany({
            where: {
                courseId,
                required: true,
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
        if (!allAssignmentsSubmitted) {
            return res.status(403).json({
                message: 'You must complete all required assignments to receive the certificate',
            });
        }
        next();
    }
    catch (error) {
        console.error('Certificate eligibility check error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.checkCertificateEligibility = checkCertificateEligibility;
//# sourceMappingURL=certificateMiddleware.js.map