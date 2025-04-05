"use strict";
""; // src/routes/auth.ts
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const passwordValidation_1 = require("../middleware/passwordValidation");
const usernameValidation_1 = require("../middleware/usernameValidation");
const router = express_1.default.Router();
// Role enum
var Role;
(function (Role) {
    Role["STUDENT"] = "STUDENT";
    Role["INSTRUCTOR"] = "INSTRUCTOR";
    Role["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
let refreshTokens = [];
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "15m",
    });
};
const generateRefreshToken = (user) => {
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, REFRESH_SECRET, {
        expiresIn: "7d",
    });
    refreshTokens.push(refreshToken);
    return refreshToken;
};
const asyncHandler = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
const emailValidator = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }
    next();
};
router.post("/signup", usernameValidation_1.validateUsername, emailValidator, passwordValidation_1.validatePassword, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield prisma_1.default.user.create({
        data: { name, email, password: hashedPassword, role: Role.STUDENT },
    });
    res.status(201).json({ message: "✅ User registered successfully" });
})));
router.post("/login", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
})));
router.post("/token", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Access denied" });
    }
    jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Invalid token" });
        const newAccessToken = generateAccessToken({ id: user.userId, role: user.role });
        res.json({ accessToken: newAccessToken });
    });
})));
const logoutHandler = (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    res.json({ message: "✅ Logged out successfully" });
};
router.post("/logout", logoutHandler);
router.get("/me", authMiddleware_1.verifyToken, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
})));
exports.default = router;
//# sourceMappingURL=auth.js.map