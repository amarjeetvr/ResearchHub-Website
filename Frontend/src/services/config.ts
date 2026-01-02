/**
 * API Configuration
 * Backend API Base URL and common settings
 */

// Use environment variable or fallback to production backend for deployment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://researchhub-backend-fiit.onrender.com/api/v1';

export const API_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
};
