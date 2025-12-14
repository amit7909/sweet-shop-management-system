import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import SweetList from "../components/SweetList";
import SweetForm from "../components/SweetForm";

function DashboardPage({ user }) {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState(""); // 1) state for search

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSearch = async (e) => { // 2) search handler
    e.preventDefault();
    try {
      if (!search.trim()) {
        fetchSweets();
        return;
      }
      const res = await api.get(
        `/sweets/search?name=${encodeURIComponent(search)}`
      );
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  const handlePurchase = async (sweetId) => {
    try {
      await api.post(`/sweets/${sweetId}/purchase`);
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Purchase failed");
    }
  };

  const handleAddSweet = async (data) => {
    try {
      await api.post("/sweets", data);
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Add sweet failed (must be admin)");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* 3) search form inside return, above SweetList */}
      <form onSubmit={handleSearch} style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Search sweets by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            fetchSweets();
          }}
          style={{ marginLeft: "8px" }}
        >
          Clear
        </button>
      </form>

      <SweetList sweets={sweets} onPurchase={handlePurchase} />
      {user.role === "admin" && (
        <SweetForm onSubmit={handleAddSweet} />
      )}
    </div>
  );
}

export default DashboardPage;
