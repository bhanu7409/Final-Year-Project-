import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SymptomCheckerPage } from './components/SymptomCheckerPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { authAPI, predictionAPI } from './utils/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authAPI.isAuthenticated()) {
          // Fetch user data
          const userData = await authAPI.getCurrentUser();
          setUser(userData.user);
          
          // Fetch user predictions
          const predictionsData = await predictionAPI.getAll();
          setPredictions(predictionsData.predictions || []);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        authAPI.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      setUser(response.user);
      
      // Fetch user predictions
      const predictionsData = await predictionAPI.getAll();
      setPredictions(predictionsData.predictions || []);
      
      setCurrentPage('dashboard');
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      setUser(response.user);
      setPredictions([]);
      
      setCurrentPage('dashboard');
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed. Please try again.');
      return false;
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setPredictions([]);
    setCurrentPage('home');
  };

  const handleSavePrediction = async (predictionData) => {
    // Save predictions for logged in users
    if (user) {
      try {
        const response = await predictionAPI.save(predictionData);
        
        // Add the new prediction to the local state
        setPredictions(prev => [response.prediction, ...prev]);
        
        return true; // Prediction saved
      } catch (error) {
        console.error('Failed to save prediction:', error);
        alert('Failed to save prediction. Please try again.');
        return false;
      }
    }
    return false; // Prediction not saved (user not logged in)
  };

  const handleUpdatePredictionStatus = async (predictionId, newStatus) => {
    try {
      await predictionAPI.updateStatus(predictionId, newStatus);
      
      // Update local state
      setPredictions(prev => 
        prev.map(p => 
          p._id === predictionId ? { ...p, status: newStatus } : p
        )
      );
      
      return true;
    } catch (error) {
      console.error('Failed to update prediction status:', error);
      alert('Failed to update prediction status. Please try again.');
      return false;
    }
  };

  const handleDeletePrediction = async (predictionId) => {
    try {
      await predictionAPI.delete(predictionId);
      
      // Remove from local state
      setPredictions(prev => prev.filter(p => p._id !== predictionId));
      
      return true;
    } catch (error) {
      console.error('Failed to delete prediction:', error);
      alert('Failed to delete prediction. Please try again.');
      return false;
    }
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onPageChange={setCurrentPage} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onPageChange={setCurrentPage} />;
      case 'dashboard':
        return user ? (
          <Dashboard 
            user={user} 
            predictions={predictions}
            onPageChange={setCurrentPage}
            onUpdateStatus={handleUpdatePredictionStatus}
            onDeletePrediction={handleDeletePrediction}
          />
        ) : (
          <HomePage onPageChange={setCurrentPage} />
        );
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
              <h3 className="mb-4">Symptom Disease Predictor</h3>
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
              <h4 className="mb-4">Quick Links</h4>
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
              <h4 className="mb-4">Legal</h4>
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
            <p className="mt-2">
              This platform is for informational purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}