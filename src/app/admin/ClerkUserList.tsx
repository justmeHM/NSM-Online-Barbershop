"use client";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: number | Date;
};

export default function ClerkUserList({ users }: { users: User[] }) {
  async function handleDelete(userId: string) {
    const res = await fetch(`/api/admin/clerk-user/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("User deleted. Refresh to update list.");
    } else {
      alert("Failed to delete user.");
    }
  }

  return (
    <div className="space-y-4">
      {users.length === 0 && (
        <p className="text-center text-gold-light italic">No users found.</p>
      )}

      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gold rounded-lg bg-[#121212] shadow-gold-glow"
        >
          <div className="mb-3 sm:mb-0">
            <p className="text-lg font-semibold text-gold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gold-light truncate max-w-xs">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => handleDelete(user.id)}
            className="self-stretch sm:self-auto bg-red-700 hover:bg-red-600 transition rounded-md px-4 py-2 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
