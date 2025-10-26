import axios from "axios";

/**
 * API Client for Karedesk frontend.
 * Reads REACT_APP_API_BASE_URL from environment variables.
 * Provides typed wrapper functions for backend endpoints.
 */

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // You can add withCredentials here if the backend uses cookies/sessions
  // withCredentials: true,
});

// Interceptor example: normalize errors
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    // Attempt to extract a human-readable message
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected API error";
    return Promise.reject(new Error(message));
  }
);

/**
 * Helper to unwrap data payloads consistently
 */
function unwrap(response) {
  return response?.data;
}

// PUBLIC_INTERFACE
export async function getUsers(params = {}) {
  /** Fetch a list of users */
  const res = await api.get("/users", { params });
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function createUser(payload) {
  /** Create a new user */
  const res = await api.post("/users", payload);
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function getProjects(params = {}) {
  /** Fetch a list of projects */
  const res = await api.get("/projects", { params });
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function createProject(payload) {
  /** Create a new project */
  const res = await api.post("/projects", payload);
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function getTickets(params = {}) {
  /** Fetch a list of support tickets */
  const res = await api.get("/tickets", { params });
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function createTicket(payload) {
  /** Create a new support ticket */
  const res = await api.post("/tickets", payload);
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function updateTicketStatus(ticketId, status) {
  /**
   * Update status for a ticket
   * ticketId: string|number
   * status: string, e.g., 'open' | 'in_progress' | 'closed'
   */
  const res = await api.patch(`/tickets/${ticketId}/status`, { status });
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function getReputationSummary(params = {}) {
  /** Fetch digital reputation summary/metrics */
  const res = await api.get("/reputation/summary", { params });
  return unwrap(res);
}

// PUBLIC_INTERFACE
export async function createReputationRecord(payload) {
  /** Create a new reputation record/entry */
  const res = await api.post("/reputation", payload);
  return unwrap(res);
}

export default {
  getUsers,
  createUser,
  getProjects,
  createProject,
  getTickets,
  createTicket,
  updateTicketStatus,
  getReputationSummary,
  createReputationRecord,
};
