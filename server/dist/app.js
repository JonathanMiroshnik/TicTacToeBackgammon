"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const gameIntelligenceRoutes_1 = __importDefault(require("./routes/gameIntelligenceRoutes"));
// TODO: change express use to get set etc?
// Initialize express application
const app = (0, express_1.default)();
// Middleware pipeline
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// // VERCEL INTEGRATION START -----------------------------------------------------------------------------
// import path from 'path';
// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
// // Handle requests by serving index.html for all routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });
// // VERCEL INTEGRATION END -----------------------------------------------------------------------------
// API Routes
// app.use('/api/llm', llmRoutes);
app.use('/api/intelligence', gameIntelligenceRoutes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});
// 404 Handler
app.use('/', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`💥 Critical error: ${err.message}`);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map