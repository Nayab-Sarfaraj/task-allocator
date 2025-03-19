import User from "../models/user.model.js";
import Errorhandler from "../utils/errorHandler.js";
import saveToken from "../utils/jwtToken.js";

// Login function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password)
      return next(new Errorhandler("All fields are required", 401));

    // Find user by email and select password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new Errorhandler("Invalid Email or Password", 401));

    // Compare entered password
    const isMatching = await user.comparePassword(password);
    if (!isMatching)
      return next(new Errorhandler("Invalid Email or Password", 401));

    // Save authentication token and respond
    saveToken(user, res, 200);
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

// Retrieve all agents (users)
export const getAllAgent = async (req, res, next) => {
  try {
    const agents = await User.find({ isAdmin: false });
    return res.status(200).json({ success: true, agents });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

// Add a new agent
export const addAgent = async (req, res, next) => {
  try {
    let { name, password, phone, email, countryCode } = req.body;

    // Validate required fields
    if (!name || !password || !phone || !email || !countryCode)
      return next(new Errorhandler("All fields are required", 401));

    phone = Number(phone);

    // Validate phone number format
    if (Number.isNaN(phone))
      return next(new Errorhandler("Enter a valid phone number", 401));
    if (phone.toString().length < 10)
      return next(
        new Errorhandler("Phone number should be 10 digits long", 401)
      );

    // Validate password length
    if (password.length < 6)
      return next(
        new Errorhandler("Password should be at least 6 characters long", 401)
      );

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) return next(new Errorhandler("Email already exists", 401));

    // Create new user
    const newUser = await User.create({
      name,
      password,
      phone,
      email,
      countryCode,

      tasks: [],
    });

    return res.status(201).json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        countryCode: newUser.countryCode,
        isAdmin: newUser.isAdmin,
        tasks: newUser.tasks,
      },
    });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

// Get the profile of the authenticated user
export const getMyProfile = async (req, res, next) => {
  try {
    // Fetch user details using the authenticated user's ID
    const user = await User.findById(req.user._id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};
