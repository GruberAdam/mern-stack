const router = require("express").Router();
const User = require("../models/user.model");

/* index user route (display every user) */
router.route("/").get((req, res) => {
  console.log("Connection to the /users route");
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) =>
      res.status(400).json("Error when displaying users: " + error)
    );
});

/* /add user route (adds a user to DB) */
router.route("/add").post((req, res) => {
  console.log("In the users/add route");

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.status(200).json("User added to database !"))
    .catch((error) =>
      res.status(400).json("Error when adding a user: " + error)
    );
});

/* /id user route (gets a user by ID) */
router.route("/:id").get((req, res) => {
  console.log("In the users/" + req.params.id + " get router");

  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(400).json("Error when display one user : " + err)
    );
});

/* /id user route (deletes a user by ID) */
router.route("/:id").delete((req, res) => {
  console.log("In the users/" + req.params.id + " delete router");

  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("User succesfully deleted"))
    .catch((err) =>
      res.status(400).json("Error when deleting a user : " + err)
    );
});

/* /id user route (updates a user by ID) */
router.route("/:id").put((req, res) => {
  console.log("In the users/" + req.params.id + " update router");

  const username = req.body.username;
  const age = req.body.age;
  const userUpdates = { username: username, age: age };

  User.findByIdAndUpdate(req.body.id, userUpdates)
    .then(() => res.status(200).json("User sucessfully updated"))
    .catch((err) => res.status(400).json("Error when updating a user :" + err));
});

module.exports = router;
