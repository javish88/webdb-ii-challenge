exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        { make: "Kia", model: "Forte", mileage: 200000 },
        { make: "Chevy", model: "Cobalt", mileage: 115000 },
        { make: "Chrysler", model: "Sebring", mileage: 185000 },
        { make: "Toyota", model: "Camry", mileage: 170000 },
        { make: "Yamaha", model: "YZF 600", mileage: 40000 }
      ]);
    });
};
