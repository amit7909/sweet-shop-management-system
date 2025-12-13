import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import SweetList from "../components/SweetList";

function DashboardPage({ user }) {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Failed to create sweet (are you admin?)");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <SweetList sweets={sweets} />

      {user?.role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Admin: Add Sweet</h3>
          <form onSubmit={handleCreate}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            /><br/>
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            /><br/>
            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            /><br/>
            <input
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
            /><br/>
            <button type="submit">Create Sweet</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
