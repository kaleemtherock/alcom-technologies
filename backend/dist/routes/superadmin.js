"use strict";
// File: src/routes/superadmin.ts
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const superadminMiddleware_1 = require("../middleware/superadminMiddleware");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const router = express_1.default.Router();
// ✅ GET all users (superadmin only)
router.get('/users', superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true }
    });
    res.json(users);
})));
// ✅ PATCH user role
router.patch('/users/:id/role', superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    yield prisma.user.update({ where: { id }, data: { role } });
    res.json({ message: 'Role updated successfully' });
})));
// ✅ DELETE user
router.delete('/users/:id', superadminMiddleware_1.verifySuperadminToken, (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully' });
})));
exports.default = router;
//# sourceMappingURL=superadmin.js.map