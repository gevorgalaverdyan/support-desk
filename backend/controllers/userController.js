const asyncHandler = require('express-async-handler');

// @desc register user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  res.send('register route');
});

// @desc login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.send('login route');
});

module.exports = {
  registerUser,
  loginUser,
};
