import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { Music, ArrowRight, Lock } from 'lucide-react';
import './AuthPages.css';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'client' | 'talent'>('client');
  const [error, setError] = useState('');

  const { setUserRole, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setUserRole(selectedRole);
    showToast(`Welcome back! Signed in as ${selectedRole.toUpperCase()}`, 'success');

    if (selectedRole === 'client') {
      navigate('/dashboard/client');
    } else {
      navigate('/dashboard/talent');
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card">
        
        <div className="auth-brand-header">
          <Link to="/" className="auth-logo-link">
            <div className="auth-logo-icon">
              <Music size={22} />
            </div>
            <span className="auth-wordmark">Bridgeneeds</span>
          </Link>
          <h1 className="auth-title">Sign In to Your Workspace</h1>
          <p className="auth-subtitle">Welcome back to the music talent marketplace.</p>
        </div>

        {/* Role Selector Pill */}
        <div className="role-selector-bar">
          <button
            type="button"
            className={`role-select-btn ${selectedRole === 'client' ? 'active' : ''}`}
            onClick={() => setSelectedRole('client')}
          >
            Sign In as Client
          </button>
          <button
            type="button"
            className={`role-select-btn ${selectedRole === 'talent' ? 'active' : ''}`}
            onClick={() => setSelectedRole('talent')}
          >
            Sign In as Talent
          </button>
        </div>

        {error && <div className="auth-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Email Address"
            type="email"
            id="signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="producer@studio.com"
            required
          />

          <TextField
            label="Password"
            type="password"
            id="signin-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
          />

          <Button variant="lime" size="lg" fullWidth type="submit" rightIcon={<ArrowRight size={18} />}>
            Sign In to Dashboard
          </Button>
        </form>

        <div className="auth-footer-note">
          <span>Don't have an account yet?</span>{' '}
          <Link to="/signup" className="auth-link">Create an Account</Link>
        </div>

      </div>
    </div>
  );
};
