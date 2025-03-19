import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  id?: string;
  email?: string;
  role?: string;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

// Note: Token generation and verification should be moved to the backend
// These functions should not be in the frontend for security reasons