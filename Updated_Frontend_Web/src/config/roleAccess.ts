const roleAccess: Record<string, string[]> = {
  ADMIN: [
    "/dashboard",
    "/projects",
    "/employees",
    "/inventory",
    "/tasks",
    "/about",
  ],
  MANAGER: ["/dashboard", "/projects", "/inventory", "/tasks", "/about"],
  STAFF: ["/dashboard", "/tasks", "/about"],
};

export default roleAccess;
