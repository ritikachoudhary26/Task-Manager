import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title required");

    onAdd(form);
    setForm({ title: "", description: "", status: "pending" });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3 style={styles.heading}>Create Task</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Title */}
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              style={styles.input}
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={styles.textarea}
              placeholder="Enter task description"
            />
          </div>

          {/* Status */}
          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              style={styles.input}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" style={styles.button}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "5px",
    fontSize: "13px",
    color: "#555",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "none",
    fontSize: "14px",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};