import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ ADD THIS
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

// ---------- AUTH ----------
export const loginApi = (payload: {
  email: string;
  password: string;
  role: string;
}) => api.post("/api/auth/login", payload);

export const registerApi = (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => api.post("/api/auth/register", data);

export const sendOtpApi = (email: string) =>
  api.get(`/api/auth/send-otp?email=${email}`);

export const verifyOtpApi = (payload: { email: string; otp: string }) =>
  api.post("/api/auth/verify-otp", payload);

// ---------- DASHBOARD ----------
export const getDashboardStatsApi = () => api.get("/api/dashboard/stats");

// ---------- TASKS ----------
export const getTasksApi = () => api.get("/api/tasks");

// ---------- PROJECTS ----------
export const getProjectsApi = () => api.get("/api/projects");

export const createProjectApi = (payload: any) =>
  api.post("/api/projects", payload);

export const updateProjectApi = (id: number, payload: any) =>
  api.put(`/api/projects/${id}`, payload);

export const deleteProjectApi = (id: number) =>
  api.delete(`/api/projects/${id}`);

// ---------- EMPLOYEES ----------
export const getEmployeesApi = () => api.get("/api/employees");

export const registerEmployeeApi = (payload: any) =>
  api.post("/api/employees", payload);

export const updateEmployeeApi = (id: number, payload: any) =>
  api.put(`/api/employees/${id}`, payload);

export const deleteEmployeeApi = (id: number) =>
  api.delete(`/api/employees/${id}`);

// ---------- MANAGERS ----------
export const registerManagerApi = (payload: any) =>
  api.post("/api/managers", payload);

export const getManagersApi = () => api.get("/api/managers");

// ---------- INVENTORY ----------
export const getInventoryApi = () => api.get("/api/inventory");

export const createInventoryApi = (payload: any) =>
  api.post("/api/inventory", payload);

export const updateInventoryApi = (id: number, payload: any) =>
  api.put(`/api/inventory/${id}`, payload);

export const deleteInventoryApi = (id: number) =>
  api.delete(`/api/inventory/${id}`);

// ---------- COMPANY ----------

export const getCompanyStatsApi = () => api.get("/api/company/stats");
