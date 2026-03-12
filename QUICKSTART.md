# Quick Start Guide

Get your Symptom Disease Predictor running in 5 minutes!

## Prerequisites Check

Make sure you have:
- ✅ Node.js installed (check: `node --version`)
- ✅ MongoDB installed and running (check: `mongosh`)

## Quick Setup

### 1. Start MongoDB (if not already running)

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the backend server
npm run dev
```

✅ Backend should now be running on http://localhost:5000

### 3. Frontend Setup (Open NEW Terminal)

```bash
# Navigate back to project root
cd ..

# Install frontend dependencies (if not already installed)
npm install

# Start the frontend
npm run dev
```

✅ Frontend should now be running on http://localhost:3000 (or similar)

## Test It Out!

1. **Open your browser** to http://localhost:3000

2. **Create an account:**
   - Click "Sign Up"
   - Fill in the form
   - Click "Register"

3. **Use the Symptom Checker:**
   - Click "Symptom Checker" in the header
   - Select an organ (Ear, Eyes, or Lungs)
   - Choose symptoms
   - Click "Analyze Symptoms"
   - Your prediction will be automatically saved!

4. **View Your Dashboard:**
   - Click "Dashboard" in the header
   - See your predictions in the "Recent Analyses" tab
   - Download medical reports from the "Profile" tab

## Troubleshooting

### Can't connect to backend?
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# If not, restart backend
cd backend
npm run dev
```

### MongoDB not connected?
```bash
# Check MongoDB status
mongosh

# If error, start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux
net start MongoDB                      # Windows
```

### Port already in use?
```bash
# Change backend port in backend/.env
PORT=5001

# Then restart backend
npm run dev
```

## What's Next?

- 📝 Try all three organ systems (Ear, Eyes, Lungs)
- 🏥 Download reports with hospital information
- 📊 Track your health history in the dashboard
- 🔒 Your data is securely stored in MongoDB

## Need Help?

Check the full [INSTALLATION.md](./INSTALLATION.md) guide for detailed setup instructions and troubleshooting.

---

Happy health tracking! 🏥✨