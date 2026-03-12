# MongoDB Integration - Complete Guide

## Overview

The Symptom Disease Predictor application now uses MongoDB for persistent data storage. All user credentials and medical prediction reports are stored in a MongoDB database instead of in-memory mock data.

## What Changed

### Backend
- ✅ MongoDB database connection using Mongoose
- ✅ User authentication with JWT tokens
- ✅ Secure password hashing with bcryptjs
- ✅ RESTful API endpoints for users and predictions
- ✅ Environment variable configuration

### Frontend
- ✅ API utility functions for backend communication
- ✅ Async authentication (login/register)
- ✅ Automatic session restoration on page reload
- ✅ Prediction data saved to MongoDB in real-time
- ✅ JWT token management with localStorage

## Quick Start

### 1. Set Up MongoDB

**Option A: Local MongoDB** (Recommended for development)
```bash
# Install MongoDB Community Server
# Visit: https://www.mongodb.com/try/download/community

# Start MongoDB service
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows: MongoDB starts automatically
```

**Option B: MongoDB Atlas** (Cloud-hosted, free tier available)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Get connection string
4. Add your IP to whitelist

### 2. Configure Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI
# For local: mongodb://localhost:27017/symptom-predictor
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/symptom-predictor
```

### 3. Start the Backend Server

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at: http://localhost:5000

### 4. Start the Frontend

```bash
# In the root directory (new terminal)
npm install
npm run dev
```

Frontend will start at: http://localhost:5173 (or similar)

## File Structure

```
symptom-predictor/
├── backend/
│   ├── server.js              # Express server with MongoDB
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment template
│   ├── .env                   # Your actual config (create this)
│   └── MONGODB_SETUP.md       # Detailed setup guide
├── utils/
│   └── api.js                 # API utility functions
├── components/
│   ├── LoginPage.tsx          # Updated for MongoDB auth
│   ├── RegisterPage.tsx       # Updated for MongoDB auth
│   ├── Dashboard.tsx          # Loads data from MongoDB
│   └── SymptomCheckerPage.tsx # Saves predictions to MongoDB
└── App.tsx                    # Main app with auth state
```

## How It Works

### User Registration Flow

1. User fills registration form
2. Frontend calls `authAPI.register()` from `/utils/api.js`
3. Backend validates data and hashes password with bcryptjs
4. User saved to MongoDB `users` collection
5. JWT token generated and returned
6. Frontend stores token in localStorage
7. User automatically logged in

### User Login Flow

1. User enters email and password
2. Frontend calls `authAPI.login()`
3. Backend verifies credentials
4. JWT token generated if valid
5. Frontend stores token
6. User predictions fetched from MongoDB
7. User redirected to dashboard

### Prediction Saving Flow

1. User completes symptom analysis
2. Frontend calls `predictionAPI.save()`
3. Backend validates JWT token
4. Prediction saved to MongoDB `predictions` collection with userId
5. Prediction added to user's local state
6. Shows in "Recent Analyses" tab

### Session Persistence

1. On app load, check for JWT token in localStorage
2. If found, call `authAPI.getCurrentUser()`
3. Fetch user data and predictions from MongoDB
4. Restore user session automatically
5. User stays logged in across page refreshes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword",
    "sex": "male",
    "bloodGroup": "O+",
    "mobile": "+1-234-567-8900"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- `GET /api/auth/me` - Get current user (requires Bearer token)

### Predictions
- `POST /api/predictions` - Save prediction (requires Bearer token)
  ```json
  {
    "date": "2024-12-29",
    "time": "14:30",
    "organ": "Ear",
    "symptoms": ["Ear pain", "Hearing loss"],
    "topCondition": "Otitis Media",
    "probability": 87,
    "severity": "moderate",
    "recommendations": ["Rest", "Consult doctor"],
    "status": "monitoring",
    "modelScores": {
      "logisticRegression": 85,
      "randomForest": 89,
      "gradientBoosting": 87
    }
  }
  ```

- `GET /api/predictions` - Get all user predictions (requires Bearer token)
- `GET /api/predictions/:id` - Get specific prediction
- `PATCH /api/predictions/:id/status` - Update status
- `DELETE /api/predictions/:id` - Delete prediction

### Health Check
- `GET /api/health` - Check API status
  ```json
  {
    "status": "ok",
    "message": "Symptom Disease Predictor API is running",
    "database": "connected"
  }
  ```

## Database Schema

### Users Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  sex: String (enum: 'male', 'female', 'other'),
  bloodGroup: String,
  mobile: String,
  createdAt: Date
}
```

### Predictions Collection
```javascript
{
  userId: ObjectId (ref: User),
  date: String,
  time: String,
  organ: String,
  symptoms: [String],
  topCondition: String,
  probability: Number,
  severity: String (enum: 'mild', 'moderate', 'severe'),
  recommendations: [String],
  status: String (enum: 'monitoring', 'resolved', 'urgent', 'pending'),
  modelScores: {
    logisticRegression: Number,
    randomForest: Number,
    gradientBoosting: Number
  },
  hospitals: [Object],
  location: String,
  createdAt: Date
}
```

## Testing

1. **Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Register User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"test12345","sex":"male","bloodGroup":"O+","mobile":"+1234567890"}'
   ```

3. **View Data** (using MongoDB Compass or mongosh)
   ```bash
   mongosh
   use symptom-predictor
   db.users.find()
   db.predictions.find()
   ```

## Security Features

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT token authentication
- ✅ Token expiration (7 days)
- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ Input validation
- ✅ Unique email/username constraints

## Troubleshooting

### "MongoDB connection error"
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas: verify IP whitelist

### "Authentication required"
- Check if token exists in localStorage
- Try logging out and logging in again
- Verify backend is running

### "Failed to save prediction"
- Check backend logs for errors
- Verify you're logged in
- Ensure MongoDB is connected

### CORS errors
- Verify backend allows frontend origin
- Check if both servers are running
- Clear browser cache

## Migration Notes

- Old mock test accounts (`demo@test.com`, etc.) are no longer valid
- You must register new accounts through the registration page
- All new data is persisted in MongoDB
- Old in-memory data has been removed

## Production Deployment

Before deploying to production:

1. **Change JWT_SECRET** to a strong random string
2. **Use MongoDB Atlas** or secure MongoDB instance
3. **Enable HTTPS** for both frontend and backend
4. **Set proper CORS origins** (not wildcard)
5. **Add rate limiting** to prevent abuse
6. **Enable MongoDB authentication**
7. **Use environment variables** for all secrets
8. **Set up backups** for MongoDB data
9. **Monitor logs** for errors
10. **Use PM2** or similar for backend process management

## Support

For detailed MongoDB setup instructions, see:
- `/backend/MONGODB_SETUP.md` - Detailed backend setup
- `/backend/README.md` - Backend API documentation

For issues:
- Check browser console (F12)
- Check backend terminal logs
- Test `/api/health` endpoint
- Verify MongoDB connection

---

**Note:** This integration replaces the previous mock authentication system. All user data and predictions are now persisted in MongoDB with proper authentication and security.
