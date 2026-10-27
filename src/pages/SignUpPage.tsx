import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AccountTypeSelector from '../components/auth/AccountTypeSelector';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import PrimaryButton from '../components/auth/PrimaryButton';
import SocialAuthButton from '../components/auth/SocialAuthButton';
import AuthDivider from '../components/auth/AuthDivider';
import FormStatusMessage from '../components/auth/FormStatusMessage';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../lib/validation';
import { authService, type AccountType } from '../services/auth';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (authService.getSession()) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  // Form State
  const [accountType, setAccountType] = useState<AccountType>('creative_professional');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Touched state to prevent eager errors before user interaction
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Errors state
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  // Field refs for accessible focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);

  // Blur handlers
  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: keyof typeof touched): boolean => {
    let err: string | undefined;

    if (field === 'name') {
      const res = validateName(name);
      if (!res.isValid) err = res.message;
    } else if (field === 'email') {
      const res = validateEmail(email);
      if (!res.isValid) err = res.message;
    } else if (field === 'password') {
      const res = validatePassword(password);
      if (!res.isValid) err = res.message;
    } else if (field === 'confirmPassword') {
      const res = validatePasswordConfirm(password, confirmPassword);
      if (!res.isValid) err = res.message;
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const isNameValid = validateField('name');
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    const isConfirmValid = validateField('confirmPassword');

    if (!isNameValid) {
      nameInputRef.current?.focus();
      return;
    }
    if (!isEmailValid) {
      emailInputRef.current?.focus();
      return;
    }
    if (!isPasswordValid) {
      passwordInputRef.current?.focus();
      return;
    }
    if (!isConfirmValid) {
      confirmInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const response = await authService.signUp({
        name,
        email,
        password,
        accountType,
      });

      if (!response.success) {
        setErrors((prev) => ({
          ...prev,
          form: response.error || 'Registration failed. Please check your details and try again.',
        }));
        setIsLoading(false);
        return;
      }

      // Successful registration - proceed to onboarding retaining selected role
      navigate('/onboarding', {
        state: {
          accountType,
          isNewSignup: true,
          userName: name,
        },
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'A network error occurred. Please check your connection and try again.',
      }));
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSocialLoading(true);
    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const response = await authService.signInWithGoogle();
      if (response.success) {
        navigate('/onboarding', {
          state: {
            accountType,
            isNewSignup: true,
            userName: response.user?.name,
          },
        });
      } else {
        setErrors((prev) => ({
          ...prev,
          form: response.error || 'Google authentication was unable to complete.',
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'Google authentication service is temporarily unavailable.',
      }));
    } finally {
      setIsSocialLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="auth-header-group">
          <h1 className="auth-form-title">Create your account</h1>
          <p className="auth-form-subtitle">
            Join BRIDGENEEDS and start building meaningful creative connections.
          </p>
        </div>

        {/* Account Type Selector (Creative Professional vs Hiring Client) */}
        <AccountTypeSelector
          value={accountType}
          onChange={(type) => setAccountType(type)}
        />

        {/* Global form error message */}
        <FormStatusMessage type="error" message={errors.form} />

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <FormField
            ref={nameInputRef}
            label="Full name"
            type="text"
            id="signup-name"
            autoComplete="name"
            placeholder="e.g. Marcus Vance"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) validateField('name');
            }}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
            required
            disabled={isLoading}
          />

          {/* Email Address */}
          <FormField
            ref={emailInputRef}
            label="Email address"
            type="email"
            id="signup-email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) validateField('email');
            }}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            required
            disabled={isLoading}
          />

          {/* Password with Strength Meter & Baseline (min 12 chars) */}
          <PasswordField
            ref={passwordInputRef}
            label="Password"
            id="signup-password"
            autoComplete="new-password"
            placeholder="At least 12 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password) validateField('password');
            }}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : undefined}
            showStrengthMeter
            required
            disabled={isLoading}
          />

          {/* Confirm Password */}
          <PasswordField
            ref={confirmInputRef}
            label="Confirm password"
            id="signup-confirm-password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (touched.confirmPassword) validateField('confirmPassword');
            }}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            required
            disabled={isLoading}
          />

          {/* Primary CTA */}
          <div style={{ marginTop: '24px' }}>
            <PrimaryButton
              type="submit"
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Create account
            </PrimaryButton>
          </div>

          {/* Terms and Privacy Statement */}
          <p className="auth-terms-statement">
            By creating an account, you agree to our{' '}
            <Link to="/terms">Terms of Service</Link> and{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </form>

        {/* Social Authentication Alternative */}
        <AuthDivider text="or continue with" />
        <SocialAuthButton
          onClick={handleGoogleSignup}
          isLoading={isSocialLoading}
          disabled={isLoading}
        />

        {/* Existing Account Prompt */}
        <div className="auth-switch-prompt">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignupPage;
export { SignupPage as SignUpPage };

