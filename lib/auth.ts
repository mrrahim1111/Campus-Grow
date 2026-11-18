// Client-side authentication & security service with Web Crypto API SHA-256 hashing,
// session management, rate-limiting, and brute-force protection.

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  branch?: string;
  year?: string;
  createdAt: string;
  isPro?: boolean;
}

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  expiresAt: number; // Unix timestamp
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: "Weak" | "Fair" | "Good" | "Strong" | "Excellent";
  color: string;
  feedback: string[];
}

const STORAGE_USERS = "campusgrow_users";
const STORAGE_SESSION = "campusgrow_session";
const STORAGE_FAILED_ATTEMPTS = "campusgrow_failed_logins";

// Helper: SHA-256 hashing using native browser Web Crypto API
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + ":" + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Generate secure cryptographic random salt
export function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Password strength evaluator
export function evaluatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push("Minimum 8 characters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("At least one uppercase letter (A-Z)");

  if (/[0-9]/.test(password)) score++;
  else feedback.push("At least one number (0-9)");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push("At least one special character (!@#$%^&*)");

  if (password.length >= 12 && score === 4) score = 5;

  switch (score) {
    case 0:
    case 1:
      return { score: 1, label: "Weak", color: "bg-red-500", feedback };
    case 2:
      return { score: 2, label: "Fair", color: "bg-amber-500", feedback };
    case 3:
      return { score: 3, label: "Good", color: "bg-blue-500", feedback };
    case 4:
      return { score: 4, label: "Strong", color: "bg-emerald-500", feedback };
    default:
      return { score: 5, label: "Excellent", color: "bg-purple-500", feedback: ["High entropy passphrase"] };
  }
}

// Brute-force protection: check rate limits
export function checkRateLimit(email: string): { locked: boolean; remainingSeconds: number } {
  if (typeof window === "undefined") return { locked: false, remainingSeconds: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_FAILED_ATTEMPTS);
    const data = raw ? JSON.parse(raw) : {};
    const entry = data[email.toLowerCase()];
    if (!entry) return { locked: false, remainingSeconds: 0 };

    const now = Date.now();
    if (entry.count >= 5) {
      const lockUntil = entry.lastAttempt + 60 * 1000; // 60s cooldown
      if (now < lockUntil) {
        const remaining = Math.ceil((lockUntil - now) / 1000);
        return { locked: true, remainingSeconds: remaining };
      }
    }
  } catch {
    /* ignore */
  }
  return { locked: false, remainingSeconds: 0 };
}

// Record failed login attempt
export function recordFailedAttempt(email: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_FAILED_ATTEMPTS);
    const data = raw ? JSON.parse(raw) : {};
    const key = email.toLowerCase();
    const prev = data[key] || { count: 0, lastAttempt: 0 };
    data[key] = {
      count: prev.count + 1,
      lastAttempt: Date.now(),
    };
    localStorage.setItem(STORAGE_FAILED_ATTEMPTS, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

// Clear failed attempts on successful login
export function resetFailedAttempts(email: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_FAILED_ATTEMPTS);
    if (!raw) return;
    const data = JSON.parse(raw);
    delete data[email.toLowerCase()];
    localStorage.setItem(STORAGE_FAILED_ATTEMPTS, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

// Fetch stored registered users
export function getRegisteredUsers(): UserAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save users
export function saveUsers(users: UserAccount[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

// Register user
export async function registerUser(params: {
  email: string;
  name: string;
  password: string;
  branch?: string;
  year?: string;
}): Promise<{ success: boolean; error?: string; user?: UserAccount }> {
  const users = getRegisteredUsers();
  const normalizedEmail = params.email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: "An account with this email already exists." };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(params.password, salt);

  const newUser: UserAccount = {
    id: "usr_" + Math.random().toString(36).substring(2, 9),
    email: normalizedEmail,
    name: params.name.trim(),
    passwordHash,
    salt,
    branch: params.branch || "Computer Science & Engineering",
    year: params.year || "3rd Year",
    createdAt: new Date().toISOString(),
    isPro: false,
  };

  users.push(newUser);
  saveUsers(users);

  // Auto sign-in
  createSession(newUser);
  return { success: true, user: newUser };
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: UserAccount; lockedSeconds?: number }> {
  const rateLimit = checkRateLimit(email);
  if (rateLimit.locked) {
    return {
      success: false,
      error: `Security lockout: Too many failed attempts. Try again in ${rateLimit.remainingSeconds} seconds.`,
      lockedSeconds: rateLimit.remainingSeconds,
    };
  }

  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    recordFailedAttempt(email);
    return { success: false, error: "Invalid email or password." };
  }

  const computedHash = await hashPassword(password, user.salt);
  if (computedHash !== user.passwordHash) {
    recordFailedAttempt(email);
    return { success: false, error: "Invalid email or password." };
  }

  resetFailedAttempts(email);
  createSession(user);
  return { success: true, user };
}

// Create authenticated session
export function createSession(user: UserAccount): AuthSession {
  const token = "tok_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  const session: AuthSession = {
    token,
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days validity
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    // Also synchronize with studentData for backwards compatibility
    const studentData = {
      name: user.name,
      email: user.email,
      branch: user.branch,
      year: user.year,
    };
    localStorage.setItem("studentData", JSON.stringify(studentData));
  }

  return session;
}

// Check current session
export function getActiveSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      logoutUser();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

// Get logged-in user details
export function getCurrentUser(): UserAccount | null {
  const session = getActiveSession();
  if (!session) return null;
  const users = getRegisteredUsers();
  const found = users.find((u) => u.id === session.userId || u.email.toLowerCase() === session.email.toLowerCase());
  if (found) return found;

  return null;
}

// Logout
export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_SESSION);
}
