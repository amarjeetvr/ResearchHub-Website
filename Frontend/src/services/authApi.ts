/**
 * Authentication API Service
 * Handles user registration, login, logout, and profile management
 */

import { API_BASE_URL } from './config';

// Register user
export const registerUser = async (userData: {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'client' | 'freelancer';
}) => {
  // Create FormData for multipart/form-data request (backend expects file upload)
  const formData = new FormData();
  formData.append('fullname', userData.fullname);
  formData.append('email', userData.email);
  formData.append('phoneNumber', userData.phoneNumber);
  formData.append('password', userData.password);
  formData.append('role', userData.role);

  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    credentials: 'include',
    body: formData, // Send as FormData instead of JSON
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

// Google signup
export const googleSignup = async (token: string, role: 'client' | 'freelancer') => {
  const response = await fetch(`${API_BASE_URL}/user/google-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ token, role }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Google signup failed');
  }
  
  return data;
};

// Logout user
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }
  
  return data;
};

// Update profile
export const updateProfile = async (profileData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/user/profile/update`, {
    method: 'POST',
    credentials: 'include',
    body: profileData, // FormData for file upload
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Profile update failed');
  }
  
  return data;
};

// Get current user from backend session
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }
  
  return data;
};

// Admin login
export const adminLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Admin login failed');
  }
  
  return data;
};

// Get Bank Account Details (Freelancer only)
export const getBankAccount = async () => {
  const response = await fetch(`${API_BASE_URL}/user/bank-account`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch bank account');
  }
  
  return data;
};

// Update Bank Account Details (Freelancer only)
export const updateBankAccount = async (bankData: {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  upiId: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/bank-account/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bankData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update bank account');
  }
  
  return data;
};
