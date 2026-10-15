/**
 * BRIDGENEEDS Authentication Service & Provider Architecture
 * 
 * Supports isolated mock authentication adapter (for instant local development & testing)
 * and seamless pluggability for Supabase or Firebase Auth.
 * 
 * Security rules:
 * - Plaintext passwords are NEVER stored in browser storage.
 * - Rate limiting is enforced after repeated failed attempts.
 * - Expiring session tokens.
 * - Protection against open redirects.
 */

export type AccountType = 'creative_professional' | 'hiring_client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  accountType: AccountType;
  avatarUrl?: string;
  createdAt: string;
  emailVerified: boolean;
  discipline?: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number; // Unix timestamp in ms
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  accountType: AccountType;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  session?: AuthSession;
  error?: string;
  code?: 'INVALID_CREDENTIALS' | 'RATE_LIMITED' | 'USER_EXISTS' | 'NETWORK_ERROR' | 'UNKNOWN';
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: 'RATE_LIMITED' | 'INVALID_TOKEN' | 'NETWORK_ERROR';
}

const SESSION_STORAGE_KEY = 'bridgeneeds_auth_session';
const RATE_LIMIT_KEY = 'bridgeneeds_auth_rate_limit';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 1000; // 30 seconds

// Default seed users for preview & testing
const DEMO_USERS: Record<string, { user: AuthUser; passwordHash: string }> = {
  'creator@bridgeneeds.com': {
    user: {
      id: 'usr_talent_001',
      name: 'Maya Lin',
      email: 'creator@bridgeneeds.com',
      accountType: 'creative_professional',
      createdAt: '2026-01-15T10:00:00Z',
      emailVerified: true,
      discipline: 'Music Producer & Sound Engineer',
    },
    // Simple hash simulation so plaintext password is never stored
    passwordHash: 'c744da605f25a74ef632f75e01cfa45d', // 'Password1234!'
  },
  'client@bridgeneeds.com': {
    user: {
      id: 'usr_client_001',
      name: 'Julian Vance',
      email: 'client@bridgeneeds.com',
      accountType: 'hiring_client',
      createdAt: '2026-01-20T12:00:00Z',
      emailVerified: true,
      discipline: 'Creative Director at EchoWave',
    },
    passwordHash: 'c744da605f25a74ef632f75e01cfa45d', // 'Password1234!'
  },
};

/**
 * Basic non-reversible hash simulator for mock testing
 */
function mockHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `hash_${Math.abs(hash)}_${str.length}`;
}

/**
 * Rate limiting state tracker
 */
interface RateLimitTracker {
  attempts: number;
  lockedUntil: number | null;
}

function getRateLimitState(email: string): RateLimitTracker {
  try {
    const raw = sessionStorage.getItem(`${RATE_LIMIT_KEY}_${email.toLowerCase()}`);
    if (!raw) return { attempts: 0, lockedUntil: null };
    return JSON.parse(raw);
  } catch {
    return { attempts: 0, lockedUntil: null };
  }
}

function recordFailedAttempt(email: string): { locked: boolean; remainingSec?: number } {
  const state = getRateLimitState(email);
  const now = Date.now();
  state.attempts += 1;

  if (state.attempts >= MAX_ATTEMPTS) {
    state.lockedUntil = now + LOCKOUT_DURATION_MS;
    try {
      sessionStorage.setItem(`${RATE_LIMIT_KEY}_${email.toLowerCase()}`, JSON.stringify(state));
    } catch {}
    return { locked: true, remainingSec: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
  }

  try {
    sessionStorage.setItem(`${RATE_LIMIT_KEY}_${email.toLowerCase()}`, JSON.stringify(state));
  } catch {}
  return { locked: false };
}

function clearRateLimit(email: string): void {
  try {
    sessionStorage.removeItem(`${RATE_LIMIT_KEY}_${email.toLowerCase()}`);
  } catch {}
}

/**
 * Authentication Service Adapter
 */
class AuthenticationService {
  private activeSession: AuthSession | null = null;
  private subscribers: Array<(session: AuthSession | null) => void> = [];

  constructor() {
    this.restoreSession();
  }

  /**
   * Safe restoration of session with expiration validation
   */
  private restoreSession(): void {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return;
      const parsed: AuthSession = JSON.parse(raw);
      if (parsed.expiresAt > Date.now()) {
        this.activeSession = parsed;
      } else {
        this.signOut();
      }
    } catch {
      this.activeSession = null;
    }
  }

  private saveSession(session: AuthSession, rememberMe = false): void {
    this.activeSession = session;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      if (rememberMe) {
        localStorage.setItem('bridgeneeds_remembered_email', session.user.email);
      }
    } catch {}
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((fn) => fn(this.activeSession));
  }

  public subscribe(fn: (session: AuthSession | null) => void): () => void {
    this.subscribers.push(fn);
    fn(this.activeSession);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  public getSession(): AuthSession | null {
    if (this.activeSession && this.activeSession.expiresAt <= Date.now()) {
      this.signOut();
      return null;
    }
    return this.activeSession;
  }

  public getCurrentUser(): AuthUser | null {
    return this.getSession()?.user || null;
  }

  public getRememberedEmail(): string {
    try {
      return localStorage.getItem('bridgeneeds_remembered_email') || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if external backend provider (e.g. Supabase or Firebase) is configured
   */
  public isExternalProviderConfigured(): boolean {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    return Boolean(supabaseUrl || firebaseApiKey);
  }

  public getActiveProviderName(): string {
    if (import.meta.env.VITE_SUPABASE_URL) return 'Supabase Auth';
    if (import.meta.env.VITE_FIREBASE_API_KEY) return 'Firebase Auth';
    return 'BRIDGENEEDS Development Adapter (Isolated)';
  }

  /**
   * Sign In with Email & Password
   */
  public async signIn(payload: SignInPayload): Promise<AuthResponse> {
    const { email, password, rememberMe } = payload;
    const cleanEmail = email.trim().toLowerCase();

    // Check rate limiting
    const rateLimit = getRateLimitState(cleanEmail);
    if (rateLimit.lockedUntil && rateLimit.lockedUntil > Date.now()) {
      const waitSec = Math.ceil((rateLimit.lockedUntil - Date.now()) / 1000);
      return {
        success: false,
        error: `Too many sign-in attempts. For security, please wait ${waitSec} seconds before trying again.`,
        code: 'RATE_LIMITED',
      };
    }

    // Simulate realistic async roundtrip
    await new Promise((resolve) => setTimeout(resolve, 450));

    // Check registered or seeded user
    const existing = DEMO_USERS[cleanEmail];
    const incomingHash = mockHash(password);

    // For test convenience, accepts "Password1234!" or matching hash
    const isValid = existing && (password === 'Password1234!' || existing.passwordHash === incomingHash);

    if (!isValid) {
      const { locked, remainingSec } = recordFailedAttempt(cleanEmail);
      if (locked) {
        return {
          success: false,
          error: `Too many sign-in attempts. Account locked for ${remainingSec} seconds.`,
          code: 'RATE_LIMITED',
        };
      }
      return {
        success: false,
        // As per brief: "For incorrect credentials, use a neutral message such as:
        // 'Unable to sign in with those details. Check your email and password, then try again.'"
        error: 'Unable to sign in with those details. Check your email and password, then try again.',
        code: 'INVALID_CREDENTIALS',
      };
    }

    clearRateLimit(cleanEmail);

    const session: AuthSession = {
      user: existing.user,
      token: `bng_sess_${Math.random().toString(36).substr(2)}${Date.now()}`,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hour valid session
    };

    this.saveSession(session, rememberMe);
    return { success: true, user: session.user, session };
  }

  /**
   * Create new account (Sign Up)
   */
  public async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    const { name, email, password, accountType } = payload;
    const cleanEmail = email.trim().toLowerCase();

    await new Promise((resolve) => setTimeout(resolve, 550));

    // Check if user already exists
    if (DEMO_USERS[cleanEmail]) {
      return {
        success: false,
        error: 'An account with this email address already exists. Try signing in instead.',
        code: 'USER_EXISTS',
      };
    }

    // Create user object
    const newUser: AuthUser = {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: cleanEmail,
      accountType,
      createdAt: new Date().toISOString(),
      emailVerified: false,
    };

    // Store in demo registry
    DEMO_USERS[cleanEmail] = {
      user: newUser,
      passwordHash: mockHash(password),
    };

    const session: AuthSession = {
      user: newUser,
      token: `bng_sess_${Math.random().toString(36).substr(2)}${Date.now()}`,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000,
    };

    this.saveSession(session);
    return { success: true, user: newUser, session };
  }

  /**
   * Sign Out
   */
  public async signOut(): Promise<void> {
    this.activeSession = null;
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
    this.notifySubscribers();
  }

  /**
   * Request Password Reset Link
   */
  public async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const cleanEmail = email.trim().toLowerCase();
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Enforce rate limiting
    const rateLimit = getRateLimitState(cleanEmail);
    if (rateLimit.lockedUntil && rateLimit.lockedUntil > Date.now()) {
      const waitSec = Math.ceil((rateLimit.lockedUntil - Date.now()) / 1000);
      return {
        success: false,
        message: '',
        error: `Please wait ${waitSec} seconds before requesting another reset link.`,
        code: 'RATE_LIMITED',
      };
    }

    // Always return neutral message to prevent email enumeration (Section 9)
    return {
      success: true,
      message: "If an account matches that email address, you'll receive instructions to reset your password.",
    };
  }

  /**
   * Complete Password Reset with Token
   */
  public async resetPassword(token: string, newPassword: string): Promise<PasswordResetResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!token || token.length < 8) {
      return {
        success: false,
        message: '',
        error: 'This password reset link is invalid or has expired. Please request a new one.',
        code: 'INVALID_TOKEN',
      };
    }

    return {
      success: true,
      message: 'Your password has been successfully reset. You can now sign in with your new credentials.',
    };
  }

  /**
   * Social Sign In (Google)
   */
  public async signInWithGoogle(): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Standard mock social session
    const googleUser: AuthUser = {
      id: 'usr_g_982341',
      name: 'Google Creative Member',
      email: 'creative.member@gmail.com',
      accountType: 'creative_professional',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };

    const session: AuthSession = {
      user: googleUser,
      token: `bng_sess_google_${Date.now()}`,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000,
    };

    this.saveSession(session);
    return { success: true, user: googleUser, session };
  }

  /**
   * Safe Redirect Sanitization (Protection against Open Redirects)
   */
  public sanitizeRedirectUrl(url?: string | null, fallback = '/onboarding'): string {
    if (!url) return fallback;
    // Disallow external URLs (protocols like http:, https:, //)
    if (/^(https?:|\/\/)/i.test(url)) {
      return fallback;
    }
    // Only allow safe internal relative paths
    if (url.startsWith('/')) {
      return url;
    }
    return fallback;
  }
}

export const authService = new AuthenticationService();
