const express = require("express");
const {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweetController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getSweets);
router.get("/search", searchSweets);

// Protected (user must be logged in)
router.post("/:id/purchase", auth, purchaseSweet);

// Admin only
router.post("/", auth, isAdmin, createSweet);
router.put("/:id", auth, isAdmin, updateSweet);
router.delete("/:id", auth, isAdmin, deleteSweet);
router.post("/:id/restock", auth, isAdmin, restockSweet);

module.exports = router;
