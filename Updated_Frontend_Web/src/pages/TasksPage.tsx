import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  FolderKanban,
  MoreVertical,
  Clock,
  Timer,
  CheckCircle2,
  AlertCircle,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppLayout } from "@/components/layout/AppLayout";

/* ================= TYPES ================= */

interface Employee {
  empId: number;
  name: string;
}

interface Manager {
  managerId: number;
  name: string;
}

interface Project {
  projectId: number;
  projectName: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  projectId: number;
  projectName: string;
  managerId: number; // ✅ ADD THIS
  status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  assignedEmployees: Employee[];
}

/* ================= CONFIG ================= */

const statusConfig = {
  TODO: { label: "To Do", icon: Clock, color: "bg-orange-100 text-orange-700" },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Timer,
    color: "bg-blue-100 text-blue-700",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
  },
  BLOCKED: {
    label: "Blocked",
    icon: AlertCircle,
    color: "bg-red-100 text-red-700",
  },
};

// 🔥 DARK TAB COLORS (FIXED)
const tabColors: Record<string, string> = {
  all: "bg-orange-500 text-white",
  TODO: "bg-yellow-400 text-black",
  IN_PROGRESS: "bg-blue-500 text-white",
  COMPLETED: "bg-green-500 text-white",
  BLOCKED: "bg-red-500 text-white",
};

/* ================= COMPONENT ================= */

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [manager, setManager] = useState<Manager | null>(null);
  const [managers, setManagers] = useState<Manager[]>([]);

  const [activeTab, setActiveTab] = useState<"all" | Task["status"]>("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteItem, setDeleteItem] = useState<Task | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    managerId: "",
    employeeIds: [] as number[],
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
  });

  /* ================= API ================= */

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/tasks");
      const rawTasks = await res.json();

      const normalizedTasks: Task[] = (rawTasks ?? []).map((t: any) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        projectId: t.project?.projectId,
        projectName: t.project?.projectName,
        managerId: t.project?.manager?.managerId ?? 0,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        assignedEmployees: t.assignedEmployees || [],
      }));

      setTasks(normalizedTasks);
    } catch (error) {
      console.error("Failed to load tasks", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((r) => r.json())
      .then((d) => setEmployees(d ?? []));

    fetch("http://localhost:8080/api/managers")
      .then((r) => r.json())
      .then((d) => setManagers(d ?? []));

    fetch("http://localhost:8080/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d ?? []));

    fetchTasks();
  }, []);

  /* ================= STATS ================= */

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "TODO").length,
      inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
      completed: tasks.filter((t) => t.status === "COMPLETED").length,
      blocked: tasks.filter((t) => t.status === "BLOCKED").length,
    }),
    [tasks],
  );

  /* ================= FILTER ================= */

  const filteredTasks = tasks.filter((t) => {
    const matchesTab = activeTab === "all" || t.status === activeTab;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || t.priority === priorityFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesStatus && matchesPriority && matchesSearch;
  });

  /* ================= ACTIONS ================= */

  const saveTask = async () => {
    const method = editingTask ? "PUT" : "POST";
    const url = editingTask
      ? `http://localhost:8080/api/tasks/${editingTask.id}`
      : "http://localhost:8080/api/tasks";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        projectId: Number(form.projectId),
        managerId: Number(form.managerId),
        employeeIds: form.employeeIds,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate,
      }),
    });

    if (!res.ok) {
      toast.error("Failed to save task");
      return;
    }

    // ✅ reload FIRST
    await fetchTasks();

    toast.success(editingTask ? "Task updated" : "Task created");

    // ✅ then reset UI
    setShowModal(false);
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      projectId: "",
      managerId: "",
      employeeIds: [],
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
    });
    await fetchTasks(); // Reload tasks to reflect changes
  };

  const confirmDelete = async () => {
    await fetch(`http://localhost:8080/api/tasks/${deleteItem!.id}`, {
      method: "DELETE",
    });
    toast.success("Task deleted");
    setDeleteItem(null);
    fetchTasks();
  };

  /* ================= UI ================= */

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track task assignments
            </p>
          </div>

          {/* 🔥 FIXED NEW TASK BUTTON */}
          <Button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setManager(null);

              setForm({
                title: "",
                description: "",
                projectId: "",
                managerId: "",
                employeeIds: [],
                status: "TODO",
                priority: "MEDIUM",
                dueDate: "",
              });
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard title="Total Tasks" value={stats.total} bg="bg-white" />
          <StatCard title="To Do" value={stats.todo} bg="bg-orange-50" />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            bg="bg-blue-50"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            bg="bg-green-50"
          />
          <StatCard title="Blocked" value={stats.blocked} bg="bg-red-50" />
        </div>

        {/* STATUS TABS */}
        <div className="flex bg-gray-100 rounded-lg overflow-hidden">
          {["all", "TODO", "IN_PROGRESS", "COMPLETED", "BLOCKED"].map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setActiveTab(k as any)}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === k
                  ? tabColors[k]
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              {k === "all" ? "All" : statusConfig[k as Task["status"]].label}
            </button>
          ))}
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(statusConfig).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TASK LIST */}
        {filteredTasks.map((task) => {
          const cfg = statusConfig[task.status];
          const Icon = cfg.icon;

          return (
            <Card key={task.id}>
              <CardContent className="p-6 flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge className={cfg.color}>{cfg.label}</Badge>
                  </div>

                  <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FolderKanban className="w-4 h-4" />
                      {task.projectName}
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <Calendar className="w-4 h-4" />
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={async (e) => {
                        e.preventDefault();

                        setEditingTask(task);

                        // ✅ then set form with correct values
                        setForm({
                          title: task.title,
                          description: task.description,
                          projectId: String(task.projectId),
                          managerId: String(task.managerId), // ✅ FIX
                          employeeIds: task.assignedEmployees.map(
                            (e) => e.empId,
                          ),
                          status: task.status,
                          priority: task.priority,
                          dueDate: task.dueDate,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={(e) => {
                        e.preventDefault();
                        setDeleteItem(task);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          );
        })}

        {/* DELETE CONFIRM MODAL */}
        {deleteItem && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] space-y-4">
              <h3 className="text-lg font-semibold">Delete Task</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteItem.title}</strong>?
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDeleteItem(null)}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ADD / EDIT TASK MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] space-y-4 relative">
              {/* Close */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>

              <h2 className="text-xl font-bold">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h2>

              {/* TASK TITLE */}
              <div>
                <p className="text-sm font-medium">Task Title</p>
                <Input
                  placeholder="Task title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-sm font-medium">Description</p>
                <Input
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* PROJECT */}
              <div>
                <p className="text-sm font-medium">Project</p>

                <Select
                  value={form.projectId}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, projectId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project *" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.projectId} value={String(p.projectId)}>
                        {p.projectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* MANAGER */}
              <div>
                <p className="text-sm font-medium">Manager</p>

                <Select
                  value={form.managerId}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, managerId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager *" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((m) => (
                      <SelectItem key={m.managerId} value={String(m.managerId)}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* EMPLOYEES */}
              <div>
                <p className="text-sm font-medium">Employees</p>

                {/* ADD EMPLOYEE — ALWAYS ENABLED */}
                <Select
                  onValueChange={(value) => {
                    const empId = Number(value);

                    if (!form.employeeIds.includes(empId)) {
                      setForm((prev) => ({
                        ...prev,
                        employeeIds: [...prev.employeeIds, empId],
                      }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={!editingTask ? "Add employee" : undefined}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {employees
                      .filter((e) => !form.employeeIds.includes(e.empId))
                      .map((emp) => (
                        <SelectItem key={emp.empId} value={String(emp.empId)}>
                          {emp.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {/* SELECTED EMPLOYEES */}
                <div className="mt-2 space-y-1">
                  {form.employeeIds.map((id) => {
                    const emp = employees.find((e) => e.empId === id);
                    if (!emp) return null;

                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between border rounded px-2 py-1"
                      >
                        <span>{emp.name}</span>

                        {/* REMOVE — ALWAYS ENABLED */}
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              employeeIds: prev.employeeIds.filter(
                                (eid) => eid !== id,
                              ),
                            }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STATUS / PRIORITY / DUE DATE */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm({ ...form, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <Select
                    value={form.priority}
                    onValueChange={(v) => setForm({ ...form, priority: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({ ...form, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={saveTask}
                  disabled={!form.title || !form.projectId || !form.managerId}
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  bg,
}: {
  title: string;
  value: number;
  bg: string;
}) {
  return (
    <div className={`${bg} border rounded-xl p-5 shadow-sm`}>
      <p className="text-sm font-medium">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
