import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Search, Mail, Building2, MoreVertical, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  getEmployeesApi,
  registerEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "@/services/api";

/* ================= Interface ================= */

export interface Employee {
  empId?: number;
  userId?: string;
  name: string;
  email: string;
  jobRole: string;
  skill: string;
  contactNumber?: string;
  hireDate?: string;
  status: "available" | "unavailable";
}

/* ================= Component ================= */

export default function EmployeesPage() {
  const { user } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [selectedPosition, setSelectedPosition] = useState("All Position");

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const emptyEmployee: Employee = {
    empId: undefined,
    userId: "",
    name: "",
    email: "",
    jobRole: "",
    skill: "",
    contactNumber: "",
    hireDate: "",
    status: "available",
  };

  const [form, setForm] = useState<Employee>(emptyEmployee);

  /* ================= Load Employees ================= */

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployeesApi();

      const mapped: Employee[] = (res.data ?? []).map((e: any) => ({
        empId: e.empId,
        userId: e.userId,
        name: e.name,
        email: e.email,
        jobRole: e.jobRole,
        skill: e.skill,
        contactNumber: e.contactNumber,
        hireDate: e.hireDate,
        status: "available",
      }));

      setEmployees(mapped);
    } catch (error) {
      console.error("Failed to load employees", error);
      setEmployees([]);
    }
  };

  /* ================= Dropdown Data ================= */

  const departments = useMemo(() => {
    return ["All Department", ...new Set(employees.map((e) => e.skill))];
  }, [employees]);

  const positions = useMemo(() => {
    return ["All Position", ...new Set(employees.map((e) => e.jobRole))];
  }, [employees]);

  /* ================= Filters ================= */

  const filteredEmployees = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.skill.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Department" || e.skill === selectedDepartment;

    const matchesPosition =
      selectedPosition === "All Position" || e.jobRole === selectedPosition;

    return matchesSearch && matchesDepartment && matchesPosition;
  });

  /* ================= Dashboard Stats ================= */

  const totalEmployees = filteredEmployees.length;
  const totalDepartments = new Set(filteredEmployees.map((e) => e.skill)).size;
  const averageTeam = Math.ceil(totalEmployees / (totalDepartments || 1));

  /* ================= Save Employee ================= */

  const saveEmployee = async () => {
    try {
      if (
        !form.empId ||
        !form.userId ||
        !form.name ||
        !form.email ||
        !form.jobRole ||
        !form.skill
      ) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        empId: form.empId,
        userId: form.userId,
        name: form.name,
        email: form.email,
        password: "123",
        jobRole: form.jobRole,
        skill: form.skill,
        contactNumber: form.contactNumber || "",
        hireDate: form.hireDate || null,
        experienceYear: 1,
        role: { roleId: 1 },
      };

      if (editingEmployee?.empId) {
        await updateEmployeeApi(editingEmployee.empId, payload);
      } else {
        await registerEmployeeApi(payload);
      }

      alert("✅ Employee saved successfully");
      setShowModal(false);
      setEditingEmployee(null);
      setForm(emptyEmployee);
      loadEmployees();
    } catch (err: any) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("❌ Failed to save employee. Check console.");
    }
  };

  /* ================= Delete ================= */

  const deleteEmployee = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete this employee?")) return;

    try {
      await deleteEmployeeApi(id);
      alert("🗑 Employee deleted");
      loadEmployees();
    } catch {
      alert("❌ Delete failed");
    }
  };

  /* ================= Edit ================= */

  const openEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm(emp);
    setShowModal(true);
  };

  /* ================= Guards ================= */

  if (user?.role === "staff") {
    return <Navigate to="/company" replace />;
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  /* ================= UI ================= */

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Employees</h1>

          <Button
            onClick={() => {
              setEditingEmployee(null);
              setForm(emptyEmployee);
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold">{totalEmployees}</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <p className="text-sm text-orange-600">Departments</p>
              <p className="text-3xl font-bold text-orange-600">
                {totalDepartments}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-600">Average Team</p>
              <p className="text-3xl font-bold text-blue-600">{averageTeam}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="border rounded-md px-3 py-2"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-2"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            {positions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Emp ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEmployees.map((e) => (
                  <TableRow key={e.empId}>
                    <TableCell className="font-medium">{e.empId}</TableCell>
                    <TableCell>{e.userId || "-"}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(e.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{e.name}</p>
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {e.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{e.jobRole}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {e.skill}
                      </div>
                    </TableCell>

                    <TableCell>{e.hireDate || "N/A"}</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(e)}>
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteEmployee(e.empId)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[520px] space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                >
                  <X />
                </Button>
              </div>

              <Input
                type="number"
                placeholder="Employee ID *"
                value={form.empId || ""}
                onChange={(e) =>
                  setForm({ ...form, empId: Number(e.target.value) })
                }
              />

              <Input
                placeholder="User ID *"
                value={form.userId || ""}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
              />

              <Input
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                placeholder="Phone"
                value={form.contactNumber || ""}
                onChange={(e) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
              />

              <Input
                placeholder="Position *"
                value={form.jobRole}
                onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
              />

              <Input
                placeholder="Department *"
                value={form.skill}
                onChange={(e) => setForm({ ...form, skill: e.target.value })}
              />

              <Input
                type="date"
                value={form.hireDate || ""}
                onChange={(e) => setForm({ ...form, hireDate: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>

                <Button onClick={saveEmployee}>
                  {editingEmployee ? "Update" : "Add Employee"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
