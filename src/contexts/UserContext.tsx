import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

interface UserData {
  user_id: number;
  email: string;
  position: number;
  referral_code: string;
  referral_url: string;
  referral_count: number;
  points_system: {
    total_points: number;
    social_follow_points: number;
    referral_points: number;
    early_access_eligible: boolean;
    points_needed_for_early_access: number;
  };
  leaderboard_rank: number;
  social_follow_status?: Record<string, any>;
}

interface UserContextType {
  userData: UserData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const savedUserData = localStorage.getItem('beeylo_user_data');
    const savedEmail = localStorage.getItem('beeylo_user_email');
    
    if (savedUserData && savedEmail) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
        setIsLoggedIn(true);
        // Refresh data in background
        refreshUserDataSilently(savedEmail);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('beeylo_user_data');
        localStorage.removeItem('beeylo_user_email');
      }
    }
  }, []);

  const refreshUserDataSilently = async (email: string) => {
    try {
      const response = await api.getUserStatus(email);
      if (response.success) {
        setUserData(response.data);
        localStorage.setItem('beeylo_user_data', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to refresh user data silently:', error);
    }
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // First, try to get existing user status
      let userExists = false;
      let existingUserData = null;
      
      try {
        const response = await api.getUserStatus(email);
        if (response.success) {
          userExists = true;
          existingUserData = response.data;
        }
      } catch (statusError) {
        // If getUserStatus fails (404, endpoint doesn't exist, etc.), 
        // assume user doesn't exist and proceed with registration
        console.log('User status check failed, proceeding with registration:', statusError);
        userExists = false;
      }
      
      if (userExists && existingUserData) {
        // User exists, log them in without sending to Brevo again
        setUserData(existingUserData);
        setIsLoggedIn(true);
        localStorage.setItem('beeylo_user_data', JSON.stringify(existingUserData));
        localStorage.setItem('beeylo_user_email', email);
        // Set a session storage flag to indicate a fresh form submission
        sessionStorage.setItem('beeylo_form_submitted', 'true');
        return true;
      } else {
        // User doesn't exist, register them
        const registrationResponse = await api.registerUser({
          email,
          source: 'react_app',
          form_version: '1.0',
          session_id: `react_${Date.now()}`,
          submission_time: Date.now(),
          skip_brevo: false, // New users should be sent to Brevo
        });

        if (registrationResponse.success) {
          setUserData(registrationResponse.data);
          setIsLoggedIn(true);
          localStorage.setItem('beeylo_user_data', JSON.stringify(registrationResponse.data));
          localStorage.setItem('beeylo_user_email', email);
          // Set a session storage flag to indicate a fresh form submission
          sessionStorage.setItem('beeylo_form_submitted', 'true');
          return true;
        } else {
          setError(registrationResponse.message || 'Registration failed');
          return false;
        }
      }
    } catch (error) {
      console.error('Login/Registration failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    setError(null);
    localStorage.removeItem('beeylo_user_data');
    localStorage.removeItem('beeylo_user_email');
  };

  const refreshUserData = async () => {
    if (!userData?.email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getUserStatus(userData.email);
      if (response.success) {
        setUserData(response.data);
        localStorage.setItem('beeylo_user_data', JSON.stringify(response.data));
      } else {
        setError('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  const value: UserContextType = {
    userData,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    refreshUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};