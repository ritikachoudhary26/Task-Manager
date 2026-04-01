"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      let query = `?page=${page}&limit=${limit}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      if (searchQuery) query += `&search=${searchQuery}`;

      const res = await api(`/tasks${query}`);
      setTasks(res.tasks);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error("Fetch tasks failed:", err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, searchQuery]);

  const handleAdd = async (taskData) => {
    try {
      await api("/tasks", "POST", taskData);
      fetchTasks();
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await api(`/tasks/${id}`, "PUT", updatedData);
      fetchTasks();
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`/tasks/${id}`, "DELETE");
      fetchTasks();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        <h2 style={styles.heading}>Dashboard</h2>

        {/* Search + Filter */}
        <div style={styles.filterBox}>
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            style={styles.input}
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Add Task */}
        <div style={styles.card}>
          <TaskForm onAdd={handleAdd} />
        </div>

        {/* Task List */}
        <div style={styles.card}>
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            style={styles.button}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span style={styles.pageText}>
            Page {page} of {totalPages}
          </span>

          <button
            style={styles.button}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)", // same as home
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: "720px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },

  filterBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  card: {
    marginBottom: "20px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },

  button: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },

  pageText: {
    fontSize: "14px",
    color: "#555",
  },
};