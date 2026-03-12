# 🚀 Getting Started - Symptom Disease Predictor

## Welcome! 👋

This guide will get you up and running with the Symptom Disease Predictor in **5 simple steps**.

---

## 📋 Prerequisites Check

Before starting, make sure you have:

- [ ] **Node.js** installed (v14 or higher)
  ```bash
  node --version
  # Should show: v14.x.x or higher
  ```

- [ ] **npm** installed (comes with Node.js)
  ```bash
  npm --version
  # Should show: 6.x.x or higher
  ```

- [ ] **MongoDB** installed
  ```bash
  mongosh
  # Should connect to MongoDB shell
  ```

**Don't have these?**
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/try/download/community

---

## 🎯 Step 1: Start MongoDB

Choose your operating system:

### macOS (with Homebrew)
```bash
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
sudo systemctl start mongod
sudo systemctl status mongod  # Verify it's running
```

### Windows
```bash
net start MongoDB
```

### Verify MongoDB is Running
```bash
mongosh
# You should see: "Connected to: mongodb://localhost:27017"
# Type: exit
```

✅ **MongoDB is now running!**

---

## 🎯 Step 2: Setup Backend

Open a **new terminal window** and run:

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

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### Verify Backend is Working
Open a new terminal and run:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Symptom Disease Predictor API is running",
  "database": "connected"
}
```

✅ **Backend is now running on port 5000!**

**Keep this terminal open** - the backend needs to stay running.

---

## 🎯 Step 3: Setup Frontend

Open **another new terminal window** (keep backend running) and run:

```bash
# Make sure you're in the project root directory
# (not in the backend folder)

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **Frontend is now running!**

**Keep this terminal open too** - the frontend needs to stay running.

---

## 🎯 Step 4: Open the Application

1. Open your web browser
2. Navigate to: **http://localhost:5173/** (or the URL shown in your terminal)
3. You should see the **Symptom Disease Predictor** homepage

✅ **Application is now live!**

---

## 🎯 Step 5: Test It Out

### Create Your First Account

1. Click **"Sign Up"** in the top right
2. Fill in the registration form:
   ```
   Username:     myusername
   Email:        test@example.com
   Password:     password123
   Sex:          Male/Female/Other
   Blood Group:  O+ (or any other)
   Mobile:       +1234567890
   ```
3. Click **"Register"**
4. You'll be automatically logged in and see your **Dashboard**

### Make Your First Prediction

1. Click **"Symptom Checker"** in the navigation
2. Select an organ: **👁️ Eyes**
3. Select some symptoms:
   - ✓ Red eyes
   - ✓ Itchy eyes
   - ✓ Watery eyes
4. Fill in additional info:
   - Duration: A few hours
   - Severity: Mild
   - Age: 25
   - Gender: Male/Female/Other
5. Click **"Analyze Symptoms"**
6. Wait 3-4 seconds for ML analysis
7. See your result:
   ```
   🏥 Predicted Disease (Highest Confidence)
   
   Allergic Conjunctivitis
   
   Overall Confidence: 87%
   Severity: MILD
   
   ML Model Scores:
   • Logistic Regression: 85%
   • Random Forest: 89%
   • Gradient Boosting: 87%
   
   ✅ Saved to Profile
   ```

### View Your Dashboard

1. Click **"Dashboard"** in the navigation
2. You should see:
   - Your personal information
   - Health score: 78%
   - Total Analyses: 1
   - Your recent prediction

### Try All Three Organ Systems

**Ear (👂) Example:**
- Ear pain
- Hearing loss
- Feeling of fullness
→ Likely: **Earwax Blockage**

**Lungs (🫁) Example:**
- Dry cough
- Chest tightness
- Shortness of breath
→ Likely: **Asthma**

### Download a Report

1. Go to **Dashboard** → **Profile** tab
2. Click **"Download Medical Report"**
3. Enter your city: `New York` (or any city)
4. Click **"Find Hospitals"**
5. Select your prediction(s) to include
6. Click **"Generate & Download Report"**
7. A `.txt` file will download with:
   - Your diagnosis
   - ML model scores
   - Nearby hospitals
   - Recommendations

---

## 🎉 Congratulations!

You've successfully:
- ✅ Set up MongoDB
- ✅ Started the backend server
- ✅ Started the frontend application
- ✅ Created a user account
- ✅ Made your first prediction
- ✅ Viewed your dashboard
- ✅ Downloaded a medical report

---

## 📊 What's Happening Behind the Scenes?

### When You Analyze Symptoms:

1. **Frontend** collects your symptoms
2. **ML Service** runs 3 models in parallel:
   - Logistic Regression analyzes patterns
   - Random Forest uses decision trees
   - Gradient Boosting learns sequentially
3. **Ensemble** combines results using weighted average
4. **Highest confidence disease** is selected
5. **Backend API** saves to MongoDB
6. **Dashboard** updates with new prediction

### Your Data:

```
MongoDB Database: symptom-predictor
├── users collection
│   └── Your account info (password hashed)
└── predictions collection
    └── Your diagnosis (only highest confidence)
```

---

## 🔧 Common Issues & Solutions

### Issue: "Can't connect to MongoDB"
**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux
net start MongoDB                      # Windows
```

### Issue: "Backend port 5000 already in use"
**Solution:**
```bash
# Option 1: Kill the process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option 2: Change the port
# Edit backend/.env
PORT=5001
```

### Issue: "Frontend won't connect to backend"
**Solution:**
1. Make sure backend is running on port 5000
2. Check `/utils/api.js` has correct URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```
3. Clear browser cache and reload

### Issue: "Predictions not saving"
**Solution:**
1. Make sure you're logged in
2. Check browser console for errors (F12)
3. Verify backend is running
4. Check MongoDB connection

---

## 🎓 Learning Resources

### Understanding the ML Models

**Logistic Regression:**
- Calculates probability of each disease
- Based on symptom matching weights
- Good for linear patterns

**Random Forest:**
- Uses multiple decision trees
- Each tree votes on the diagnosis
- Handles complex patterns well

**Gradient Boosting:**
- Learns from previous predictions
- Sequentially improves accuracy
- Excels at fine-tuning results

**Ensemble:**
- Combines all three models
- Weighted average of predictions
- More accurate than any single model

### Why Only the Highest Confidence?

**Clear Communication:**
- One definitive answer instead of 5 possibilities
- Reduces user confusion
- Easier for healthcare providers to review

**Actionable Information:**
- Focus on most likely condition
- Specific recommendations
- Clear next steps

**Transparency:**
- Show all ML model scores
- Explain how decision was made
- Alternative diagnoses still visible for reference

---

## 📚 Next Steps

Now that you're set up, try:

1. **Test all three organ systems:**
   - Ear symptoms → Ear diseases
   - Eye symptoms → Eye diseases
   - Lung symptoms → Lung diseases

2. **Explore the dashboard:**
   - View prediction history
   - Update prediction status
   - Download comprehensive reports

3. **Try different symptoms:**
   - Mild symptoms → See how models respond
   - Severe symptoms → Notice urgency levels
   - Multiple organs → Test the system thoroughly

4. **Generate reports:**
   - Add multiple predictions
   - Try different cities for hospitals
   - Review ML model scores

5. **Read the documentation:**
   - [FEATURES.md](./FEATURES.md) - All features explained
   - [INSTALLATION.md](./INSTALLATION.md) - Detailed setup
   - [CHANGELOG.md](./CHANGELOG.md) - What's new

---

## 🆘 Need More Help?

### Check These Files:
- **Quick help:** [QUICKSTART.md](./QUICKSTART.md)
- **Detailed setup:** [INSTALLATION.md](./INSTALLATION.md)
- **All features:** [FEATURES.md](./FEATURES.md)
- **What changed:** [CHANGELOG.md](./CHANGELOG.md)
- **Technical details:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

### Verify Your Setup:

**1. MongoDB:**
```bash
mongosh
# Should connect successfully
```

**2. Backend:**
```bash
curl http://localhost:5000/api/health
# Should return {"status":"ok"}
```

**3. Frontend:**
```
Open http://localhost:5173
# Should show the application
```

**All working?** You're all set! 🎉

**Having issues?** Check the troubleshooting section above or review the detailed [INSTALLATION.md](./INSTALLATION.md) guide.

---

## ⚠️ Important Reminders

### Medical Disclaimer
- This is an **educational tool**, not a medical device
- Always consult real healthcare professionals
- In emergencies, call your local emergency services
- AI predictions are not medical diagnoses

### Development Use Only
- **NOT for production medical use**
- **NOT HIPAA compliant**
- **NOT FDA approved**
- For learning and demonstration only

### Security
- Change `JWT_SECRET` in production
- Use strong passwords for user accounts
- Keep MongoDB secure
- Never share your `.env` file

---

<div align="center">

## 🎯 You're All Set!

**Your Symptom Disease Predictor is ready to use!**

Start analyzing symptoms and building your health history.

Happy health tracking! 🏥✨

</div>