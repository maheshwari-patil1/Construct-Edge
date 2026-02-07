import api from "./api";

// ===== ROLE =====
export const getRoles = () => api.get("/roles");
export const createRole = (data) => api.post("/roles", data);

// ===== EMPLOYEE =====
export const getEmployees = () => api.get("/employees");
export const createEmployee = (data) => api.post("/employees", data);

// ===== MANAGER =====
export const getManagers = () => api.get("/managers");
export const createManager = (data) => api.post("/managers", data);

// ===== MATERIAL =====
export const getMaterials = () => api.get("/materials");
export const createMaterial = (data) => api.post("/materials", data);

// ===== PROJECT =====
export const getProjects = () => api.get("/projects");
export const createProject = (data) => api.post("/projects", data);

// ===== CUSTOMER =====
export const getCustomers = () => api.get("/customers");
export const createCustomer = (data) => api.post("/customers", data);

// ===== ADMIN =====
export const getAdmins = () => api.get("/admins");
export const createAdmin = (data) => api.post("/admins", data);
