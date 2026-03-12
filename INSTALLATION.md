# Symptom Disease Predictor - Installation Guide

This guide will help you set up the complete Symptom Disease Predictor application with MongoDB backend.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
3. **npm** or **yarn** package manager (comes with Node.js)

## Step 1: Install and Start MongoDB

### On macOS (using Homebrew):
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

### On Windows:
```bash
# Download and install MongoDB from the official website
# After installation, MongoDB should start automatically as a service

# To manually start MongoDB:
net start MongoDB

# To connect and verify:
mongosh
```

### On Linux (Ubuntu/Debian):
```bash
# Import the MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Reload package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Verify
mongosh
```

## Step 2: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit the .env file (optional):**
   Open `.env` in your text editor and update if needed:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/symptom-predictor
   JWT_SECRET=change-this-to-a-secure-random-string-in-production
   ```

5. **Start the backend server:**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   OR for production:
   ```bash
   npm start
   ```

6. **Verify the backend is running:**
   Open your browser and navigate to:
   ```
   http://localhost:5000/api/health
   ```
   
   You should see:
   ```json
   {
     "status": "ok",
     "message": "Symptom Disease Predictor API is running",
     "database": "connected"
   }
   ```

## Step 3: Frontend Setup

1. **Open a new terminal window** (keep the backend running in the first terminal)

2. **Navigate to the project root directory** (where package.json for frontend is located)

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   (Or whatever port your frontend dev server shows)

## Step 4: Test the Application

### 1. Register a New User

1. Click on **"Sign Up"** in the header
2. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Sex: Male/Female/Other
   - Blood Group: O+, A+, B+, AB+, O-, A-, B-, AB-
   - Mobile: +1234567890
3. Click **"Register"**
4. You should be automatically logged in and redirected to the dashboard

### 2. Use the Symptom Checker

1. Navigate to **"Symptom Checker"** from the header
2. Select an organ (Ear, Eyes, or Lungs)
3. Choose symptoms
4. Click **"Analyze Symptoms"**
5. View the prediction results
6. If logged in, the prediction will be automatically saved

### 3. View Prediction History

1. Go to **"Dashboard"**
2. Navigate to the **"Recent Analyses"** tab
3. You should see all your saved predictions
4. You can download reports from the **"Profile"** tab

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017"**

Solution:
```bash
# Make sure MongoDB is running
# On macOS:
brew services restart mongodb-community

# On Linux:
sudo systemctl restart mongod

# On Windows:
net start MongoDB
```

### Backend API Errors

**Error: "Cannot connect to backend"**

1. Verify the backend server is running on port 5000
2. Check the API_BASE_URL in `/utils/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```
3. Make sure CORS is enabled in the backend

### Port Conflicts

**Error: "Port 5000 is already in use"**

Solution:
```bash
# Change the PORT in backend/.env to a different port
PORT=5001

# Or kill the process using port 5000
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Not Found

**Error: "Database symptom-predictor not found"**

This is normal - MongoDB will automatically create the database when you register your first user. No action needed.

## Default Database Structure

The application will create two collections in MongoDB:

### Users Collection
- username
- email
- password (hashed with bcrypt)
- sex
- bloodGroup
- mobile
- createdAt

### Predictions Collection
- userId (reference to Users)
- date
- time
- organ
- symptoms (array)
- topCondition
- probability
- severity
- recommendations (array)
- status
- possibleDiseases (array)
- hospitals (array)
- location
- createdAt

## Production Deployment

For production deployment:

1. **Update environment variables:**
   ```env
   # Use a production MongoDB URI
   MONGODB_URI=mongodb://your-production-server:27017/symptom-predictor
   
   # Use a strong, random JWT secret
   JWT_SECRET=use-a-very-strong-random-secret-here
   
   # Set NODE_ENV
   NODE_ENV=production
   ```

2. **Enable HTTPS** for secure communication

3. **Set up proper database authentication** on MongoDB

4. **Implement rate limiting** to prevent abuse

5. **Add input validation and sanitization**

6. **Set up proper logging and monitoring**

7. **Configure CORS** to allow only your frontend domain

## Support

For issues or questions:
- Check the backend logs in the terminal
- Check the browser console for frontend errors
- Review the MongoDB logs
- Ensure all services are running properly

## Security Notes

⚠️ **Important for Production:**
- Change the default JWT_SECRET in the .env file
- Use HTTPS in production
- Implement rate limiting on API endpoints
- Add proper input validation and sanitization
- Set up MongoDB authentication
- Never commit .env files to version control
- Implement proper error handling
- Add request logging and monitoring
- This application is for demonstration purposes and should not be used to collect real medical data without proper HIPAA compliance and security audits

## Next Steps

Once your application is running:
1. Create test user accounts
2. Try the symptom checker with different organ systems
3. Save predictions and view them in the dashboard
4. Download medical reports with hospital information
5. Explore all features

Happy coding! 🎉