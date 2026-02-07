// Mock data for CONSTRUCT Edge

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  deadline: string;
  budget: number;
  spent: number;
  teamSize: number;
  location: string;
  description: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Site Manager' | 'Engineer' | 'Foreman' | 'Technician' | 'Laborer' | 'Admin';
  department: string;
  status: 'available' | 'assigned' | 'on-leave';
  phone: string;
  avatar?: string;
  projectId?: string;
  joinDate: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'materials' | 'equipment' | 'tools' | 'safety';
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  status: 'low' | 'sufficient' | 'overstock';
  location: string;
  lastRestocked: string;
  unitPrice: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assigneeId: string;
  assigneeName: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  dueDate: string;
  completedDate?: string;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Skyline Tower',
    client: 'Metro Development Corp',
    status: 'in-progress',
    progress: 68,
    startDate: '2024-01-15',
    deadline: '2025-06-30',
    budget: 12500000,
    spent: 8750000,
    teamSize: 45,
    location: 'Downtown Metro',
    description: 'A 35-story commercial tower with modern amenities'
  },
  {
    id: 'proj-002',
    name: 'Harbor Bridge Extension',
    client: 'City Infrastructure Dept',
    status: 'in-progress',
    progress: 42,
    startDate: '2024-03-01',
    deadline: '2025-12-15',
    budget: 28000000,
    spent: 11200000,
    teamSize: 78,
    location: 'Harbor District',
    description: 'Extension of the main harbor bridge with 4 additional lanes'
  },
  {
    id: 'proj-003',
    name: 'Green Valley Residences',
    client: 'Harmony Homes Ltd',
    status: 'planning',
    progress: 12,
    startDate: '2024-09-01',
    deadline: '2026-03-30',
    budget: 8500000,
    spent: 680000,
    teamSize: 15,
    location: 'Green Valley',
    description: 'Eco-friendly residential complex with 120 units'
  },
  {
    id: 'proj-004',
    name: 'Industrial Park Phase 2',
    client: 'TechZone Industries',
    status: 'in-progress',
    progress: 85,
    startDate: '2023-08-15',
    deadline: '2024-12-30',
    budget: 15000000,
    spent: 13500000,
    teamSize: 52,
    location: 'Industrial Zone East',
    description: 'Second phase of industrial warehouses and facilities'
  },
  {
    id: 'proj-005',
    name: 'City Hospital Renovation',
    client: 'Metro Health Authority',
    status: 'on-hold',
    progress: 35,
    startDate: '2024-02-01',
    deadline: '2025-08-15',
    budget: 6800000,
    spent: 2380000,
    teamSize: 28,
    location: 'Medical District',
    description: 'Complete renovation of the emergency wing'
  },
  {
    id: 'proj-006',
    name: 'Sunset Mall Complex',
    client: 'Retail Ventures Inc',
    status: 'completed',
    progress: 100,
    startDate: '2023-01-10',
    deadline: '2024-06-30',
    budget: 22000000,
    spent: 21500000,
    teamSize: 0,
    location: 'Sunset Boulevard',
    description: 'Large-scale shopping mall with entertainment zone'
  }
];

export const employees: Employee[] = [
  { id: 'emp-001', name: 'James Rodriguez', email: 'j.rodriguez@constructedge.com', role: 'Site Manager', department: 'Operations', status: 'assigned', phone: '+1 555-0101', projectId: 'proj-001', joinDate: '2020-03-15' },
  { id: 'emp-002', name: 'Sarah Chen', email: 's.chen@constructedge.com', role: 'Engineer', department: 'Engineering', status: 'assigned', phone: '+1 555-0102', projectId: 'proj-002', joinDate: '2021-06-20' },
  { id: 'emp-003', name: 'Michael Thompson', email: 'm.thompson@constructedge.com', role: 'Foreman', department: 'Operations', status: 'assigned', phone: '+1 555-0103', projectId: 'proj-001', joinDate: '2019-11-08' },
  { id: 'emp-004', name: 'Emily Davis', email: 'e.davis@constructedge.com', role: 'Engineer', department: 'Engineering', status: 'available', phone: '+1 555-0104', joinDate: '2022-01-10' },
  { id: 'emp-005', name: 'David Kim', email: 'd.kim@constructedge.com', role: 'Technician', department: 'Technical', status: 'assigned', phone: '+1 555-0105', projectId: 'proj-004', joinDate: '2021-09-25' },
  { id: 'emp-006', name: 'Lisa Martinez', email: 'l.martinez@constructedge.com', role: 'Admin', department: 'Administration', status: 'available', phone: '+1 555-0106', joinDate: '2020-07-14' },
  { id: 'emp-007', name: 'Robert Wilson', email: 'r.wilson@constructedge.com', role: 'Site Manager', department: 'Operations', status: 'assigned', phone: '+1 555-0107', projectId: 'proj-002', joinDate: '2018-04-22' },
  { id: 'emp-008', name: 'Jennifer Brown', email: 'j.brown@constructedge.com', role: 'Engineer', department: 'Engineering', status: 'on-leave', phone: '+1 555-0108', joinDate: '2022-08-30' },
  { id: 'emp-009', name: 'Carlos Garcia', email: 'c.garcia@constructedge.com', role: 'Foreman', department: 'Operations', status: 'assigned', phone: '+1 555-0109', projectId: 'proj-004', joinDate: '2019-05-17' },
  { id: 'emp-010', name: 'Amanda White', email: 'a.white@constructedge.com', role: 'Technician', department: 'Technical', status: 'available', phone: '+1 555-0110', joinDate: '2023-02-28' },
  { id: 'emp-011', name: 'Kevin Lee', email: 'k.lee@constructedge.com', role: 'Laborer', department: 'Operations', status: 'assigned', phone: '+1 555-0111', projectId: 'proj-001', joinDate: '2022-11-05' },
  { id: 'emp-012', name: 'Michelle Taylor', email: 'm.taylor@constructedge.com', role: 'Admin', department: 'Administration', status: 'available', phone: '+1 555-0112', joinDate: '2021-03-12' },
];

export const inventory: InventoryItem[] = [
  { id: 'inv-001', name: 'Portland Cement', category: 'materials', quantity: 450, unit: 'bags', minStock: 200, maxStock: 800, status: 'sufficient', location: 'Warehouse A', lastRestocked: '2024-11-15', unitPrice: 12 },
  { id: 'inv-002', name: 'Steel Rebar (12mm)', category: 'materials', quantity: 2500, unit: 'pieces', minStock: 1000, maxStock: 5000, status: 'sufficient', location: 'Warehouse B', lastRestocked: '2024-11-10', unitPrice: 8 },
  { id: 'inv-003', name: 'Excavator CAT 320', category: 'equipment', quantity: 3, unit: 'units', minStock: 2, maxStock: 5, status: 'sufficient', location: 'Equipment Yard', lastRestocked: '2024-06-01', unitPrice: 250000 },
  { id: 'inv-004', name: 'Concrete Mixer', category: 'equipment', quantity: 8, unit: 'units', minStock: 5, maxStock: 12, status: 'sufficient', location: 'Equipment Yard', lastRestocked: '2024-09-20', unitPrice: 15000 },
  { id: 'inv-005', name: 'Safety Helmets', category: 'safety', quantity: 45, unit: 'pieces', minStock: 100, maxStock: 250, status: 'low', location: 'Safety Storage', lastRestocked: '2024-10-05', unitPrice: 25 },
  { id: 'inv-006', name: 'Power Drill Set', category: 'tools', quantity: 24, unit: 'sets', minStock: 15, maxStock: 40, status: 'sufficient', location: 'Tool Room', lastRestocked: '2024-11-01', unitPrice: 180 },
  { id: 'inv-007', name: 'Sand (Fine)', category: 'materials', quantity: 180, unit: 'cubic meters', minStock: 100, maxStock: 300, status: 'sufficient', location: 'Material Yard', lastRestocked: '2024-11-18', unitPrice: 35 },
  { id: 'inv-008', name: 'Plywood Sheets', category: 'materials', quantity: 85, unit: 'sheets', minStock: 150, maxStock: 400, status: 'low', location: 'Warehouse A', lastRestocked: '2024-10-28', unitPrice: 45 },
  { id: 'inv-009', name: 'Welding Machine', category: 'equipment', quantity: 12, unit: 'units', minStock: 8, maxStock: 15, status: 'sufficient', location: 'Equipment Yard', lastRestocked: '2024-08-15', unitPrice: 2500 },
  { id: 'inv-010', name: 'Safety Vests', category: 'safety', quantity: 280, unit: 'pieces', minStock: 100, maxStock: 200, status: 'overstock', location: 'Safety Storage', lastRestocked: '2024-11-20', unitPrice: 15 },
  { id: 'inv-011', name: 'Scaffolding Sets', category: 'equipment', quantity: 35, unit: 'sets', minStock: 25, maxStock: 60, status: 'sufficient', location: 'Equipment Yard', lastRestocked: '2024-07-10', unitPrice: 800 },
  { id: 'inv-012', name: 'Measuring Tape', category: 'tools', quantity: 8, unit: 'pieces', minStock: 20, maxStock: 50, status: 'low', location: 'Tool Room', lastRestocked: '2024-09-15', unitPrice: 12 },
];

export const tasks: Task[] = [
  { id: 'task-001', title: 'Foundation Inspection', description: 'Complete inspection of foundation work on floors 1-5', projectId: 'proj-001', projectName: 'Skyline Tower', assigneeId: 'emp-001', assigneeName: 'James Rodriguez', status: 'completed', priority: 'high', startDate: '2024-11-18', dueDate: '2024-11-20', completedDate: '2024-11-19' },
  { id: 'task-002', title: 'Steel Frame Installation', description: 'Install steel framework for floors 20-25', projectId: 'proj-001', projectName: 'Skyline Tower', assigneeId: 'emp-003', assigneeName: 'Michael Thompson', status: 'in-progress', priority: 'critical', startDate: '2024-11-20', dueDate: '2024-12-15' },
  { id: 'task-003', title: 'Bridge Pillar Reinforcement', description: 'Reinforce main support pillars with additional rebar', projectId: 'proj-002', projectName: 'Harbor Bridge Extension', assigneeId: 'emp-002', assigneeName: 'Sarah Chen', status: 'in-progress', priority: 'critical', startDate: '2024-11-15', dueDate: '2024-12-01' },
  { id: 'task-004', title: 'Electrical Wiring Phase 1', description: 'Complete electrical wiring for warehouses 1-3', projectId: 'proj-004', projectName: 'Industrial Park Phase 2', assigneeId: 'emp-005', assigneeName: 'David Kim', status: 'in-progress', priority: 'high', startDate: '2024-11-10', dueDate: '2024-11-30' },
  { id: 'task-005', title: 'Site Survey', description: 'Conduct comprehensive site survey for new residential complex', projectId: 'proj-003', projectName: 'Green Valley Residences', assigneeId: 'emp-004', assigneeName: 'Emily Davis', status: 'pending', priority: 'medium', startDate: '2024-12-01', dueDate: '2024-12-10' },
  { id: 'task-006', title: 'Safety Equipment Audit', description: 'Audit all safety equipment across active sites', projectId: 'proj-001', projectName: 'Skyline Tower', assigneeId: 'emp-006', assigneeName: 'Lisa Martinez', status: 'pending', priority: 'medium', startDate: '2024-11-25', dueDate: '2024-11-28' },
  { id: 'task-007', title: 'Concrete Pouring - Deck Section', description: 'Pour and cure concrete for bridge deck section A', projectId: 'proj-002', projectName: 'Harbor Bridge Extension', assigneeId: 'emp-007', assigneeName: 'Robert Wilson', status: 'pending', priority: 'high', startDate: '2024-12-02', dueDate: '2024-12-08' },
  { id: 'task-008', title: 'HVAC Installation', description: 'Install HVAC systems in warehouse 4', projectId: 'proj-004', projectName: 'Industrial Park Phase 2', assigneeId: 'emp-009', assigneeName: 'Carlos Garcia', status: 'completed', priority: 'medium', startDate: '2024-11-01', dueDate: '2024-11-15', completedDate: '2024-11-14' },
  { id: 'task-009', title: 'Material Procurement', description: 'Order materials for upcoming phase of Green Valley project', projectId: 'proj-003', projectName: 'Green Valley Residences', assigneeId: 'emp-012', assigneeName: 'Michelle Taylor', status: 'in-progress', priority: 'low', startDate: '2024-11-20', dueDate: '2024-12-05' },
  { id: 'task-010', title: 'Quality Control Check', description: 'Perform quality control inspection on completed sections', projectId: 'proj-004', projectName: 'Industrial Park Phase 2', assigneeId: 'emp-002', assigneeName: 'Sarah Chen', status: 'pending', priority: 'high', startDate: '2024-11-28', dueDate: '2024-12-02' },
];

// Dashboard stats
export const dashboardStats = {
  activeProjects: projects.filter(p => p.status === 'in-progress').length,
  totalEmployees: employees.length,
  availableEmployees: employees.filter(e => e.status === 'available').length,
  lowStockItems: inventory.filter(i => i.status === 'low').length,
  pendingTasks: tasks.filter(t => t.status === 'pending').length,
  completedTasksThisMonth: tasks.filter(t => t.status === 'completed').length,
  totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
};

// Chart data
export const projectProgressData = projects.map(p => ({
  name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
  progress: p.progress,
  budget: p.budget / 1000000,
  spent: p.spent / 1000000,
}));

export const taskStatusData = [
  { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'hsl(38, 92%, 50%)' },
  { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'hsl(199, 89%, 48%)' },
  { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'hsl(142, 76%, 36%)' },
];

export const monthlyProgressData = [
  { month: 'Jul', completed: 12, planned: 15 },
  { month: 'Aug', completed: 18, planned: 20 },
  { month: 'Sep', completed: 22, planned: 22 },
  { month: 'Oct', completed: 28, planned: 25 },
  { month: 'Nov', completed: 24, planned: 28 },
  { month: 'Dec', completed: 8, planned: 30 },
];

// Company info for staff view
export const company = {
  name: 'CONSTRUCT Edge',
  address: '123 Builder Way, Construct City, CC 12345',
  phone: '+1 555-0000',
  email: 'contact@constructedge.com',
  established: '2010',
  description:
    'CONSTRUCT Edge is a leading construction solutions provider specializing in commercial and infrastructure projects across urban and regional areas.',
};
