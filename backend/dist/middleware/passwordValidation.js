"use strict";
// src/middleware/passwordValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const validatePassword = (req, res, next) => {
    const { password } = req.body;
    // Password validation rules
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const errors = [];
    if (!password || password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase)
        errors.push('Password must contain at least one uppercase letter');
    if (!hasLowerCase)
        errors.push('Password must contain at least one lowercase letter');
    if (!hasNumbers)
        errors.push('Password must contain at least one number');
    if (!hasSpecialChar)
        errors.push('Password must contain at least one special character');
    if (errors.length > 0) {
        res.status(400).json({ message: 'Invalid password', errors });
        return;
    }
    next();
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=passwordValidation.js.map