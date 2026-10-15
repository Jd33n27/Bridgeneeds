import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { UserRole } from '../../pages/SignUpPage';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Input from '../../components/ui/Input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'At least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

interface AccountDetailsProps {
  role: UserRole;
  onComplete: () => void;
  onBack: () => void;
}

export default function AccountDetails({ role, onComplete, onBack }: AccountDetailsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('User signed up with:', data, 'Role:', role);
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="account-details">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
      </button>

      <div className="header">
        <h2>Account details</h2>
        <p>You're joining as {role === 'offer_services' ? 'someone offering services' : 'someone looking for talent'}.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input 
          label="Full name" 
          {...register('fullName')} 
          error={errors.fullName?.message}
        />
        
        <Input 
          label="Email address" 
          type="email"
          {...register('email')} 
          error={errors.email?.message}
        />

        <div className="password-group">
          <Input 
            label="Password" 
            type={showPassword ? 'text' : 'password'}
            {...register('password')} 
            error={errors.password?.message}
            hint="At least 8 characters"
            icon={
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <Input 
            label="Confirm password" 
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')} 
            error={errors.confirmPassword?.message}
            icon={
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="terms" required className="custom-checkbox" />
          <label htmlFor="terms">
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </label>
        </div>

        <PrimaryButton 
          type="submit" 
          disabled={isSubmitting}
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Creating your account...' : 'Create account'}
        </PrimaryButton>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <button type="button" className="google-button">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
      </form>

      <style>{`
        .account-details .back-button {
          margin-bottom: 32px;
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
        }
        .account-details .back-button:hover {
          color: var(--color-text);
        }
        .account-details .header {
          margin-bottom: 32px;
        }
        .account-details .header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .account-details .header p {
          color: var(--color-text-muted);
          font-size: 0.9375rem;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .password-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .password-toggle {
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .password-toggle:hover {
          color: var(--color-text);
        }
        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 4px;
        }
        .custom-checkbox {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          margin-top: 2px;
          cursor: pointer;
          position: relative;
          background-color: var(--color-surface);
        }
        .custom-checkbox:checked {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }
        .custom-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .checkbox-group label {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .checkbox-group a {
          color: var(--color-text);
          text-decoration: underline;
          font-weight: 500;
        }
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 16px 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--color-border);
        }
        .divider span {
          padding: 0 16px;
          color: var(--color-text-muted);
          font-size: 0.875rem;
        }
        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 24px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          font-weight: 500;
          font-size: 1rem;
          color: var(--color-text);
          transition: background var(--transition-fast);
        }
        .google-button:hover {
          background: var(--color-neutral-100);
        }
      `}</style>
    </div>
  );
}
