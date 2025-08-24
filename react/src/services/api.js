import httpClient from './axiosInstance';

// Auth API
export const authAPI = {
  login: (credentials) => httpClient.post('/auth/login', credentials),
  logout: () => httpClient.post('/auth/logout'),
  me: () => httpClient.get('/auth/me'),
  register: (userData) => httpClient.post('/auth/register', userData),
};

// Tickets API
export const ticketsAPI = {
  getAll: () => httpClient.get('/tickets'),
  getById: (id) => httpClient.get(`/tickets/${id}`),
  create: (ticketData) => httpClient.post('/tickets', ticketData),
  update: (id, ticketData) => httpClient.put(`/tickets/${id}`, ticketData),
  delete: (id) => httpClient.delete(`/tickets/${id}`),
  getAssignedToMe: () => httpClient.get('/tickets/assigned-to-me'),
  setStatus: (id, status) => httpClient.put(`/tickets/${id}/status`, { status }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => httpClient.get('/categories'),
  getById: (id) => httpClient.get(`/categories/${id}`),
  getNameById: (id) => httpClient.get(`/categories/${id}/name`),
};

// Users API
export const usersAPI = {
  getAll: () => httpClient.get('/users'),
  getById: (id) => httpClient.get(`/users/${id}`),
  create: (userData) => httpClient.post('/users', userData),
  update: (id, userData) => httpClient.put(`/users/${id}`, userData),
  delete: (id) => httpClient.delete(`/users/${id}`),
};

// Responses API
export const responsesAPI = {
  getByTicketId: (ticketId) => httpClient.get(`/responses/ticket/${ticketId}`),
  create: (responseData) => httpClient.post('/responses', responseData),
  addToTicket: (ticketId, content) => 
    httpClient.post('/responses/addToTicket', { ticketId, content }),
};

export default {
  auth: authAPI,
  tickets: ticketsAPI,
  categories: categoriesAPI,
  users: usersAPI,
  responses: responsesAPI,
};
