import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // "login" or "register"

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMode("login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sweet Shop Management</h1>

      {user && (
        <div>
          <p>
            Logged in as: {user.name} ({user.role})
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {!user && (
        <div>
          <button onClick={() => setMode("login")}>Login</button>
          <button onClick={() => setMode("register")}>Register</button>
        </div>
      )}

      {!user ? (
        mode === "login" ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterPage onRegistered={() => setMode("login")} />
        )
      ) : (
        <DashboardPage user={user} />
      )}
    </div>
  );
}

export default App;
