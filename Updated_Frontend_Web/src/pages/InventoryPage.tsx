import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  X,
  Package,
  MapPin,
  DollarSign,
  Layers,
  Hash,
} from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";

import {
  getInventoryApi,
  createInventoryApi,
  updateInventoryApi,
  deleteInventoryApi,
} from "@/services/api";

/* ================= Types ================= */

export interface InventoryItem {
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  unitPrice: number;
  minStock: number;
  maxStock: number;
}

/* ================= Component ================= */

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const emptyItem: InventoryItem = {
    name: "",
    description: "",
    quantity: 0,
    unit: "Pieces",
    category: "",
    location: "",
    unitPrice: 0,
    minStock: 0,
    maxStock: 0,
  };

  const [form, setForm] = useState<InventoryItem>(emptyItem);

  /* ================= Load ================= */

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const res = await getInventoryApi();
      setInventory(res.data ?? []);
    } catch (error) {
      console.error("Failed to load inventory", error);
      setInventory([]);
    }
  };

  /* ================= Save ================= */

  const saveItem = async () => {
    if (!form.name || !form.category || !form.quantity || !form.unitPrice) {
      alert("⚠ Please fill all required fields");
      return;
    }

    try {
      if (editingItem?.id) {
        await updateInventoryApi(editingItem.id, form);
        alert("✅ Inventory item updated");
      } else {
        await createInventoryApi(form);
        alert("✅ Inventory item added");
      }

      setShowModal(false);
      setEditingItem(null);
      setForm(emptyItem);
      loadInventory();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save inventory item");
    }
  };

  /* ================= Delete ================= */

  const deleteItem = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteInventoryApi(id);
      alert("🗑 Item deleted");
      loadInventory();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete item");
    }
  };

  /* ================= Filters ================= */

  const categories = [...new Set(inventory.map((i) => i.category))];

  const filtered = inventory.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || i.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  /* ================= Stats ================= */

  const totalItems = inventory.length;

  const totalValue = inventory.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0,
  );

  const averageValue = inventory.length
    ? Math.round(totalValue / inventory.length)
    : 0;

  /* ================= UI ================= */

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Inventory</h1>
            <p className="text-muted-foreground">
              Track materials, equipment, and supplies
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingItem(null);
              setForm(emptyItem);
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Dashboard Cards */}
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Items */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Items</p>
              <h2 className="text-2xl font-bold">{totalItems}</h2>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Categories</p>
              <h2 className="text-2xl font-bold">{categories.length}</h2>
            </CardContent>
          </Card>

          {/* Total Value */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <h2 className="text-2xl font-bold">
                ${totalValue.toLocaleString()}
              </h2>
            </CardContent>
          </Card>

          {/* Average Value */}
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Average Value</p>
              <h2 className="text-2xl font-bold">
                ${averageValue.toLocaleString()}
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Search items, categories, or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="border rounded px-3"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Min Stock</TableHead>
                  <TableHead>Max Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((i, index) => (
                  <TableRow key={i.id}>
                    {/* Serial Number */}
                    <TableCell className="text-muted-foreground font-medium">
                      {index + 1}
                    </TableCell>

                    {/* Item */}
                    <TableCell>
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {i.description}
                      </p>
                    </TableCell>

                    {/* Min Stock */}
                    <TableCell className="font-medium">{i.minStock}</TableCell>

                    {/* Max Stock */}
                    <TableCell className="font-medium">{i.maxStock}</TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge>{i.category}</Badge>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell>
                      {i.quantity} {i.unit}
                    </TableCell>

                    {/* Location */}
                    <TableCell>{i.location}</TableCell>

                    {/* Unit Price */}
                    <TableCell>${i.unitPrice}</TableCell>

                    {/* Total */}
                    <TableCell>${i.quantity * i.unitPrice}</TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingItem(i);
                              setForm(i);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteItem(i.id)}
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

        {/* MODAL (UI EXACT AS SCREENSHOT) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">
                    {editingItem ? "Edit Inventory Item" : "Add Inventory Item"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Add materials and equipment to your inventory
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowModal(false)}
                >
                  <X />
                </Button>
              </div>

              <label>Item Name *</label>
              <Input
                icon={Package}
                placeholder="e.g., Steel Beams"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Description</label>
              <Input
                placeholder="Describe the item..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Quantity *</label>
                  <Input
                    icon={Hash}
                    type="number"
                    placeholder="0"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label>Unit</label>
                  <Input
                    placeholder="Pieces"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Category *</label>
                  <Input
                    icon={Layers}
                    placeholder="e.g., Steel, Wood, Tools"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Location</label>
                  <Input
                    icon={MapPin}
                    placeholder="Warehouse location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Min Stock</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.minStock}
                    onChange={(e) =>
                      setForm({ ...form, minStock: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label>Max Stock</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.maxStock}
                    onChange={(e) =>
                      setForm({ ...form, maxStock: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <label>Cost Per Unit *</label>
              <Input
                icon={DollarSign}
                type="number"
                placeholder="$ 0.00"
                value={form.unitPrice}
                onChange={(e) =>
                  setForm({ ...form, unitPrice: Number(e.target.value) })
                }
              />

              <div className="flex justify-end gap-3 pt-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={saveItem}>
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
