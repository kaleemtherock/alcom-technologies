"use strict";
// src/middleware/emailValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const errors = [];
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    }
    else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }
    // Additional email validation rules can be added here
    // For example: domain validation, disposable email check, etc.
    if (errors.length > 0) {
        res.status(400).json({ message: 'Invalid email', errors });
        return;
    }
    next();
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=emailValidation.js.map