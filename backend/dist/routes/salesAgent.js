"use strict";
// File: src/routes/salesagent.ts
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
const crypto_1 = __importDefault(require("crypto"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// Utility to generate unique referral code
const generateReferralCode = () => {
    return crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
};
// ✅ Register as a sales agent
router.post('/register', (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    const existingAgent = yield prisma_1.default.salesAgent.findUnique({ where: { email } });
    if (existingAgent) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    let referralCode;
    let isUnique = false;
    while (!isUnique) {
        referralCode = generateReferralCode();
        const existing = yield prisma_1.default.salesAgent.findUnique({ where: { referralCode } });
        if (!existing)
            isUnique = true;
    }
    const salesAgent = yield prisma_1.default.salesAgent.create({
        data: {
            name,
            email,
            phone,
            referralCode: referralCode,
            status: 'PENDING',
            commissionRate: 0.1
        }
    });
    res.status(201).json({
        message: 'Registration successful, pending approval',
        agent: salesAgent
    });
})));
// ✅ Get sales agent dashboard data
router.get('/dashboard', authMiddleware_1.verifyToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const agentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!agentId)
        return res.status(401).json({ message: 'Unauthorized' });
    const agent = yield prisma_1.default.salesAgent.findUnique({
        where: { id: agentId },
        include: {
            referredUsers: true,
            referredSchools: true,
            commissions: true
        }
    });
    if (!agent)
        return res.status(404).json({ message: 'Agent not found' });
    const totalLeads = agent.referredUsers.length + agent.referredSchools.length;
    const successfulEnrollments = agent.commissions.length;
    const totalCommission = agent.commissions.reduce((sum, c) => sum + c.amount, 0);
    const pendingCommission = agent.commissions.filter(c => c.status === 'PENDING')
        .reduce((sum, c) => sum + c.amount, 0);
    res.json({
        agent: {
            name: agent.name,
            email: agent.email,
            referralCode: agent.referralCode,
            status: agent.status
        },
        metrics: {
            totalLeads,
            successfulEnrollments,
            totalCommission,
            pendingCommission
        }
    });
})));
// ✅ Admin: Approve/Reject sales agent
router.patch('/:agentId/status', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentId } = req.params;
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    const agent = yield prisma_1.default.salesAgent.update({
        where: { id: agentId },
        data: { status }
    });
    res.json({ message: `Agent ${status.toLowerCase()}`, agent });
})));
// ✅ Admin: Update commission rate
router.patch('/:agentId/commission', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentId } = req.params;
    const { commissionRate } = req.body;
    if (commissionRate < 0 || commissionRate > 1) {
        return res.status(400).json({ message: 'Commission rate must be between 0 and 1' });
    }
    const agent = yield prisma_1.default.salesAgent.update({
        where: { id: agentId },
        data: { commissionRate }
    });
    res.json({ message: 'Commission rate updated', agent });
})));
// ✅ Admin: Get all sales agents
router.get('/admin/agents', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agents = yield prisma_1.default.salesAgent.findMany({
        include: {
            _count: {
                select: {
                    referredUsers: true,
                    referredSchools: true,
                    commissions: true
                }
            }
        }
    });
    res.json(agents);
})));
// ✅ Admin: Get all commissions
router.get('/admin/commissions', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commissions = yield prisma_1.default.commission.findMany({
        include: {
            salesAgent: true,
            user: true,
            course: true
        }
    });
    res.json(commissions);
})));
// ✅ Admin: Update commission status
router.patch('/admin/commissions/:commissionId', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commissionId } = req.params;
    const { status } = req.body;
    if (!['APPROVED', 'PAID'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    const commission = yield prisma_1.default.commission.update({
        where: { id: commissionId },
        data: Object.assign({ status }, (status === 'PAID' ? { paidAt: new Date() } : {})),
        include: {
            salesAgent: true,
            user: true,
            course: true
        }
    });
    res.json({
        message: `Commission marked as ${status.toLowerCase()}`,
        commission
    });
})));
exports.default = router;
//# sourceMappingURL=salesAgent.js.map