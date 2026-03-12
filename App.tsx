import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SymptomCheckerPage } from './components/SymptomCheckerPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { authAPI, predictionAPI } from './utils/api.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [recentPredictions, setRecentPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const response = await authAPI.getCurrentUser();
          const userData = response.user;
          
          // Fetch user's predictions
          const predictionsResponse = await predictionAPI.getAll();
          const predictions = predictionsResponse.predictions.map((pred: any) => ({
            id: pred._id,
            date: pred.date,
            time: pred.time,
            organ: pred.organ,
            symptoms: pred.symptoms,
            topCondition: pred.topCondition,
            probability: pred.probability,
            severity: pred.severity,
            recommendations: pred.recommendations,
            status: pred.status,
            modelScores: pred.modelScores
          }));
          
          setUser({ ...userData, predictions });
          setRecentPredictions([]);
        } catch (error) {
          console.error('Auth check failed:', error);
          authAPI.logout();
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await authAPI.login(credentials);
      const userData = response.user;
      
      // Fetch user's predictions
      const predictionsResponse = await predictionAPI.getAll();
      const predictions = predictionsResponse.predictions.map((pred: any) => ({
        id: pred._id,
        date: pred.date,
        time: pred.time,
        organ: pred.organ,
        symptoms: pred.symptoms,
        topCondition: pred.topCondition,
        probability: pred.probability,
        severity: pred.severity,
        recommendations: pred.recommendations,
        status: pred.status,
        modelScores: pred.modelScores
      }));
      
      setUser({ ...userData, predictions });
      setRecentPredictions([]);
      setCurrentPage('dashboard');
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      const response = await authAPI.register(userData);
      const user = response.user;
      
      setUser({ ...user, predictions: [] });
      setRecentPredictions([]);
      setCurrentPage('dashboard');
      return true;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setRecentPredictions([]);
    setCurrentPage('home');
  };

  const handleSavePrediction = async (predictionData: any) => {
    if (user) {
      try {
        const predictionToSave = {
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          ...predictionData
        };

        const response = await predictionAPI.save(predictionToSave);
        const savedPrediction = response.prediction;

        const newPrediction = {
          id: savedPrediction._id,
          date: savedPrediction.date,
          time: savedPrediction.time,
          organ: savedPrediction.organ,
          symptoms: savedPrediction.symptoms,
          topCondition: savedPrediction.topCondition,
          probability: savedPrediction.probability,
          severity: savedPrediction.severity,
          recommendations: savedPrediction.recommendations,
          status: savedPrediction.status,
          modelScores: savedPrediction.modelScores
        };

        setUser(prevUser => ({
          ...prevUser,
          predictions: [...(prevUser.predictions || []), newPrediction]
        }));

        setRecentPredictions(prev => [newPrediction, ...prev]);

        return true;
      } catch (error) {
        console.error('Failed to save prediction:', error);
        return false;
      }
    }
    return false;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onPageChange={setCurrentPage} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onPageChange={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard user={user} recentPredictions={recentPredictions} onPageChange={setCurrentPage} /> : <HomePage onPageChange={setCurrentPage} />;
      case 'symptom-checker':
        return <SymptomCheckerPage user={user} onSavePrediction={handleSavePrediction} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        user={user}
        onLogin={() => setCurrentPage('login')}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Symptom Disease Predictor</h3>
              <p className="text-gray-300 mb-4">
                Empowering individuals with AI-driven health insights to make informed decisions about their wellbeing.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-300 hover:text-white transition-colors">
                  📧
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  🐦
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  📘
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('symptom-checker')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Symptom Checker
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('about')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Medical Disclaimer</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
            <p>&copy; 2024 Symptom Disease Predictor. All rights reserved.</p>
            <p className="mt-2 text-sm">
              This platform is for informational purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
