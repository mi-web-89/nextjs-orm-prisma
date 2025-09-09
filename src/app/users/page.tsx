"use client";

import { UserProps } from "@/types";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users dari API
  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  // Submit form tambah user
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");
    fetchUsers(); // refresh list
  }

  // hapus user
  async function handleDelete(id: number) {
    await fetch(`api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Form tambah user */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>

      {/* List users */}
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
