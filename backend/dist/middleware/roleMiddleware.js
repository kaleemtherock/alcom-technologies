"use strict";
// File: src/middleware/roleMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleInstructorOrAdmin = exports.checkRoleStudent = void 0;
// ✅ Middleware: Only STUDENT
const checkRoleStudent = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'STUDENT') {
        res.status(403).json({ message: 'Permission denied: STUDENT only' });
        return;
    }
    next();
};
exports.checkRoleStudent = checkRoleStudent;
// ✅ Middleware: Only INSTRUCTOR or ADMIN
const checkRoleInstructorOrAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || !['INSTRUCTOR', 'ADMIN'].includes(user.role)) {
        res.status(403).json({ message: 'Permission denied: INSTRUCTOR or ADMIN only' });
        return;
    }
    next();
};
exports.checkRoleInstructorOrAdmin = checkRoleInstructorOrAdmin;
//# sourceMappingURL=roleMiddleware.js.map