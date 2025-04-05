"use strict";
// File: backend/src/routes/admin.ts
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
const authMiddleware_1 = require("../middleware/authMiddleware");
const authorize_1 = __importDefault(require("../middleware/authorize"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// ✅ GET /users - Admin and Superadmin only
router.get("/users", authMiddleware_1.verifyToken, (0, authorize_1.default)(['admin', 'superadmin']), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: { id: true, name: true, email: true, role: true },
        });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
}));
// ✅ PATCH /users/:id/role - Update user role
router.patch("/users/:id/role", authMiddleware_1.verifyToken, (0, authorize_1.default)(['admin', 'superadmin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    try {
        yield prisma_1.default.user.update({
            where: { id },
            data: { role },
        });
        res.json({ message: "Role updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating role" });
    }
}));
// ✅ DELETE /users/:id - Delete user
router.delete("/users/:id", authMiddleware_1.verifyToken, (0, authorize_1.default)(['admin', 'superadmin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.user.delete({ where: { id } });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}));
exports.default = router;
//# sourceMappingURL=admin.js.map