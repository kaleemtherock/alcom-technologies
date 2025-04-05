"use strict";
// src/middleware/usernameValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsername = void 0;
const validateUsername = (req, res, next) => {
    const { name } = req.body;
    // Username validation rules
    const minLength = 2;
    const maxLength = 50;
    const validUsernameRegex = /^[a-zA-Z0-9\s-_]+$/;
    const errors = [];
    if (!name) {
        errors.push('Username is required');
    }
    else {
        if (name.length < minLength) {
            errors.push(`Username must be at least ${minLength} characters long`);
        }
        if (name.length > maxLength) {
            errors.push(`Username must not exceed ${maxLength} characters`);
        }
        if (!validUsernameRegex.test(name)) {
            errors.push('Username can only contain letters, numbers, spaces, hyphens, and underscores');
        }
    }
    if (errors.length > 0) {
        res.status(400).json({ message: 'Invalid username', errors });
        return;
    }
    next();
};
exports.validateUsername = validateUsername;
//# sourceMappingURL=usernameValidation.js.map