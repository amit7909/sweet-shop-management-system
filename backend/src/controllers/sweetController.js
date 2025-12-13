const Sweet = require("../models/Sweet");

// POST /api/sweets  (admin)
exports.createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "Name, category, price, quantity are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl,
    });

    res.status(201).json({ message: "Sweet created", sweet });
  } catch (err) {
    console.error("Create sweet error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/sweets
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    console.error("Get sweets error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/sweets/search
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (err) {
    console.error("Search sweets error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/sweets/:id  (admin)
exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const sweet = await Sweet.findByIdAndUpdate(id, updates, { new: true });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet updated", sweet });
  } catch (err) {
    console.error("Update sweet error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/sweets/:id  (admin)
exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted" });
  } catch (err) {
    console.error("Delete sweet error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/sweets/:id/purchase
exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // quantity to purchase

    const qty = Number(quantity) || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    sweet.quantity -= qty;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (err) {
    console.error("Purchase sweet error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/sweets/:id/restock  (admin)
exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // quantity to add

    const qty = Number(quantity) || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += qty;
    await sweet.save();

    res.json({ message: "Restock successful", sweet });
  } catch (err) {
    console.error("Restock sweet error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
