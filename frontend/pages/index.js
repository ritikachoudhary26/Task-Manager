import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Task Manager 🚀</h1>
        <p style={styles.subText}>
          Organize your tasks efficiently and boost your productivity.
        </p>

        <div style={styles.buttonGroup}>
          <Link href="/login" style={styles.loginBtn}>
            Login
          </Link>

          <Link href="/register" style={styles.registerBtn}>
            Register
          </Link>
        </div>
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
    textAlign: "center",
    width: "350px",
  },

  heading: {
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "bold",
  },

  subText: {
    marginBottom: "25px",
    color: "#555",
    fontSize: "14px",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },

  loginBtn: {
    flex: 1,
    marginRight: "10px",
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  registerBtn: {
    flex: 1,
    marginLeft: "10px",
    padding: "10px",
    background: "#764ba2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};