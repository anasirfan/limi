'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortalLogin from './components/PortalLogin';
import CustomerDashboard from './components/CustomerDashboard';

// Mock authentication state
export default function CustomerPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Simulate checking authentication status
  useEffect(() => {
    // Check if user is logged in (from localStorage in this mock example)
    const savedUser = localStorage.getItem('limiUser');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('limiUser');
      }
    }
    
    setLoading(false);
  }, []);
  
  // Handle login
  const handleLogin = (userData) => {
    // In a real app, this would validate credentials with a backend
    setUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage for persistence (would be a token in real app)
    localStorage.setItem('limiUser', JSON.stringify(userData));
  };
  
  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('limiUser');
    router.push('/portal');
  };
  
  if (loading) {
    return (
      <main className="bg-[#292929] text-white min-h-screen">
        <Header />
        <div className="pt-[120px] pb-16 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-2xl text-[#54BB74]">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }
  
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          {!isAuthenticated ? (
            <PortalLogin onLogin={handleLogin} />
          ) : (
            <CustomerDashboard user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
