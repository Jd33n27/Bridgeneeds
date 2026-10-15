import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import PasswordField from '../components/auth/PasswordField';
import PrimaryButton from '../components/auth/PrimaryButton';
import FormStatusMessage from '../components/auth/FormStatusMessage';
import { validatePassword, validatePasswordConfirm } from '../lib/validation';
import { authService } from '../services/auth';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token') || '';
  const emailParam = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const isInvalidToken = !token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });

    const passRes = validatePassword(password);
    const confirmRes = validatePasswordConfirm(password, confirmPassword);

    if (!passRes.isValid) {
      setErrors((prev) => ({ ...prev, password: passRes.message }));
      passwordRef.current?.focus();
      return;
    }

    if (!confirmRes.isValid) {
      setErrors((prev) => ({ ...prev, confirmPassword: confirmRes.message }));
      confirmRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await authService.resetPassword(token, password);
      setIsLoading(false);

      if (!res.success) {
        setErrors({ form: res.error || 'Password reset failed. Please request a new link.' });
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Your password has been updated. Please sign in with your new password.' },
        });
      }, 2000);
    } catch {
      setIsLoading(false);
      setErrors({ form: 'A network error occurred. Please try again.' });
    }
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
          <h1 className="auth-form-title">Set new password</h1>
          <p className="auth-form-subtitle">
            {emailParam
              ? `Create a secure new password for ${emailParam}.`
              : 'Create a new, secure password for your BRIDGENEEDS account.'}
          </p>
        </div>

        {isInvalidToken ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <FormStatusMessage
              type="error"
              message="This password reset link is invalid, incomplete or has expired."
            />
            <p style={{ fontSize: '14px', color: 'var(--color-secondary-text)', marginBottom: '20px' }}>
              For your account security, password reset links expire after a short period.
            </p>
            <Link to="/forgot-password" className="btn-primary" style={{ textDecoration: 'none' }}>
              Request new reset link
            </Link>
          </div>
        ) : isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
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
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
              Password reset complete!
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--color-secondary-text)', marginTop: '8px' }}>
              Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <FormStatusMessage type="error" message={errors.form} />

            <PasswordField
              ref={passwordRef}
              label="New password"
              id="reset-password"
              autoComplete="new-password"
              placeholder="At least 12 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  const res = validatePassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: res.isValid ? undefined : res.message }));
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, password: true }));
                const res = validatePassword(password);
                setErrors((prev) => ({ ...prev, password: res.isValid ? undefined : res.message }));
              }}
              error={touched.password ? errors.password : undefined}
              showStrengthMeter
              required
              disabled={isLoading}
            />

            <PasswordField
              ref={confirmRef}
              label="Confirm new password"
              id="reset-confirm-password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (touched.confirmPassword) {
                  const res = validatePasswordConfirm(password, e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: res.isValid ? undefined : res.message,
                  }));
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, confirmPassword: true }));
                const res = validatePasswordConfirm(password, confirmPassword);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: res.isValid ? undefined : res.message,
                }));
              }}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              required
              disabled={isLoading}
            />

            <div style={{ marginTop: '24px' }}>
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Updating password..."
              >
                Reset password
              </PrimaryButton>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
