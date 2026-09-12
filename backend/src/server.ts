import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import adminRoutes from './routes/adminRoutes';
import seedRoutes from './routes/seedRoutes';
import { Course } from './models/Course';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    service: 'Apex Flow Express Backend',
    database: 'MongoDB Atlas (Connected)',
    timestamp: new Date().toISOString(),
  });
});

// Register API Route Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seed', seedRoutes);

// Global 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Express Global Error]:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start Express Server & Connect to MongoDB Atlas
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed database if empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('[Auto-Seed] Database empty. Seeding MongoDB Atlas...');
      // Trigger internal seed logic
      const reqMock = {} as Request;
      const resMock = {
        status: () => resMock,
        json: (data: any) => console.log('[Auto-Seed Success]:', data.message),
      } as unknown as Response;
      const { seedDatabase } = await import('./controllers/seedController');
      await seedDatabase(reqMock, resMock);
    }

    const portNum = Number(PORT) || 5000;
    app.listen(portNum, '0.0.0.0', () => {
      console.log(`🚀 [Apex Flow Backend] Server running on port ${portNum}`);
      console.log(`🌐 Health check: http://0.0.0.0:${portNum}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
