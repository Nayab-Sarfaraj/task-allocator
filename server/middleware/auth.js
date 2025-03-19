import User from "../models/user.model.js";
import Errorhandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

/**
 * Middleware to check if a user is authenticated.
 * It verifies the token stored in cookies and retrieves user details.
 */
export const isAuthenticated = async function (req, res, next) {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    // If no token is found, the user is not logged in
    if (!token)
      return next(new Errorhandler("Please login to access resources", 401));

    // Verify the token and extract user ID
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decodedData.id);

    // If user does not exist, reject access
    if (!user) return next(new Errorhandler("You are not authorized", 401));

    // Attach the user object to the request for further use
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Invalid or expired token", 401));
  }
};

/**
 * Middleware to check if the user has admin privileges.
 * Only allows access if the user is an admin.
 */
export const AuthorizeRole = async function (req, res, next) {
  // Check if the user has admin privileges
  if (req.user.isAdmin) return next();

  // If not, reject access
  return next(
    new Errorhandler("You do not have permission to access this resource", 403)
  );
};
