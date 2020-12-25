const router = require("express").Router();

router.route("/").get((req, res) => {
  console.log("Connection to the ./ route");
  res.status(400).json({
    displayAllUsers: "./users  (GET)",
    displayOneUser: "./users/:id  (GET)",
    addAUser: "./users/add  (POST)",
    modifyAUser: "./users/id (PUT)",
    deleteAUser: "./users/:id (DELETE)",
  });
});

module.exports = router;
