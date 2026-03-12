# Symptom Disease Predictor - Features Documentation

## Overview

The Symptom Disease Predictor is a comprehensive healthcare application that uses machine learning to analyze symptoms and predict diseases for three organ systems: **Ear, Eyes, and Lungs**.

## Key Features

### 1. **Machine Learning Prediction System**

The application uses an **ensemble of three ML models**:
- **Logistic Regression**: Provides probabilistic predictions based on symptom patterns
- **Random Forest**: Uses decision tree ensemble for robust predictions
- **Gradient Boosting**: Sequential learning for improved accuracy

**Prediction Methodology:**
- Each model independently analyzes the symptoms
- Results are combined using a weighted average ensemble method
- **Only the highest confidence disease is displayed and saved**
- Model scores for all three algorithms are shown for transparency

### 2. **Highest Confidence Disease Display**

**What gets saved:**
- Only the disease with the **highest confidence score** from the ensemble
- Complete ML model breakdown showing individual scores from:
  - Logistic Regression
  - Random Forest  
  - Gradient Boosting
- Overall confidence percentage
- Severity level (Mild, Moderate, Severe)
- Personalized recommendations

**Why this approach:**
- Provides clear, actionable diagnosis
- Reduces confusion from multiple possible conditions
- Focuses user attention on the most likely condition
- Maintains transparency through detailed model scores

### 3. **Organ Systems Covered**

#### **Ear Conditions**
- Otitis Media (Middle Ear Infection)
- Otitis Externa (Swimmer's Ear)
- Earwax Blockage
- Tinnitus (Acute & Chronic)
- Meniere's Disease
- Perforated Eardrum
- Acoustic Neuroma
- TMJ Disorder
- And 7 more conditions

**Example symptoms:** Ear pain, hearing loss, tinnitus, dizziness, ear discharge, etc.

#### **Eye Conditions**
- Allergic Conjunctivitis
- Dry Eye Syndrome
- Cataracts
- Glaucoma
- Macular Degeneration
- Bacterial Conjunctivitis
- And more

**Example symptoms:** Red eyes, blurred vision, light sensitivity, eye pain, etc.

#### **Lung Conditions**
- Asthma
- Acute Bronchitis
- Pneumonia
- COPD
- Pulmonary Embolism
- Common Cold
- And more

**Example symptoms:** Shortness of breath, cough, wheezing, chest pain, etc.

### 4. **User Dashboard**

**Personal Health Profile:**
- Username, email, blood group, mobile
- Sex and demographic information
- Account creation date

**Health Analytics:**
- Total number of analyses performed
- Health score (calculated from prediction history)
- Upcoming health reminders
- Quick action buttons for new analyses

**Prediction History:**
- View all past symptom analyses
- Filter by organ system
- See prediction dates and times
- Track status (Pending, Monitoring, Resolved, Urgent)
- Delete old predictions
- Update prediction status

### 5. **Comprehensive Medical Reports**

**Report Contents:**
```
SYMPTOM DISEASE PREDICTOR - COMPREHENSIVE MEDICAL REPORT
========================================================

PATIENT INFORMATION:
- Name, Email, Sex, Blood Group, Mobile
- Report Generation Date/Time

LOCATION-BASED ANALYSIS:
- Patient-entered location (city/town/village)
- 2-3 Nearest hospitals with:
  * Hospital name
  * Full address
  * Phone number
  * Specialty focus

PREDICTED DISEASE (HIGHEST CONFIDENCE):
- Primary diagnosis
- Overall confidence percentage
- Severity level
- Current status

ML MODEL SCORES:
- Logistic Regression score
- Random Forest score  
- Gradient Boosting score
- Ensemble method explanation

SYMPTOMS ANALYZED:
- Complete list of selected symptoms

CLINICAL RECOMMENDATIONS:
- Personalized medical advice
- Self-care suggestions
- When to seek professional help

MEDICAL DISCLAIMER:
- Clear statement about AI limitations
- Recommendation to consult healthcare professionals
```

**Download Features:**
- Select multiple predictions to include
- Enter location manually for hospital lookup
- Preview nearby hospitals before downloading
- Report saved as .txt file for easy sharing
- Unique report ID for tracking

### 6. **Hospital Locator**

**Coverage:**
- **Major US Cities:** New York, Los Angeles, Chicago, Houston, Miami
- **International:** London, Toronto, Mumbai, Delhi
- **Default hospitals** for smaller cities/towns

**How it works:**
1. User enters their city/town/village name
2. System searches for exact or partial matches
3. If no match found, provides generic regional hospitals
4. Displays 2-3 nearest ENT specialists with full details
5. Includes in downloadable report

### 7. **Authentication & Security**

**User Registration:**
- Username (unique)
- Email (unique, validated)
- Password (hashed with bcrypt, minimum 8 characters)
- Sex (Male/Female/Other)
- Blood Group (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Mobile number (validated format)

**Login System:**
- JWT token-based authentication
- 7-day token expiration
- Secure password comparison
- Session persistence

**Data Security:**
- Passwords hashed with bcrypt (10 salt rounds)
- JWT secret for token signing
- MongoDB connection security
- CORS protection
- Input validation and sanitization

### 8. **MongoDB Database Integration**

**Database Structure:**

**Users Collection:**
```javascript
{
  username: String (unique),
  email: String (unique, lowercase),
  password: String (hashed),
  sex: String (male/female/other),
  bloodGroup: String,
  mobile: String,
  createdAt: Date
}
```

**Predictions Collection:**
```javascript
{
  userId: ObjectId (ref: Users),
  date: String,
  time: String,
  organ: String,
  symptoms: [String],
  topCondition: String,
  probability: Number,
  severity: String (mild/moderate/severe),
  recommendations: [String],
  status: String (monitoring/resolved/pending/urgent),
  modelScores: {
    logisticRegression: Number,
    randomForest: Number,
    gradientBoosting: Number
  },
  hospitals: [{
    name: String,
    address: String,
    phone: String,
    distance: String
  }],
  location: String,
  createdAt: Date
}
```

### 9. **Responsive Design**

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized for tablets and desktops

### 10. **User Experience Features**

**Visual Feedback:**
- Loading states during ML analysis
- Success/error messages
- Progress indicators
- Color-coded severity levels (green/yellow/red)
- Status badges

**Helpful Information:**
- Tooltips and descriptions
- ML model explanations
- Medical disclaimers
- Privacy notices

**Accessibility:**
- Clear headings and labels
- High contrast color schemes
- Keyboard navigation support
- Screen reader friendly

## Technical Stack

**Frontend:**
- React (JavaScript)
- Tailwind CSS v4
- ShadCN UI components
- Custom ML prediction service

**Backend:**
- Node.js with Express
- MongoDB (Mongoose ODM)
- bcrypt for password hashing
- JWT for authentication
- CORS for security

**APIs:**
- RESTful API design
- JSON data format
- Token-based authentication
- Error handling and validation

## Medical Disclaimer

⚠️ **Important:**
- This is an **AI-powered informational tool**
- **NOT a substitute** for professional medical advice
- Always consult qualified healthcare providers
- Emergency situations require immediate medical attention
- Results are based on pattern matching, not medical expertise
- Individual cases may vary significantly

## Future Enhancements

Potential features for future versions:
- Additional organ systems (Heart, Kidney, etc.)
- Integration with real medical APIs
- Telemedicine consultation booking
- Medication tracking
- Vital signs monitoring
- Multi-language support
- Mobile app version
- Export to PDF format
- Email report delivery
- Integration with Electronic Health Records (EHR)

## Support

For technical issues or questions:
- Check the [INSTALLATION.md](./INSTALLATION.md) for setup help
- Review the [QUICKSTART.md](./QUICKSTART.md) for quick setup
- Ensure MongoDB is running
- Verify backend API is accessible
- Check browser console for errors

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**License:** For educational and demonstration purposes only