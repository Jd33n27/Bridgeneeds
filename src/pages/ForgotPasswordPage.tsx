import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import FormField from '../components/auth/FormField';
import PrimaryButton from '../components/auth/PrimaryButton';
import FormStatusMessage from '../components/auth/FormStatusMessage';
import { validateEmail } from '../lib/validation';
import { authService } from '../services/auth';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const emailRes = validateEmail(email);
    if (!emailRes.isValid) {
      setError(emailRes.message);
      emailInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const res = await authService.requestPasswordReset(email);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'Unable to request reset. Please try again.');
        return;
      }

      setIsSubmitted(true);
      // Start 45-second resend cooldown timer
      setResendCooldown(45);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setIsLoading(false);
      setError('A network error occurred. Please check your connection.');
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0 || isLoading) return;
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div style={{ marginBottom: '16px' }}>
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13.5px',
              fontWeight: 500,
              color: 'var(--color-secondary-text)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Return to sign in</span>
          </Link>
        </div>

        <div className="auth-header-group">
          <h1 className="auth-form-title">Reset your password</h1>
          <p className="auth-form-subtitle">
            Enter the email address associated with your account. We'll send instructions if an account matches.
          </p>
        </div>

        {/* Global Error message */}
        <FormStatusMessage type="error" message={error} />

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <CheckCircle2 size={28} />
            </div>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--color-primary-navy)',
                marginBottom: '8px',
              }}
            >
              Check your inbox
            </h2>

            {/* As per Section 9: "Neutral confirmation message: 'If an account matches that email address, you'll receive instructions to reset your password.'" */}
            <p
              style={{
                fontSize: '14.5px',
                color: 'var(--color-secondary-text)',
                lineHeight: 1.5,
                marginBottom: '24px',
              }}
            >
              If an account matches that email address, you'll receive instructions to reset your password.
            </p>

            {/* Simulated direct link to reset form for demonstration */}
            <div
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-blue-light)',
                border: '1px solid #C4D9FF',
                marginBottom: '20px',
                fontSize: '13px',
                color: '#10233F',
                textAlign: 'left',
              }}
            >
              <strong>Development Mock Link:</strong>
              <div style={{ marginTop: '4px' }}>
                <Link
                  to={`/reset-password?token=bng_mock_token_${Date.now()}&email=${encodeURIComponent(email)}`}
                  style={{ color: 'var(--color-primary-blue)', fontWeight: 600 }}
                >
                  Click here to simulate opening email reset link &rarr;
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: resendCooldown > 0 ? 'var(--color-muted-text)' : 'var(--color-primary-blue)',
                  cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                  padding: '8px',
                }}
              >
                {resendCooldown > 0
                  ? `Resend reset email in ${resendCooldown}s`
                  : "Didn't receive an email? Send again"}
              </button>

              <Link
                to="/login"
                className="btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                Back to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <FormField
              ref={emailInputRef}
              label="Email address"
              type="email"
              id="forgot-email"
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) {
                  const res = validateEmail(e.target.value);
                  setError(res.isValid ? undefined : res.message);
                }
              }}
              onBlur={() => {
                setTouched(true);
                const res = validateEmail(email);
                setError(res.isValid ? undefined : res.message);
              }}
              error={touched ? error : undefined}
              required
              disabled={isLoading}
              helperText="Instructions will be sent if an account matches this address."
            />

            <div style={{ marginTop: '24px' }}>
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Sending instructions..."
              >
                Send reset link
              </PrimaryButton>
            </div>

            <div className="auth-switch-prompt">
              <span>Remember your password?</span>
              <Link to="/login" className="auth-switch-link">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
