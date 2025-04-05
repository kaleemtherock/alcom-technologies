"use strict";
// File: src/routes/adminUpload.ts
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
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// Multer config
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/courses/upload-csv', authMiddleware_1.verifyToken, roleMiddleware_1.checkRoleInstructorOrAdmin, // ✅ Correct usage
upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typedReq = req;
    if (!typedReq.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const filePath = typedReq.file.path;
    const courses = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        var _a, _b, _c;
        try {
            const topics = ((_a = row.topics) === null || _a === void 0 ? void 0 : _a.split(',').map((t) => t.trim())) || [];
            const categories = ((_b = row.categories) === null || _b === void 0 ? void 0 : _b.split(',').map((c) => c.trim())) || [];
            courses.push({
                title: row.title,
                description: row.description,
                price: parseFloat(row.price || '0'),
                level: row.level,
                duration: row.duration,
                instructorId: ((_c = typedReq.user) === null || _c === void 0 ? void 0 : _c.userId) || 'instructor-kaleem',
                rating: parseFloat(row.rating || '0'),
                topics,
                categories,
            });
        }
        catch (err) {
            console.error('CSV row error:', err);
        }
    })
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const created = yield Promise.all(courses.map((c) => prisma_1.default.course.create({
                data: {
                    title: c.title,
                    description: c.description,
                    price: c.price,
                    level: c.level,
                    duration: c.duration,
                    instructorId: c.instructorId,
                    rating: c.rating,
                    topics: c.topics,
                    categories: {
                        create: c.categories.map((cat) => ({
                            category: {
                                connectOrCreate: {
                                    where: { name: cat },
                                    create: { name: cat },
                                },
                            },
                        })),
                    },
                },
            })));
            fs_1.default.unlinkSync(filePath); // ✅ Delete uploaded file after processing
            res.json({ inserted: created.length });
        }
        catch (error) {
            console.error('DB Insert Error:', error);
            res.status(500).json({ message: 'Failed to save courses to DB' });
        }
    }));
}));
exports.default = router;
//# sourceMappingURL=adminupload.js.map