const router = require("express").Router();
const User = require("../models/user.model");
const { userValidation } = require("../validations/user.validation");
const bcrypt = require("bcrypt");

/* index user route (display every user) */
router.route("/").get((req, res) => {
  console.log("In the /users route");

  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) =>
      res.status(400).json(`Error when displaying all users: ${error}`)
    );
});

/* /add user route (adds a user to DB) */
router.route("/add").post(async (req, res) => {
  console.log("In the users/add route");

  const { error } = userValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let hashedPassword;

  await bcrypt
    .genSalt(10)
    .then(async (salt) => {
      hashedPassword = await bcrypt.hash(password, salt);
    })
    .catch((error) => console.log(`Error when gen a salt : ${error}`));

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then(() => res.status(200).json("User added to database !"))
    .catch((error) =>
      res.status(400).json(`Error when adding a user: ${error}`)
    );
});

/* /id user route (gets a user by ID) */
router.route("/:id").get((req, res) => {
  console.log(`In the users/${req.params.id} get router`);

  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(400).json(`Error when displaying one user : ${err}`)
    );
});

/* /id user route (deletes a user by ID) */
router.route("/:id").delete((req, res) => {
  console.log(`In the users/${req.params.id} delete router`);

  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("User succesfully deleted"))
    .catch((err) =>
      res.status(400).json(`Error when deleting a user : ${err}`)
    );
});

/* /id user route (updates a user by ID) */
router.route("/:id").put((req, res) => {
  console.log(`In the users/${req.params.id} update router`);

  const { error } = userValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const userUpdates = { username: newUsername, email: newEmail };

  User.findByIdAndUpdate({ _id: req.params.id }, userUpdates, {
    new: true,
    useFindAndModify: false,
  })
    .then(() => res.status(200).json("User succesfully updated"))
    .catch((err) =>
      res.status(400).json(`Error when updating one user : ${err}`)
    );
});

module.exports = router;
