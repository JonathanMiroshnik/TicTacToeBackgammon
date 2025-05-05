import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import gameIntelligenceRoutes from './routes/gameIntelligenceRoutes';

// TODO: change express use to get set etc?

// Initialize express application
const app = express();

// Middleware pipeline
app.use(cors({
  origin: ["http://localhost:5173", "https://tic-tac-toe-backgammon-client.vercel.app"],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

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
app.use('/api/intelligence', gameIntelligenceRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use('/', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`💥 Critical error: ${err.message}`);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;