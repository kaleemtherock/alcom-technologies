"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const auth_1 = __importDefault(require("./routes/auth"));
const courses_1 = __importDefault(require("./routes/courses"));
const exams_1 = __importDefault(require("./routes/exams"));
const payment_1 = __importDefault(require("./routes/payment"));
const certificates_1 = __importDefault(require("./routes/certificates"));
const unenrollment_1 = __importDefault(require("./routes/unenrollment"));
const userProfile_1 = __importDefault(require("./routes/userProfile"));
const userPreferences_1 = __importDefault(require("./routes/userPreferences"));
const admin_1 = __importDefault(require("./routes/admin"));
const adminupload_1 = __importDefault(require("./routes/adminupload"));
const superadmin_1 = __importDefault(require("./routes/superadmin"));
const lessons_1 = __importDefault(require("./routes/lessons"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ CORS configuration
const allowedOrigins = ['http://localhost:5173']; // Add your frontend URLs here
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// ✅ Body parser
app.use(express_1.default.json());
// ✅ Student routes
const students_1 = __importDefault(require("./routes/students"));
app.use('/api/students', students_1.default);
// ✅ Proxy middleware for JupyterLab
app.use("/jupyter", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: "http://localhost:8888",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        "^/jupyter": "",
    },
}));
// ✅ Routes
// Student & User
app.use("/api/students", students_1.default);
app.use("/api/user", userProfile_1.default);
app.use("/api/user", userPreferences_1.default);
// Admin
app.use("/api/admin", admin_1.default);
app.use("/api/admin", adminupload_1.default);
// Superadmin
app.use("/api/superadmin", superadmin_1.default);
// Public / Shared
app.use("/api/auth", auth_1.default);
app.use("/api/courses", courses_1.default);
app.use("/api/lessons", lessons_1.default);
app.use("/api/exams", exams_1.default);
app.use("/api/payments", payment_1.default);
app.use("/api/certificates", certificates_1.default);
app.use("/api/unenrollment", unenrollment_1.default);
// ✅ Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map