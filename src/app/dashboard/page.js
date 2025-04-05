'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from './components/LoginForm';
import CustomerDashboard from './components/CustomerDashboard';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('dashboardToken');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  // Handle login
  const handleLogin = (generatedToken) => {
    localStorage.setItem('dashboardToken', generatedToken);
    setToken(generatedToken);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('dashboardToken');
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[100px] pb-16">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-[Amenti] text-[#93cfa2]">
                  LIMI Customer Dashboard
                </h1>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
              <CustomerDashboard token={token} />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
