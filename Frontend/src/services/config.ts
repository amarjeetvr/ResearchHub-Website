/**
 * API Configuration
 * Backend API Base URL and common settings
 */

export const API_BASE_URL = 'http://localhost:8000/api/v1';

export const API_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
};
