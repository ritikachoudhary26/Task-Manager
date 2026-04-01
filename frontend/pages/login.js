import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api("/auth/login", "POST", form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        router.push("/dashboard");
      } else {
        setError(res.msg || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subText}>Login to manage your tasks</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            name="email"
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
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
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
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  error: {
    marginTop: "15px",
    color: "red",
    fontSize: "13px",
  },
};