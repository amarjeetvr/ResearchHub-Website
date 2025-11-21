/**
 * Project API Service
 * Handles project CRUD operations, bidding, and project management
 */

import { API_BASE_URL } from './config';

// Create a new project (Client only)
export const createProject = async (projectData: {
  title: string;
  introduction: string;
  detailedRequirements: string;
  skills: string[];
  deliverables: string;
  deadline: string;
  budgetMin: string;
  budgetMax: string;
  category?: string;
  files?: File[];
}) => {
  const formData = new FormData();
  
  formData.append('title', projectData.title);
  formData.append('introduction', projectData.introduction);
  formData.append('detailedRequirements', projectData.detailedRequirements);
  formData.append('skills', JSON.stringify(projectData.skills));
  formData.append('deliverables', projectData.deliverables);
  formData.append('deadline', projectData.deadline);
  formData.append('budgetMin', projectData.budgetMin);
  formData.append('budgetMax', projectData.budgetMax);
  if (projectData.category) {
    formData.append('category', projectData.category);
  }
  
  // Append files if any
  if (projectData.files && projectData.files.length > 0) {
    projectData.files.forEach((file) => {
      formData.append('files', file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/project/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create project');
  }
  
  return data;
};

// Get all projects (for freelancers - shows open projects)
export const getAllProjects = async (filters?: {
  status?: string;
  skills?: string;
  budgetMin?: string;
  budgetMax?: string;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
  }

  const response = await fetch(`${API_BASE_URL}/project/all?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch projects');
  }
  
  return data;
};

// Get client's own projects
export const getMyProjects = async (status?: string) => {
  const queryParams = status ? `?status=${status}` : '';
  
  const response = await fetch(`${API_BASE_URL}/project/my-projects${queryParams}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch your projects');
  }
  
  return data;
};

// Get project statistics for client dashboard
export const getProjectStats = async () => {
  const response = await fetch(`${API_BASE_URL}/project/stats`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch project stats');
  }
  
  return data;
};

// Get single project by ID
export const getProjectById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/project/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch project');
  }
  
  return data;
};

// Update project (Client only)
export const updateProject = async (id: string, updates: any) => {
  const response = await fetch(`${API_BASE_URL}/project/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updates),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update project');
  }
  
  return data;
};

// Delete project (Client only)
export const deleteProject = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/project/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete project');
  }
  
  return data;
};

// Submit bid on project (Freelancer only)
export const submitBid = async (projectId: string, bidData: {
  amount: number;
  proposal: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/bid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bidData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit bid');
  }
  
  return data;
};

// Accept bid on project (Client only)
export const acceptBid = async (projectId: string, bidId: string) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/bid/${bidId}/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to accept bid');
  }
  
  return data;
};

// Reject bid on project (Client only)
export const rejectBid = async (projectId: string, bidId: string) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/bid/${bidId}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to reject bid');
  }
  
  return data;
};
