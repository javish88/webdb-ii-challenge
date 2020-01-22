const express = require("express");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/car-dealer.db3"
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving cars" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ VIN: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("cars")
    .where({ VIN: req.params.id })
    .first()
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "No car found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error finding Car" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ VIN: id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Car has been updated" });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating car" });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ VIN: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: "The threat has been elimated sir" });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting car" });
    });
});

module.exports = router;
