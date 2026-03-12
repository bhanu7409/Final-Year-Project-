# 🏥 Symptom Disease Predictor

> AI-powered health analysis platform using machine learning to predict diseases based on symptoms for Ear, Eyes, and Lungs.

## ✨ Key Features

### 🎯 Highest Confidence Prediction
- **Shows ONLY the disease with the highest confidence score**
- Clear, actionable diagnosis without confusion
- Detailed ML model breakdown for transparency
- Saved to your personal health profile

### 🤖 Machine Learning Ensemble
Three powerful ML models working together:
- **Logistic Regression** - Probabilistic analysis
- **Random Forest** - Decision tree ensemble
- **Gradient Boosting** - Sequential learning

Each model independently analyzes your symptoms, then results are combined for the most accurate prediction.

### 📊 Complete Transparency
See exactly how the AI made its decision:
```
ML Model Scores:
• Logistic Regression: 85%
• Random Forest: 89%
• Gradient Boosting: 87%
━━━━━━━━━━━━━━━━━━━━
Overall Confidence: 87%
```

### 🏥 Comprehensive Medical Reports
Download detailed reports including:
- Your highest confidence diagnosis
- ML model score breakdown
- Personalized recommendations
- 2-3 nearest hospitals with contact info
- Complete symptom analysis

### 🔐 Secure User Profiles
- MongoDB-powered data persistence
- JWT authentication
- Encrypted passwords (bcrypt)
- Personal health history tracking
- Status updates (Pending → Monitoring → Resolved)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally)

### 1. Start MongoDB
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
cd backend
npm install
cp .env.example .env
npm run dev
```
✅ Backend running on http://localhost:5000

### 3. Frontend Setup
```bash
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

📖 **Need detailed instructions?** See [INSTALLATION.md](./INSTALLATION.md)

## 📱 How It Works

### 1️⃣ Select Your Organ System
Choose from: **Ear** 👂 | **Eyes** 👁️ | **Lungs** 🫁

### 2️⃣ Choose Your Symptoms  
Select from 50+ specific symptoms per organ system

### 3️⃣ Get AI Analysis
- 3 ML models analyze your symptoms
- Results combined using weighted average
- **Only the highest confidence disease is shown**

### 4️⃣ View Your Prediction
```
🏥 Predicted Disease: Allergic Conjunctivitis
📊 Confidence: 87%
⚠️  Severity: MILD
✅ Saved to Profile

ML Model Scores:
┌─────────────────────┬───────┐
│ Logistic Regression │  85%  │
│ Random Forest       │  89%  │
│ Gradient Boosting   │  87%  │
└─────────────────────┴───────┘
```

### 5️⃣ Get Recommendations
- Self-care instructions
- When to see a doctor
- Lifestyle modifications
- Follow-up guidance

### 6️⃣ Download Report
- Select predictions from your history
- Enter your location for nearby hospitals
- Get comprehensive medical report

## 🎨 What Makes This Special?

### ❌ What We DON'T Do:
- ~~Show 5+ confusing possible diseases~~
- ~~Save everything to your profile~~
- ~~Leave you wondering which diagnosis matters~~

### ✅ What We DO:
- **Show the ONE disease** with highest confidence
- Save only what matters to your profile
- Provide clear, actionable information
- Include complete ML transparency

## 📊 Organ Systems & Conditions

### 👂 Ear (15 Conditions)
Otitis Media, Earwax Blockage, Meniere's Disease, Acoustic Neuroma, Tinnitus, TMJ Disorder, and more

**50+ Symptoms** including: ear pain, hearing loss, tinnitus, dizziness, discharge, pressure, etc.

### 👁️ Eyes (15 Conditions)
Allergic Conjunctivitis, Dry Eye Syndrome, Cataracts, Glaucoma, Macular Degeneration, and more

**50+ Symptoms** including: red eyes, blurred vision, pain, sensitivity, discharge, etc.

### 🫁 Lungs (15 Conditions)
Asthma, Bronchitis, Pneumonia, COPD, Pulmonary Embolism, and more

**50+ Symptoms** including: cough, shortness of breath, wheezing, chest pain, etc.

## 🔧 Technical Stack

**Frontend:**
- React (JavaScript)
- Tailwind CSS v4
- ShadCN UI Components
- Custom ML Prediction Service

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing

**Machine Learning:**
- Logistic Regression Model
- Random Forest Ensemble
- Gradient Boosting Algorithm
- Weighted Average Ensemble

## 📚 Documentation

- [📖 Full Installation Guide](./INSTALLATION.md) - Complete setup instructions
- [⚡ Quick Start](./QUICKSTART.md) - Get running in 5 minutes
- [✨ Features](./FEATURES.md) - Detailed feature documentation
- [📝 Changelog](./CHANGELOG.md) - What's new in v2.0

## 🗂️ Project Structure

```
symptom-predictor/
├── backend/
│   ├── server.js           # Express + MongoDB server
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend docs
├── components/
│   ├── SymptomCheckerPage.jsx   # Main symptom analysis
│   ├── Dashboard.jsx            # User dashboard
│   ├── LoginPage.jsx            # Authentication
│   └── ui/                      # Reusable components
├── utils/
│   └── api.js              # Backend API client
├── styles/
│   └── globals.css         # Tailwind v4 config
├── App.jsx                 # Main application
├── INSTALLATION.md         # Setup guide
├── QUICKSTART.md          # Quick setup
├── FEATURES.md            # Feature docs
└── CHANGELOG.md           # Version history
```

## 🎯 Key Improvements in v2.0

### 1. Highest Confidence Only ⭐
**Before:** Showed 5 possible diseases  
**After:** Shows ONLY the most likely disease

**Why?** Clear, actionable information without confusion

### 2. MongoDB Integration 💾
**Before:** Mock data, no persistence  
**After:** Real database with user profiles

**Why?** Save your health history permanently

### 3. Detailed ML Scores 📊
**Before:** Single confidence percentage  
**After:** Score from each ML model + ensemble average

**Why?** Complete transparency in AI decision-making

### 4. Enhanced Reports 📄
**Before:** Basic symptom list  
**After:** Comprehensive medical report with ML scores

**Why?** Professional documentation for healthcare providers

## 🔒 Security & Privacy

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiration  
- ✅ CORS protection enabled
- ✅ Input validation on all endpoints
- ✅ MongoDB injection prevention
- ✅ XSS protection
- ✅ Secure session management

## ⚠️ Medical Disclaimer

**IMPORTANT:** This application is for **informational purposes only**.

- ❌ NOT a substitute for professional medical advice
- ❌ NOT suitable for diagnosing medical conditions
- ❌ NOT intended for emergency medical situations
- ✅ Always consult qualified healthcare professionals
- ✅ Results based on AI pattern matching, not medical expertise
- ✅ Individual cases may vary significantly

**In case of emergency, call your local emergency services immediately.**

## 🧪 Testing the App

### Test User Registration:
```javascript
Username: testuser
Email: test@example.com
Password: password123
Sex: Male
Blood Group: O+
Mobile: +1234567890
```

### Test Symptom Analysis:
1. Select **Eyes** 👁️
2. Choose symptoms:
   - ✓ Red eyes
   - ✓ Itchy eyes  
   - ✓ Watery eyes
3. Set severity: **Mild**
4. Click **Analyze Symptoms**
5. See: **Allergic Conjunctivitis** (87% confidence)

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check MongoDB is running
mongosh

# If error, start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux
net start MongoDB                      # Windows
```

### Can't save predictions?
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"ok","database":"connected"}
```

### Port conflicts?
```bash
# Change backend port
# Edit backend/.env
PORT=5001

# Restart backend
npm run dev
```

## 🚀 Future Enhancements

- [ ] More organ systems (Heart, Kidney, Brain)
- [ ] Integration with real medical databases
- [ ] Telemedicine consultation booking
- [ ] Medication tracking
- [ ] Vital signs monitoring
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] PDF report export
- [ ] Email report delivery

## 📬 Support

Need help?
1. Check [INSTALLATION.md](./INSTALLATION.md)
2. Review [QUICKSTART.md](./QUICKSTART.md)  
3. Read [FEATURES.md](./FEATURES.md)
4. Verify MongoDB is running
5. Check backend logs
6. Check browser console

## 📄 License

For educational and demonstration purposes only.

**NOT approved for clinical use.**

---

<div align="center">

**Built with** ❤️ **using React, Node.js, MongoDB & Machine Learning**

🏥 Empowering individuals with AI-driven health insights 🏥

</div>