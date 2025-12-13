import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <h1>Sweet Shop Management</h1>
      {user && (
        <div>
          <p>Logged in as: {user.name} ({user.role})</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!user ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DashboardPage user={user} />
      )}
    </div>
  );
}

export default App;
