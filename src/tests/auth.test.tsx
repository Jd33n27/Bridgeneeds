import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  getPasswordStrength,
} from '../lib/validation';
import { authService } from '../services/auth';
import BrandLogo from '../components/auth/BrandLogo';
import AccountTypeSelector from '../components/auth/AccountTypeSelector';
import PasswordField from '../components/auth/PasswordField';
import SignupPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

describe('Validation Unit Tests', () => {
  it('validates full name correctly', () => {
    expect(validateName('').isValid).toBe(false);
    expect(validateName(' ').isValid).toBe(false);
    expect(validateName('A').isValid).toBe(false);
    expect(validateName('Alex Rivers').isValid).toBe(true);
  });

  it('validates email addresses according to RFC rules', () => {
    expect(validateEmail('').isValid).toBe(false);
    expect(validateEmail('notanemail').isValid).toBe(false);
    expect(validateEmail('user@').isValid).toBe(false);
    expect(validateEmail('user@domain').isValid).toBe(false);
    expect(validateEmail('user@domain.com').isValid).toBe(true);
    expect(validateEmail('producer.sound@studio.co.uk').isValid).toBe(true);
  });

  it('validates password minimum 12 characters baseline', () => {
    expect(validatePassword('').isValid).toBe(false);
    expect(validatePassword('short123').isValid).toBe(false);
    expect(validatePassword('12345678901').isValid).toBe(false); // 11 chars
    expect(validatePassword('123456789012').isValid).toBe(true); // 12 chars
    expect(validatePassword('MyCreativePassword2026!').isValid).toBe(true);
  });

  it('validates password confirmation matching', () => {
    expect(validatePasswordConfirm('SecurePass1234', '').isValid).toBe(false);
    expect(validatePasswordConfirm('SecurePass1234', 'Mismatch1234').isValid).toBe(false);
    expect(validatePasswordConfirm('SecurePass1234', 'SecurePass1234').isValid).toBe(true);
  });

  it('evaluates password strength and feedback accurately', () => {
    const empty = getPasswordStrength('');
    expect(empty.score).toBe(0);
    expect(empty.label).toBe('Too short');

    const weak = getPasswordStrength('password');
    expect(weak.score).toBe(1);
    expect(weak.label).toBe('Weak');

    const fair = getPasswordStrength('pass1234');
    expect(fair.score).toBe(2);
    expect(fair.label).toBe('Fair');

    const good = getPasswordStrength('pass12345678');
    expect(good.score).toBe(3);
    expect(good.label).toBe('Good');

    const strong = getPasswordStrength('Creative#Beats$2026');
    expect(strong.score).toBe(4);
    expect(strong.label).toBe('Strong');
  });
});

describe('Authentication Service Adapter Tests', () => {
  beforeEach(async () => {
    await authService.signOut();
    sessionStorage.clear();
  });

  it('signs in with valid seeded demo credentials', async () => {
    const result = await authService.signIn({
      email: 'creator@bridgeneeds.com',
      password: 'Password1234!',
    });

    expect(result.success).toBe(true);
    expect(result.user?.email).toBe('creator@bridgeneeds.com');
    expect(result.user?.accountType).toBe('creative_professional');
    expect(authService.getSession()).not.toBeNull();
  });

  it('rejects invalid credentials with neutral security message', async () => {
    const result = await authService.signIn({
      email: 'creator@bridgeneeds.com',
      password: 'WrongPassword999!',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe(
      'Unable to sign in with those details. Check your email and password, then try again.'
    );
  });

  it('creates new account and prevents duplicate registration', async () => {
    const testEmail = `artist_${Date.now()}@bridgeneeds.test`;
    const signup = await authService.signUp({
      name: 'Elena Rostova',
      email: testEmail,
      password: 'MasteringPro2026!',
      accountType: 'creative_professional',
    });

    expect(signup.success).toBe(true);
    expect(signup.user?.name).toBe('Elena Rostova');

    // Attempting same email again should fail
    const duplicate = await authService.signUp({
      name: 'Elena Rostova',
      email: testEmail,
      password: 'MasteringPro2026!',
      accountType: 'creative_professional',
    });

    expect(duplicate.success).toBe(false);
    expect(duplicate.error).toContain('already exists');
  });

  it('enforces open redirect protection in sanitizeRedirectUrl', () => {
    expect(authService.sanitizeRedirectUrl('https://evil.com/hack', '/dashboard')).toBe('/dashboard');
    expect(authService.sanitizeRedirectUrl('//evil.com', '/dashboard')).toBe('/dashboard');
    expect(authService.sanitizeRedirectUrl('/dashboard/talent', '/dashboard')).toBe('/dashboard/talent');
  });
});

describe('BrandLogo & UI Components Tests', () => {
  it('renders BrandLogo with original geometric bridge symbol and uppercase wordmark', () => {
    render(<BrandLogo variant="dark" />);
    expect(screen.getByRole('banner', { name: 'BRIDGENEEDS' })).toBeInTheDocument();
    expect(screen.getByText('BRIDGE')).toBeInTheDocument();
    expect(screen.getByText('NEEDS')).toBeInTheDocument();
  });

  it('selects account type and handles keyboard interactions', () => {
    let selectedType = 'creative_professional' as any;
    const handleChange = (type: any) => {
      selectedType = type;
    };

    const { rerender } = render(
      <AccountTypeSelector value={selectedType} onChange={handleChange} />
    );

    const proRadio = screen.getByRole('radio', { name: /I'm a Creative Professional/i });
    const hireRadio = screen.getByRole('radio', { name: /I'm Hiring/i });

    expect(proRadio).toHaveAttribute('aria-checked', 'true');
    expect(hireRadio).toHaveAttribute('aria-checked', 'false');

    // Click to select hiring
    fireEvent.click(hireRadio);
    expect(selectedType).toBe('hiring_client');

    // Keyboard navigation (Arrow key)
    fireEvent.keyDown(hireRadio, { key: 'ArrowLeft' });
    expect(selectedType).toBe('creative_professional');
  });

  it('toggles password visibility with accessible button label', () => {
    const { container } = render(
      <PasswordField label="Password" id="test-password" value="Secret123" onChange={() => {}} />
    );
    
    const input = container.querySelector('#test-password') as HTMLInputElement;
    const toggleBtn = screen.getByRole('button', { name: /Show password/i });

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /Hide password/i })).toBeInTheDocument();
  });
});

describe('Page Integration Tests', () => {
  beforeEach(async () => {
    await authService.signOut();
  });

  it('renders SignupPage with form controls, terms link, and account type cards', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/signup']}>
        <SignupPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(container.querySelector('#signup-password')).toBeInTheDocument();
    expect(container.querySelector('#signup-confirm-password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Terms of Service/i).length).toBeGreaterThan(0);
  });

  it('renders LoginPage with credentials and forgot password link', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(container.querySelector('#login-password')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('renders ForgotPasswordPage and handles submission', async () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Reset your password/i })).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/Email address/i);
    const submitBtn = screen.getByRole('button', { name: /Send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'creator@bridgeneeds.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/If an account matches that email address, you'll receive instructions/i)
      ).toBeInTheDocument();
    });
  });
});
