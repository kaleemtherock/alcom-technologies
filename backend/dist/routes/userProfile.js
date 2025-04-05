"use strict";
// File: src/routes/userProfile.ts
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
// ✅ GET /api/user/profile - Get user profile
router.get('/profile', authMiddleware_1.verifyToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!(user === null || user === void 0 ? void 0 : user.userId)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const profile = yield prisma_1.default.user.findUnique({
        where: { id: user.userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    if (!profile) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role.toLowerCase(),
        joined: profile.createdAt,
    });
})));
exports.default = router;
//# sourceMappingURL=userProfile.js.map