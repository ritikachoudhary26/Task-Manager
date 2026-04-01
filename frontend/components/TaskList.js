"use client";

export default function TaskList({ tasks, onDelete, onUpdate }) {
  if (!tasks.length) return <p style={styles.empty}>No tasks found 😔</p>;

  const getStatusColor = (status) => {
    if (status === "completed") return "#22c55e";
    if (status === "in-progress") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div>
      <h3 style={styles.heading}>📋 Your Tasks</h3>

      {tasks.map((task) => (
        <div key={task._id} style={styles.card}>
          
          {/* 🔷 Top Row */}
          <div style={styles.topRow}>
            <h4 style={styles.title}>{task.title}</h4>

            <span
              style={{
                ...styles.badge,
                backgroundColor: getStatusColor(task.status),
              }}
            >
              {task.status}
            </span>
          </div>

          {/* 📝 Description */}
          <p style={styles.description}>
            {task.description || "No description provided"}
          </p>

          {/* ⚙️ Actions */}
          <div style={styles.actions}>
            <button
              style={styles.editBtn}
              onClick={() => {
                const newTitle = prompt("New title:", task.title);
                const newDesc = prompt("New description:", task.description);
                const newStatus = prompt(
                  "New status (pending, in-progress, completed):",
                  task.status
                );

                if (newTitle && newDesc && newStatus) {
                  onUpdate(task._id, {
                    title: newTitle,
                    description: newDesc,
                    status: newStatus,
                  });
                }
              }}
            >
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => onDelete(task._id)}
            >
               Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: "15px",
    fontSize: "18px",
  },

  empty: {
    textAlign: "center",
    color: "#888",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },

  badge: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    textTransform: "capitalize",
  },

  description: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "15px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};