import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { Button, Typography } from '../components/ui';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface WaitlistFormProps {
  onSuccess?: () => void;
  className?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess, className = '' }) => {
  const { login, isLoading, error } = useUser();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [fingerprint, setFingerprint] = useState('');
  
  // Honeypot field (hidden from users, visible to bots)
  const [honeypot, setHoneypot] = useState('');
  
  const pageLoadTime = useRef<number>(Date.now());

  // Generate fingerprint proactively when component loads
  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);
        console.log('Fingerprint generated:', result.visitorId);
      } catch (error) {
        console.error('FingerprintJS error:', error);
      }
    };
    generateFingerprint();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if this field is filled, it's a bot
    if (honeypot.trim() !== '') {
      console.log('Bot detected via honeypot');
      return; // Stop here, no API call
    }

    // Check if email is empty
    if (!email.trim()) {
      // In development, use a sample account for quick testing
      if (import.meta.env.DEV || window.location.hostname === 'localhost') {
        setLoginError(null);
        const success = await login('sample@beeylo.com', {
          fingerprint,
          submission_time: Date.now() - pageLoadTime.current
        });
        if (!success) {
          setLoginError(error || 'Login failed. Please try again.');
        } else if (onSuccess) {
          onSuccess();
        }
      } else {
        // In production, if the email is empty, just show an error and do nothing.
        setLoginError('Please enter your email address');
      }
      return;
    }
    
    // Process valid email
    setLoginError(null);
    const success = await login(email.trim(), {
      fingerprint,
      submission_time: Date.now() - pageLoadTime.current
    });
    
    if (!success) {
      setLoginError(error || 'Login failed. Please try again.');
    } else if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={`waitlist-form-container ${className}`}>
      <form onSubmit={handleSubmit} className="waitlist-form">
        {/* Honeypot field - HIDDEN from real users */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ 
            position: 'absolute', 
            left: '-9999px', 
            opacity: 0, 
            pointerEvents: 'none' 
          }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        {/* Real email field */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            disabled={isLoading}
          />
        </div>
        <div className="button-group">
          <Button 
            type="submit" 
            variant="brand" 
            size="lg" 
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="form-button"
          >
            {isLoading ? 'Loading...' : 'Discover Beeylo'}
          </Button>
        </div>
        {(loginError || error) && (
          <Typography variant="small" color="error" className="form-error">
            {loginError || error}
          </Typography>
        )}
      </form>
    </div>
  );
};

export default WaitlistForm;
