import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

interface UserData {
  user_id: number;
  email: string;
  position: number; // Legacy field
  position_in_queue: number; // Boosted position (the one we want to show)
  fair_position: number; // Actual position without boosts
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
  loadingMessage: string | null; // New: specific loading messages
  login: (email: string, securityData?: SecurityData) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

interface SecurityData {
  fingerprint?: string;
  submission_time?: number;
  form_version?: string;
  session_id?: string;
  turnstile_token?: string;
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
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

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
        // Transform the data to ensure it has all required fields
        const transformedData = {
          ...response.data,
          // Use position_in_queue if available, otherwise fall back to position
          position_in_queue: (response.data as any).position_in_queue || response.data.position,
          // Use fair_position if available, otherwise use position
          fair_position: (response.data as any).fair_position || response.data.position
        };
        setUserData(transformedData);
        localStorage.setItem('beeylo_user_data', JSON.stringify(transformedData));
      }
    } catch (error) {
      console.error('Failed to refresh user data silently:', error);
    }
  };

  const login = async (email: string, securityData?: SecurityData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(null);
    
    // Set loading message after 2 seconds
    const loadingTimer = setTimeout(() => {
      setLoadingMessage('Looking for your reservation...');
    }, 2000);

    try {
      // No client-side delays needed - backend handles rate limiting
      
      // Optimized registration request with better parameters and security data
      const registrationResponse = await api.registerUser({
        email,
        source: window.location.hostname,
        form_version: '2.1', // Updated to match documentation
        session_id: `react_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        skip_brevo: false, // Let backend handle email service integration
        // Add security data for behavioral analysis and fingerprinting
        ...(securityData?.fingerprint && { fingerprint: securityData.fingerprint }),
        ...(securityData?.submission_time && { submission_time: securityData.submission_time }),
        // Add Turnstile token if available
        ...(securityData?.turnstile_token && { turnstile_token: securityData.turnstile_token }),
        // Add user agent info for better backend processing
        ...(typeof navigator !== 'undefined' && {
          user_agent: navigator.userAgent
        })
      });

      if (registrationResponse.success) {
        
        // Transform the data to ensure it has all required fields
        const responseData = registrationResponse.data as any;
        const transformedData: UserData = {
          ...responseData,
          // Use position_in_queue if available, otherwise fall back to position
          position_in_queue: responseData.position_in_queue || responseData.position,
          // Use fair_position if available, otherwise use position
          fair_position: responseData.fair_position || responseData.position
        };
        
        setUserData(transformedData);
        setIsLoggedIn(true);
        localStorage.setItem('beeylo_user_data', JSON.stringify(transformedData));
        localStorage.setItem('beeylo_user_email', email);
        // Set a session storage flag to indicate a fresh form submission
        sessionStorage.setItem('beeylo_form_submitted', 'true');
        return true;
      } else {
        setError(registrationResponse.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Login/Registration failed:', error);
      
      // Handle different types of errors based on backend documentation
      if (error instanceof Error) {
        const errorMessage = error.message;
        
        if (errorMessage.includes('429')) {
          // Extract wait time from error message if available
          const waitTimeMatch = errorMessage.match(/wait (\d+) seconds/);
          const waitTime = waitTimeMatch ? waitTimeMatch[1] : 'a few minutes';
          
          // Show user-friendly rate limit message
          setError(`Server is busy. Please wait ${waitTime} before trying again.`);
        } else if (errorMessage.includes('403')) {
          // Invalid origin error
          setError('Access denied. Please try refreshing the page.');
        } else if (errorMessage.includes('422')) {
          // Validation or security error
          if (errorMessage.includes('Security validation failed')) {
            setError('Security check failed. Please try again or contact support.');
          } else {
            setError('Invalid information provided. Please check your email and try again.');
          }
        } else if (errorMessage.includes('500')) {
          setError('Server error. Please try again later or contact support.');
        } else {
          // Extract clean error message from API response if available
          const apiErrorMatch = errorMessage.match(/API Error: \d+ - (.+)/);
          if (apiErrorMatch && apiErrorMatch[1]) {
            setError(apiErrorMatch[1]);
          } else {
            setError('An error occurred. Please try again.');
          }
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      return false;
    } finally {
      clearTimeout(loadingTimer);
      setIsLoading(false);
      setLoadingMessage(null);
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
    setLoadingMessage(null);
    
    // Set loading message after 2 seconds
    const loadingTimer = setTimeout(() => {
      setLoadingMessage('Looking for your reservation...');
    }, 2000);

    try {
      const response = await api.getUserStatus(userData.email);
      if (response.success) {
        // Transform the data to ensure it has all required fields
        const transformedData = {
          ...response.data,
          // Use position_in_queue if available, otherwise fall back to position
          position_in_queue: (response.data as any).position_in_queue || response.data.position,
          // Use fair_position if available, otherwise use position
          fair_position: (response.data as any).fair_position || response.data.position
        };
        setUserData(transformedData);
        localStorage.setItem('beeylo_user_data', JSON.stringify(transformedData));
      } else {
        setError('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh data');
    } finally {
      clearTimeout(loadingTimer);
      setIsLoading(false);
      setLoadingMessage(null);
    }
  };

  const value: UserContextType = {
    userData,
    isLoggedIn,
    isLoading,
    error,
    loadingMessage,
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