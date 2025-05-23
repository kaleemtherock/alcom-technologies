"use strict";
// src/middleware/superadminMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySuperadminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifySuperadminToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (decoded.role !== "SUPERADMIN") {
            res.status(403).json({ message: "Permission denied. Superadmin only." });
            return;
        }
        req.user = decoded;
        next(); // ✅ always call next, don't return res
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};
exports.verifySuperadminToken = verifySuperadminToken;
//# sourceMappingURL=superadminMiddleware.js.map