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
exports.calculateCommission = exports.validateReferralCode = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// ✅ Middleware: Validate Referral Code
const validateReferralCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { referralCode } = req.body;
    if (!referralCode)
        return next();
    try {
        // ✅ 1. Check if referral code belongs to an approved SalesAgent
        const salesAgent = yield prisma_1.default.salesAgent.findFirst({
            where: {
                referralCode: referralCode,
                status: 'APPROVED'
            }
        });
        if (salesAgent) {
            req.referral = { salesAgent };
            return next();
        }
        // ✅ 2. Check if referral code is a School bulk discount code
        const school = yield prisma_1.default.school.findUnique({
            where: { bulkDiscountCode: referralCode }
        });
        if (school) {
            req.referral = { school };
            return next();
        }
        return res.status(400).json({ message: 'Invalid referral code' });
    }
    catch (error) {
        console.error('Referral validation error:', error);
        return res.status(500).json({ message: 'Error validating referral code' });
    }
});
exports.validateReferralCode = validateReferralCode;
// ✅ Middleware: Calculate Commission
const calculateCommission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.referral) === null || _a === void 0 ? void 0 : _a.salesAgent))
        return next();
    try {
        const { amount } = req.body;
        const salesAgent = req.referral.salesAgent;
        // Optional: Validate commissionRate exists
        if (!salesAgent.commissionRate) {
            return res.status(400).json({ message: 'Sales agent commission rate not set' });
        }
        const commission = amount * salesAgent.commissionRate;
        req.referral.commission = commission;
        next();
    }
    catch (error) {
        console.error('Commission calculation error:', error);
        return res.status(500).json({ message: 'Error calculating commission' });
    }
});
exports.calculateCommission = calculateCommission;
//# sourceMappingURL=referralMiddleware.js.map