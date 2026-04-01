import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await api("/auth/register", "POST", form);

    if (res.msg) {
      alert("Registered successfully");
      router.push("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account ✨</h2>
        <p style={styles.subText}>Join us and manage your tasks</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center",
  },

  heading: {
    marginBottom: "5px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  subText: {
    marginBottom: "25px",
    color: "#666",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#764ba2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};