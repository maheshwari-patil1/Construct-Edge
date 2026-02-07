const API_BASE_URL = "http://localhost:8080";

export const api = {
  // Admin
  getAdmins: () =>
    fetch(`${API_BASE_URL}/api/admins`).then((res) => res.json()),

  // Manager
  registerManager: (data: any) =>
    fetch(`${API_BASE_URL}/api/managers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  // Employee
  registerEmployee: (data: any) =>
    fetch(`${API_BASE_URL}/api/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  // Auth (you will implement backend later)
  login: (data: any) =>
    fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  sendOtp: (email: string) =>
    fetch(`${API_BASE_URL}/api/auth/send-otp?email=${email}`),

  verifyOtp: (data: any) =>
    fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
