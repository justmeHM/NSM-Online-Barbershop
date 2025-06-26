"use client";

import { useState } from "react";

export default function ClientUserList({ users }: { users: any[] }) {
  const [allUsers, setAllUsers] = useState(users);

  async function deleteUser(id: string) {
    const res = await fetch(`/api/admin/delete-user/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAllUsers(allUsers.filter(user => user.id !== id));
    } else {
      alert("Failed to delete user.");
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      {allUsers.length === 0 && <p className="text-gray-500">No users found.</p>}
      {allUsers.map((user) => (
        <div key={user.id} className="flex justify-between items-center p-4 border rounded mb-2">
          <div>
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={() => deleteUser(user.id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
