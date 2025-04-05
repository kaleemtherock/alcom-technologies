"use strict";
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
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// ✅ Fix middleware typing
const verifyTokenHandler = authMiddleware_1.verifyToken;
// ✅ Global Async Error Handler
const asyncHandler = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// ✅ Create a new course
router.post("/create", verifyTokenHandler, roleMiddleware_1.checkRoleInstructorOrAdmin, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, level, categories, duration } = req.body;
    // ✅ Validate input fields
    if (!title || !description || !price || !level || !categories || !duration) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ message: "Categories must be an array of valid category IDs" });
    }
    // ✅ Ensure categories exist before proceeding
    const existingCategories = yield prisma_1.default.category.findMany({
        where: { id: { in: categories } },
        select: { id: true },
    });
    if (existingCategories.length !== categories.length) {
        return res.status(400).json({ message: "One or more categories do not exist" });
    }
    // ✅ Create the course and link categories via the join table
    const course = yield prisma_1.default.course.create({
        data: {
            title,
            description,
            price,
            level,
            duration,
            categories: {
                create: categories.map((categoryId) => ({
                    category: { connect: { id: categoryId } },
                })),
            },
        },
        include: { categories: { select: { category: true } } }, // ✅ Include category details in response
    });
    return res.status(201).json({ message: "Course created successfully", course });
})));
// ✅ Fetch single course by ID
router.get("/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    const course = yield prisma_1.default.course.findUnique({
        where: { id: courseId },
        include: {
            categories: { select: { category: true } },
            instructor: true
        }
    });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.json(course);
})));
// ✅ Fetch all courses
router.get("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma_1.default.course.findMany({ include: { categories: true } });
    return res.json(courses);
})));
// ✅ Enroll a student in a course
router.post("/enroll", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const existingEnrollment = yield prisma_1.default.enrollment.findFirst({
        where: { userId: studentId, courseId },
    });
    if (existingEnrollment) {
        return res.status(400).json({ message: "Already enrolled in this course" });
    }
    yield prisma_1.default.enrollment.create({ data: { userId: studentId, courseId } });
    return res.status(201).json({ message: "Successfully enrolled in course" });
})));
// ✅ Fetch my enrolled courses with progress
router.get("/my", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId)
        return res.status(401).json({ message: "Unauthorized" });
    const enrolledCourses = yield prisma_1.default.enrollment.findMany({
        where: { userId: studentId },
        include: { course: true },
    });
    return res.json(enrolledCourses);
})));
// ✅ Update course progress
router.put("/progress/:courseId", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.params;
    const { progress } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId)
        return res.status(401).json({ message: "Unauthorized" });
    if (typeof progress !== "number" || progress < 0 || progress > 100) {
        return res.status(400).json({ message: "Invalid progress value" });
    }
    const enrollment = yield prisma_1.default.enrollment.findFirst({
        where: { userId: studentId, courseId },
    });
    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }
    const updatedEnrollment = yield prisma_1.default.enrollment.update({
        where: { id: enrollment.id },
        data: { progress },
    });
    return res.json(updatedEnrollment);
})));
// ✅ Update course details
router.put("/:id", verifyTokenHandler, roleMiddleware_1.checkRoleInstructorOrAdmin, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, price, level, categories, duration } = req.body;
    const course = yield prisma_1.default.course.findUnique({
        where: { id },
        include: { categories: true },
    });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    // Update course with new category connections
    const updatedCourse = yield prisma_1.default.course.update({
        where: { id },
        data: {
            title,
            description,
            price,
            level,
            duration,
            categories: {
                deleteMany: {},
                create: categories.map((categoryId) => ({
                    category: { connect: { id: categoryId } },
                })),
            },
        },
        include: { categories: { include: { category: true } } },
    });
    return res.json(updatedCourse);
})));
// ✅ Fetch a single course by ID
router.get("/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.findUnique({
        where: { id: req.params.id },
        include: {
            categories: { include: { category: true } },
            lessons: true,
            enrollments: {
                select: {
                    id: true,
                    progress: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
    });
    if (!course)
        return res.status(404).json({ message: "Course not found" });
    // Calculate enrolled count and average rating
    const enrolledCount = course.enrollments.length;
    const rating = course.rating || 0;
    // Format instructor info (mock data for now)
    const instructor = {
        name: "John Doe",
        bio: "Expert in AI and Machine Learning with 10+ years of experience",
        expertise: ["Machine Learning", "Deep Learning", "Neural Networks"]
    };
    return res.json(Object.assign(Object.assign({}, course), { enrolledCount,
        rating,
        instructor, lessons: course.lessons.map(lesson => (Object.assign(Object.assign({}, lesson), { duration: "1 hour" // Mock duration for now
         }))) }));
})));
// ✅ Enroll a student in a course
router.post("/enroll", verifyTokenHandler, roleMiddleware_1.checkRoleStudent, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const existingEnrollment = yield prisma_1.default.enrollment.findFirst({
        where: { userId: studentId, courseId },
    });
    if (existingEnrollment) {
        return res.status(400).json({ message: "Already enrolled in this course" });
    }
    yield prisma_1.default.enrollment.create({ data: { userId: studentId, courseId } });
    return res.status(201).json({ message: "Successfully enrolled in course" });
})));
exports.default = router;
//# sourceMappingURL=courses.js.map