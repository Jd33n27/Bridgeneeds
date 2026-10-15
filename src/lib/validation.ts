/**
 * BRIDGENEEDS Authentication Validation & Strength Utilities
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface PasswordStrengthResult {
  score: number; // 0 (empty), 1 (weak), 2 (fair), 3 (good), 4 (strong)
  label: 'Too short' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  hasLength: boolean;
  hasUpperLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hint?: string;
}

/**
 * Validate full name
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Enter your full name.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, message: 'Enter your full name.' };
  }
  return { isValid: true };
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Enter a valid email address.' };
  }
  // Standard RFC 5322 compliant regex for practical client validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: 'Enter a valid email address.' };
  }
  return { isValid: true };
}

/**
 * Validate password baseline requirement (minimum 12 characters as specified in brief)
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: 'Password is required.' };
  }
  if (password.length < 12) {
    return { isValid: false, message: 'Use at least 12 characters.' };
  }
  return { isValid: true };
}

/**
 * Validate password confirmation
 */
export function validatePasswordConfirm(password: string, confirm: string): ValidationResult {
  if (!confirm) {
    return { isValid: false, message: 'Please confirm your password.' };
  }
  if (password !== confirm) {
    return { isValid: false, message: "Your passwords don't match." };
  }
  return { isValid: true };
}

/**
 * Calculate password strength non-judgmentally
 */
export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      score: 0,
      label: 'Too short',
      color: '#8A94A6',
      hasLength: false,
      hasUpperLower: false,
      hasNumber: false,
      hasSpecial: false,
      hint: 'Use 12 or more characters for a secure account.',
    };
  }

  const hasLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpperLower = hasUpper && hasLower;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (password.length >= 8) score += 1;
  if (hasLength) score += 1;
  if (hasUpperLower) score += 1;
  if (hasNumber || hasSpecial) score += 1;

  // Map score to label
  let label: PasswordStrengthResult['label'] = 'Weak';
  let color = '#C62828'; // Error red
  let hint = 'Add more characters or mix in numbers and symbols.';

  if (score === 1) {
    label = 'Weak';
    color = '#C62828';
    hint = 'Password is too short. Use at least 12 characters.';
  } else if (score === 2) {
    label = 'Fair';
    color = '#946200'; // Warning amber
    hint = 'A good passphrase or adding symbols increases strength.';
  } else if (score === 3) {
    label = 'Good';
    color = '#2864E8'; // Primary blue
    hint = 'Good password. Almost optimal.';
  } else if (score >= 4) {
    label = 'Strong';
    color = '#16803D'; // Success green
    hint = 'Great password. Meets all security guidelines.';
  }

  return {
    score,
    label,
    color,
    hasLength,
    hasUpperLower,
    hasNumber,
    hasSpecial,
    hint,
  };
}
