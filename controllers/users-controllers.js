const {validationResult}  = require('express-validator')
const HttpError = require("../models/http-error");

const uuid = require("uuid").v4;
const DUMMY_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "secret456",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    password: "secure789",
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "robertwilson@example.com",
    password: "letmein123",
  },
  {
    id: "5",
    name: "Emily Brown",
    email: "emilybrown@example.com",
    password: "myp@ssword",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //if fields are empty
    console.log(errors);
    throw new HttpError('Invalid inputs passed, Please check your data',422)
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user,Email already exists", 422);
    //422 for invalid user input
  }
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ createdUser: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong",
      401
    );
    //401 for unauthorised
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
