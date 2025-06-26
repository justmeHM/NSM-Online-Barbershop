"use client";

import { useState } from "react";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  homePrice: number;
};

export default function AdminServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    homePrice: "",
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        body: JSON.stringify(newService),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setServices([data, ...services]);
        setNewService({ name: "", description: "", price: "", homePrice: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add New Service</h2>
        <Input
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService((s) => ({ ...s, name: e.target.value }))}
        />
        <Textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService((s) => ({ ...s, description: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="Shop Price"
          value={newService.price}
          onChange={(e) => setNewService((s) => ({ ...s, price: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="Home Price"
          value={newService.homePrice}
          onChange={(e) => setNewService((s) => ({ ...s, homePrice: e.target.value }))}
        />
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="mr-2 w-4 h-4" />}
          Add Service
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Services</h2>
        <ul className="space-y-4">
          {services.map((s) => (
            <li key={s.id} className="p-4 border rounded shadow-sm bg-white dark:bg-zinc-900 flex justify-between">
              <div>
                <div className="font-bold text-lg">{s.name}</div>
                <div className="text-sm text-gray-600">{s.description}</div>
                <div className="text-sm text-gray-600">
                  Shop: ZMW {s.price} — Home: ZMW {s.homePrice}
                </div>
              </div>
              <Button variant="destructive" onClick={() => handleDelete(s.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>

        <ul className="space-y-4">
  {services.map((s) => {
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({
      name: s.name,
      description: s.description,
      price: s.price.toString(),
      homePrice: s.homePrice.toString(),
    });

    const handleEdit = async () => {
      try {
        const res = await fetch(`/api/admin/services/${s.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        });

        const updated = await res.json();
        if (res.ok) {
          setServices((prev) =>
            prev.map((item) => (item.id === s.id ? updated : item))
          );
          setEditing(false);
        } else {
          alert("Failed to update service.");
        }
      } catch {
        alert("Update failed.");
      }
    };

    return (
      <li
        key={s.id}
        className="p-4 border rounded shadow-sm bg-white dark:bg-zinc-900"
      >
        {editing ? (
          <div className="space-y-2">
            <Input
              value={editForm.name}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Name"
            />
            <Textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Description"
            />
            <Input
              type="number"
              value={editForm.price}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, price: e.target.value }))
              }
              placeholder="Shop Price"
            />
            <Input
              type="number"
              value={editForm.homePrice}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, homePrice: e.target.value }))
              }
              placeholder="Home Price"
            />
            <div className="flex gap-2">
              <Button onClick={handleEdit} size="sm">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-lg">{s.name}</div>
              <div className="text-sm text-gray-600">{s.description}</div>
              <div className="text-sm text-gray-600">
                Shop: ZMW {s.price} — Home: ZMW {s.homePrice}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" onClick={() => setEditing(true)}>
                ✏️
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(s.id)}>
                🗑️
              </Button>
            </div>
          </div>
        )}
      </li>
    );
  })}
</ul>

      </div>
    </div>
  );
}
