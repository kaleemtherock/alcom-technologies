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
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const referralMiddleware_1 = require("../middleware/referralMiddleware");
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
// ✅ Create a new payment
router.post("/process", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, referralMiddleware_1.validateReferralCode, referralMiddleware_1.calculateCommission, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { courseId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        if (!userId) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }
        if (!courseId) {
            throw Object.assign(new Error("Course ID is required"), { status: 400 });
        }
        const course = yield prisma_1.default.course.findUnique({
            where: { id: courseId },
            select: { id: true, price: true },
        });
        if (!course) {
            throw Object.assign(new Error("Course not found"), { status: 404 });
        }
        const [existingEnrollment, existingPayment] = yield Promise.all([
            prisma_1.default.enrollment.findFirst({
                where: { userId, courseId },
                select: { id: true },
            }),
            prisma_1.default.payment.findFirst({
                where: { userId, courseId, status: "completed" },
                select: { id: true },
            }),
        ]);
        if (existingEnrollment) {
            throw Object.assign(new Error("Already enrolled in this course"), { status: 400 });
        }
        if (existingPayment) {
            throw Object.assign(new Error("Payment already processed for this course"), { status: 400 });
        }
        // Create payment record
        const payment = yield prisma_1.default.payment.create({
            data: {
                userId,
                courseId,
                amount: course.price,
                status: "pending",
            },
        });
        try {
            // TODO: Integrate actual payment gateway here
            // This is where you would integrate with a payment provider like Stripe
            // For now, we'll simulate a successful payment
            const paymentSuccessful = true;
            if (!paymentSuccessful) {
                yield prisma_1.default.payment.update({
                    where: { id: payment.id },
                    data: { status: "failed" },
                });
                return res.status(400).json({ message: "Payment processing failed" });
            }
            // Update payment status to completed
            const updatedPayment = yield prisma_1.default.payment.update({
                where: { id: payment.id },
                data: { status: "completed" },
            });
            // Create enrollment after successful payment
            yield prisma_1.default.enrollment.create({
                data: {
                    userId,
                    courseId,
                },
            });
            // Create commission record if referral exists
            if (((_b = req.referral) === null || _b === void 0 ? void 0 : _b.salesAgent) && ((_c = req.referral) === null || _c === void 0 ? void 0 : _c.commission)) {
                yield prisma_1.default.commission.create({
                    data: {
                        salesAgentId: req.referral.salesAgent.id,
                        userId,
                        courseId,
                        amount: req.referral.commission,
                        status: 'PENDING'
                    }
                });
            }
            return res.status(200).json({
                message: "Payment processed successfully",
                payment: updatedPayment,
                commission: (_d = req.referral) === null || _d === void 0 ? void 0 : _d.commission,
            });
        }
        catch (paymentError) {
            // If payment processing fails, update payment status and return error
            yield prisma_1.default.payment.update({
                where: { id: payment.id },
                data: { status: "failed" },
            });
            return res.status(500).json({ message: "Payment processing failed" });
        }
    }
    catch (error) {
        console.error("Payment processing error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})));
// ✅ Get payment history for a user
router.get("/history", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const payments = yield prisma_1.default.payment.findMany({
        where: { userId },
        include: { course: true },
        orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(payments);
})));
exports.default = router;
//# sourceMappingURL=payment.js.map