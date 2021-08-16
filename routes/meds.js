const express = require("express");
const medRoutes = express.Router();
const Medicines = require("../models/meds");

// GET meds
medRoutes.get("/", async (req, res) => {
  try {
    const medicines = await Medicines.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

// GET med/:id
medRoutes.get("/:id", getMedicine, async (req, res) => {
  res.json({ success: true, msg: res.medicine });
});

// POST med
medRoutes.post("/", async (req, res) => {
  const medicine = new Medicines({
    brandName: req.body.brandName,
    name: req.body.name,
    unit: req.body.unit,
    quantityAvailabe: req.body.quantityAvailabe,
    quantityImported: req.body.quantityImported,
  });

  try {
    const newMed = medicine.save();
    res.status(201).json({ success: true, msg: "Medicine added." });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

// PATCH med
medRoutes.patch("/:id", getMedicine, async (req, res) => {
  if (req.body.brandName != null) {
    res.medicine.brandName = req.body.brandName;
  }
  if (req.body.name != null) {
    res.medicine.name = req.body.name;
  }
  if (req.body.unit != null) {
    res.medicine.unit = req.body.unit;
  }
  if (req.body.quantityAvailabe != null) {
    res.medicine.quantityAvailabe = req.body.quantityAvailabe;
  }
  if (req.body.quantityImported != null) {
    res.medicine.quantityImported = req.body.quantityImported;
  }

  try {
    const updatedMed = await res.medicine.save();
    res.json({ success: true, msg: updatedMed });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

// DEL med
medRoutes.delete("/:id", getMedicine, async (req, res) => {
  try {
    await res.medicine.remove();
    res.json({ success: true, msg: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

// middlewere
async function getMedicine(req, res, next) {
  let medicine;
  try {
    medicine = await Medicines.findById(req.params.id);
    if (medicine == null) {
      return res
        .status(404)
        .json({ success: false, msg: "Medicine did not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
  res.medicine = medicine;
  next();
}

module.exports = medRoutes;
