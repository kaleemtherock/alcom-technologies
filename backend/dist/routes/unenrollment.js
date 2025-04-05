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
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
// ✅ Fix middleware typing
const verifyTokenHandler = authMiddleware_1.verifyToken;
// ✅ Global Async Error Handler
const asyncHandler = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Configure nodemailer
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
// Generate authentication code
const generateAuthCode = () => crypto_1.default.randomBytes(3).toString("hex").toUpperCase();
// Store authentication codes with expiration
const authCodes = new Map();
// ✅ Request unenrollment and generate auth code
router.post("/request", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if student is enrolled
    const enrollment = yield prisma_1.default.enrollment.findFirst({
        where: { userId: studentId, courseId },
        include: { user: true },
    });
    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }
    // Generate and store auth code
    const authCode = generateAuthCode();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    authCodes.set(`${studentId}-${courseId}`, { code: authCode, expires: expirationTime });
    // Send email with auth code
    yield transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: enrollment.user.email,
        subject: "Course Unenrollment Verification",
        text: `Your authentication code for course unenrollment is: ${authCode}\nThis code will expire in 15 minutes.`,
    });
    return res.status(200).json({ message: "Authentication code sent to your email" });
})));
// ✅ Verify auth code and process unenrollment
router.post("/verify", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId, authCode, action } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify auth code
    const storedAuth = authCodes.get(`${studentId}-${courseId}`);
    if (!storedAuth || storedAuth.code !== authCode || storedAuth.expires < new Date()) {
        return res.status(400).json({ message: "Invalid or expired authentication code" });
    }
    // Process unenrollment
    const enrollment = yield prisma_1.default.enrollment.findFirst({
        where: { userId: studentId, courseId },
        include: { course: true },
    });
    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }
    // Handle refund or course switch
    if (action === "refund") {
        // Find the payment record
        const payment = yield prisma_1.default.payment.findFirst({
            where: { userId: studentId, courseId, status: "completed" },
        });
        if (payment) {
            // TODO: Integrate with payment gateway for refund
            // Update payment status
            yield prisma_1.default.payment.update({
                where: { id: payment.id },
                data: { status: "refunded" },
            });
        }
    }
    else if (action === "switch" && req.body.newCourseId) {
        // Switch to new course
        yield prisma_1.default.enrollment.update({
            where: { id: enrollment.id },
            data: {
                courseId: req.body.newCourseId,
                progress: 0,
            },
        });
        return res.status(200).json({ message: "Successfully switched to new course" });
    }
    // Update enrollment status
    yield prisma_1.default.enrollment.update({
        where: { id: enrollment.id },
        data: { status: "unenrolled" },
    });
    // Clean up auth code
    authCodes.delete(`${studentId}-${courseId}`);
    return res.status(200).json({ message: "Successfully unenrolled from course" });
})));
exports.default = router;
//# sourceMappingURL=unenrollment.js.map