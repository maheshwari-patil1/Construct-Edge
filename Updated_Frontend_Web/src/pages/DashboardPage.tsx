import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  Package,
  Clock,
  TrendingUp,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

import {
  getDashboardStatsApi,
  getProjectsApi,
  getTasksApi,
  getEmployeesApi,
} from "@/services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

/* ---------------- ANIMATIONS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();

  /* ---------------- STATE ---------------- */
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsRes, projRes, taskRes, empRes] = await Promise.all([
          getDashboardStatsApi(),
          getProjectsApi(),
          getTasksApi(),
          getEmployeesApi(),
        ]);

        setStats(statsRes.data ?? {});
        setProjects(projRes.data ?? []);
        setEmployees(empRes.data ?? []);

        // 🔥 TASK NORMALIZATION (SAFE)
        const normalizedTasks = (taskRes.data ?? []).map((t: any) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          priority: t.priority,
          projectName: t.project?.projectName,
          assigneeName: t.assignedEmployees?.[0]?.name || "Unassigned",
        }));

        setTasks(normalizedTasks);
      } catch (error) {
        console.error("Failed to load dashboard", error);
        setStats({});
        setProjects([]);
        setEmployees([]);
        setTasks([]);
      }
    }

    loadDashboard();
  }, []);

  /* ---------------- DERIVED DATA ---------------- */

  const recentTasks = tasks.slice(0, 5);

  const activeProjects = projects
    .filter((p) => p.status === "ACTIVE")
    .slice(0, 4);

  /* ---------------- PROJECT PROGRESS (EXACT) ---------------- */
  const projectProgressData = projects.map((p) => ({
    name:
      p.projectName.length > 14
        ? p.projectName.slice(0, 14) + "..."
        : p.projectName,
    progress: p.progress || 0,
  }));

  /* ---------------- TASK DISTRIBUTION (EXACT COLORS) ---------------- */
  const taskStatusData = [
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "TODO").length,
      color: "#f59e0b",
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "IN_PROGRESS").length,
      color: "#0ea5e9",
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "COMPLETED").length,
      color: "#22c55e",
    },
  ];

  /* ---------------- MONTHLY LINE CHART (STATIC FOR NOW) ---------------- */
  const monthlyProgressData = [
    { month: "Jul", planned: 15, completed: 12 },
    { month: "Aug", planned: 20, completed: 18 },
    { month: "Sep", planned: 22, completed: 22 },
    { month: "Oct", planned: 25, completed: 28 },
    { month: "Nov", planned: 28, completed: 24 },
    { month: "Dec", planned: 30, completed: 8 },
  ];

  /* ---------------- STAT CARDS ---------------- */
  const statCards = [
    {
      title: "Active Projects",
      value: stats?.activeProjects || 0,
      icon: FolderKanban,
      trend: "+2 this month",
      color: "bg-info",
    },
    {
      title: "Total Workforce",
      value: stats?.totalEmployees || 0,
      subValue: `${stats?.availableEmployees || 0} available`,
      icon: Users,
      color: "bg-success",
    },
    {
      title: "Low Stock Items",
      value: stats?.lowStockItems || 0,
      icon: Package,
      trend: "Needs attention",
      trendColor: "text-warning",
      color: "bg-warning",
    },
    {
      title: "Pending Tasks",
      value: stats?.pendingTasks || 0,
      icon: Clock,
      trend: `${stats?.completedTasksThisMonth || 0} completed`,
      color: "bg-accent",
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-green-500 text-white";
      case "MEDIUM":
        return "bg-yellow-400 text-black";
      case "LOW":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  /* ================= ADMIN DASHBOARD ================= */
  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your projects today.
          </p>
        </motion.div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card>
                <CardContent className="p-6 flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    {stat.subValue && (
                      <p className="text-sm mt-1">{stat.subValue}</p>
                    )}
                    {stat.trend && (
                      <p
                        className={`text-xs mt-2 ${
                          stat.trendColor || "text-success"
                        }`}
                      >
                        {stat.trend}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="text-white" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* PROJECT PROGRESS + TASK DISTRIBUTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PROJECT PROGRESS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-orange-500" />
                Project Progress
              </CardTitle>
              <CardDescription>
                Current progress of active projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectProgressData}
                    layout="vertical"
                    margin={{ left: 20, right: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={110} />
                    <Tooltip />
                    <Bar
                      dataKey="progress"
                      fill="#f97316"
                      radius={[0, 6, 6, 0]}
                      barSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* TASK DISTRIBUTION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="text-orange-500" />
                Task Distribution
              </CardTitle>
              <CardDescription>
                Overview of task statuses across all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {taskStatusData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MONTHLY LINE CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="text-orange-500" />
              Monthly Task Completion
            </CardTitle>
            <CardDescription>
              Comparison of planned vs completed tasks over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="planned" stroke="#6b7280" strokeWidth={2} />
                  <Line dataKey="completed" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ACTIVE PROJECTS + RECENT TASKS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ACTIVE PROJECTS */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Projects currently in progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.map((p) => (
                <div key={p.projectId} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{p.projectName}</h4>
                    <Badge variant="outline">
                      {p.manager?.name || "No Manager"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {p.location}
                  </p>

                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>

                  <Progress value={p.progress || 0} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* RECENT TASKS */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>
                Latest task updates across projects
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {recentTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium leading-tight">{t.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.projectName} • {t.assigneeName}
                    </p>
                  </div>

                  <Badge
                    className={`${getPriorityBadge(
                      t.priority,
                    )} shrink-0 capitalize`}
                  >
                    {t.priority.toLowerCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AppLayout>
  );
}
