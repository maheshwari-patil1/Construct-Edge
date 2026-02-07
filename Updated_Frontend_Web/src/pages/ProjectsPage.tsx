import { useEffect, useState } from "react";
import {
  getProjectsApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  getManagersApi,
} from "@/services/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ================= Interfaces ================= */

interface Manager {
  managerId: number;
  name: string;
}

interface Project {
  projectId?: number;
  projectName: string;
  description?: string;
  location?: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  manager: Manager | null;
}

/* ================= Component ================= */

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const emptyProject: Project = {
    projectName: "",
    description: "",
    location: "",
    status: "Planning",
    progress: 0,
    startDate: "",
    endDate: "",
    budget: 0,
    manager: null,
  };

  const [form, setForm] = useState<Project>(emptyProject);

  /* ================= Load Data ================= */

  useEffect(() => {
    loadProjects();
    loadManagers();
  }, []);

  const loadProjects = async () => {
    const res = await getProjectsApi();
    setProjects(res.data || []);
  };

  const loadManagers = async () => {
    const res = await getManagersApi();
    setManagers(res.data || []);
  };

  /* ================= Actions ================= */

  const openCreate = () => {
    setForm(emptyProject);
    setEditingProject(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm(p);
    setEditingProject(p);
    setShowForm(true);
  };

  const saveProject = async () => {
    try {
      if (!form.projectName) {
        alert("Project name required");
        return;
      }

      if (!form.manager) {
        alert("Please select a manager");
        return;
      }

      if (editingProject?.projectId) {
        await updateProjectApi(editingProject.projectId, form);
      } else {
        await createProjectApi(form);
      }

      setShowForm(false);
      setForm(emptyProject);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    }
  };

  const deleteProject = async (id?: number) => {
    if (!id) return;

    if (!confirm("Are you sure you want to delete this project?")) return;

    await deleteProjectApi(id);
    loadProjects();
  };

  /* ================= Filters ================= */

  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.projectName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;

    return matchSearch && matchStatus;
  });

  /* ================= UI ================= */

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={openCreate}>+ New Project</Button>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.projectId}
              className="border rounded-lg p-4 shadow hover:shadow-lg space-y-2"
            >
              <div className="flex justify-between">
                <h3 className="font-bold">{p.projectName}</h3>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => deleteProject(p.projectId)}
                >
                  Delete
                </button>
              </div>

              <p className="text-sm text-muted-foreground">
                📍 {p.location || "No location"}
              </p>

              <span className="inline-block bg-gray-200 text-xs px-2 py-1 rounded">
                {p.status}
              </span>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-orange-500 h-2 rounded"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              <p className="text-sm">Manager: {p.manager?.name || "N/A"}</p>
              <p className="text-sm">📅 Start: {p.startDate || "N/A"}</p>
              <p className="text-sm">🏁 End: {p.endDate || "N/A"}</p>

              <p className="text-sm font-medium">💰 Budget: ₹{p.budget}</p>

              <Button size="sm" onClick={() => openEdit(p)}>
                Edit
              </Button>
            </div>
          ))}
        </div>

        {/* ================= Modal ================= */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[520px] space-y-3">
              <h2 className="font-bold text-lg">
                {editingProject ? "Edit Project" : "Create Project"}
              </h2>

              <Input
                placeholder="Project Name"
                value={form.projectName}
                onChange={(e) =>
                  setForm({ ...form, projectName: e.target.value })
                }
              />

              {/* Description */}
              <textarea
                className="border rounded p-2 w-full"
                placeholder="Project description"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <Input
                placeholder="Location"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />

              <select
                className="border p-2 rounded w-full"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Planning</option>
                <option>Active</option>
                <option>Completed</option>
              </select>

              <select
                className="border p-2 rounded w-full"
                value={form.manager?.managerId || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    manager:
                      managers.find(
                        (m) => m.managerId === Number(e.target.value),
                      ) || null,
                  })
                }
              >
                <option value="">Select Manager</option>
                {managers.map((m) => (
                  <option key={m.managerId} value={m.managerId}>
                    {m.name}
                  </option>
                ))}
              </select>

              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />

              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />

              <Input
                type="number"
                placeholder="Enter Budget"
                value={form.budget || ""}
                onChange={(e) =>
                  setForm({ ...form, budget: Number(e.target.value) })
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProject}>Save</Button>
              </div>
            </div>
          </div>
        )}
        {/* ================= End Modal ================= */}
      </div>
    </AppLayout>
  );
}
