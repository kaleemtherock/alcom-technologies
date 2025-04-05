"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ message: "Access denied, no token provided" });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Store user info in request
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map