const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Department = require("../models/Department");

// GET /api/departments - Fetch unique departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({ code: 1 });

    res.json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
