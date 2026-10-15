import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import PrimaryButton from '../components/auth/PrimaryButton';
import SocialAuthButton from '../components/auth/SocialAuthButton';
import AuthDivider from '../components/auth/AuthDivider';
import FormStatusMessage from '../components/auth/FormStatusMessage';
import { validateEmail } from '../lib/validation';
import { authService } from '../services/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    const session = authService.getSession();
    if (session) {
      const target = session.user.accountType === 'creative_professional' ? '/dashboard/talent' : '/dashboard/client';
      navigate(target, { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState(() => authService.getRememberedEmail());
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(Boolean(authService.getRememberedEmail()));

  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Check if routed with message (e.g. from password reset)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessNotice(location.state.message);
    }
  }, [location.state]);

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      const res = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: res.isValid ? undefined : res.message }));
    } else if (field === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: password ? undefined : 'Please enter your password.',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const emailRes = validateEmail(email);
    const hasPassword = Boolean(password.trim());

    if (!emailRes.isValid) {
      setErrors((prev) => ({ ...prev, email: emailRes.message }));
      emailInputRef.current?.focus();
      return;
    }

    if (!hasPassword) {
      setErrors((prev) => ({ ...prev, password: 'Enter your password.' }));
      passwordInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: undefined, email: undefined, password: undefined }));
    setSuccessNotice(null);

    try {
      const res = await authService.signIn({
        email,
        password,
        rememberMe,
      });

      if (!res.success) {
        setErrors((prev) => ({
          ...prev,
          // As specified in Section 7: "Unable to sign in with those details. Check your email and password, then try again."
          form: res.error || 'Unable to sign in with those details. Check your email and password, then try again.',
        }));
        setIsLoading(false);
        return;
      }

      // Route user to appropriate portal
      const destination = res.user?.accountType === 'creative_professional'
        ? '/dashboard/talent'
        : '/dashboard/client';

      navigate(destination);
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'A network or server error occurred. Please try again later.',
      }));
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSocialLoading(true);
    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const res = await authService.signInWithGoogle();
      if (res.success) {
        navigate('/dashboard/talent');
      } else {
        setErrors((prev) => ({
          ...prev,
          form: res.error || 'Google authentication was unable to complete.',
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'Unable to connect to Google authentication service.',
      }));
    } finally {
      setIsSocialLoading(false);
    }
  };

  // Demo credential autofill helper for easy reviewer testing
  const autofillDemo = (role: 'creator' | 'client') => {
    if (role === 'creator') {
      setEmail('creator@bridgeneeds.com');
      setPassword('Password1234!');
    } else {
      setEmail('client@bridgeneeds.com');
      setPassword('Password1234!');
    }
    setErrors({});
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="auth-header-group">
          <h1 className="auth-form-title">Welcome back</h1>
          <p className="auth-form-subtitle">
            Sign in to continue your creative journey.
          </p>
        </div>

        {/* Success Notice (e.g. redirected from Password Reset) */}
        <FormStatusMessage type="success" message={successNotice} />

        {/* Global Error Banner */}
        <FormStatusMessage type="error" message={errors.form} />

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <FormField
            ref={emailInputRef}
            label="Email address"
            type="email"
            id="login-email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) {
                const res = validateEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: res.isValid ? undefined : res.message }));
              }
            }}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            required
            disabled={isLoading}
          />

          {/* Password with Forgot Password link aligned in label */}
          <PasswordField
            ref={passwordInputRef}
            label="Password"
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password) {
                setErrors((prev) => ({
                  ...prev,
                  password: e.target.value ? undefined : 'Enter your password.',
                }));
              }
            }}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : undefined}
            rightLabelAction={
              <Link to="/forgot-password" className="form-link-sm" tabIndex={0}>
                Forgot password?
              </Link>
            }
            required
            disabled={isLoading}
          />

          {/* Remember Me Option */}
          <div className="remember-me-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span
                className="checkbox-custom"
                style={{
                  backgroundColor: rememberMe ? 'var(--color-primary-blue)' : 'var(--color-surface)',
                  borderColor: rememberMe ? 'var(--color-primary-blue)' : 'var(--color-border)',
                }}
              >
                {rememberMe && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.8 7L9 1"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span>Remember email</span>
            </label>
          </div>

          {/* Primary Sign In CTA */}
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Signing in..."
          >
            Sign in
          </PrimaryButton>
        </form>

        {/* Social Authentication */}
        <AuthDivider text="or continue with" />
        <SocialAuthButton
          onClick={handleGoogleSignIn}
          isLoading={isSocialLoading}
          disabled={isLoading}
        />

        {/* Demo Credentials Quick-Fill (Convenience for testing) */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '6px' }}>
            Testing Demo Accounts:
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => autofillDemo('creator')}
              style={{
                fontSize: '11.5px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary-navy)',
                cursor: 'pointer',
              }}
            >
              Fill Creator
            </button>
            <button
              type="button"
              onClick={() => autofillDemo('client')}
              style={{
                fontSize: '11.5px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary-navy)',
                cursor: 'pointer',
              }}
            >
              Fill Client
            </button>
          </div>
        </div>

        {/* New Users Prompt */}
        <div className="auth-switch-prompt">
          <span>New to BRIDGENEEDS?</span>
          <Link to="/signup" className="auth-switch-link">
            Create an account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
