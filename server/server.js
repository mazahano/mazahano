const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Validate Environment Variables
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in environment variables');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// Connect to MongoDB
let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = conn.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Call connectDB immediately in non-serverless (or rely on route handlers calling it)
// For Express app, it's okay to call it once here, but in serverless we might want to call it per request if needed.
// However, to keep it simple and compatible with local server:
connectDB();

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Make Uploads Folder Static - wrapper for safety in serverless
const uploadsPath = path.join(__dirname, 'uploads');
const fs = require('fs'); // Moved fs require here as it's used in this block
try {
  // Only attempt to create directory if we are NOT in a serverless environment (read-only FS)
  // Or just try-catch it to be safe.
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));
} catch (error) {
  console.log('⚠️ Could not create/serve uploads folder (likely serverless environment). This is expected on Vercel.');
}

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV, timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
