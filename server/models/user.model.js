import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, length: 10 },
    password: { type: String, required: true, minLength: 6, select: false },
    countryCode: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    tasks: [
      {
        FirstName: String,
        Phone: String,
        Notes: String,
      },
    ],
  },
  { timestamps: true }
);

//  middleware to hash password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password isn't modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hashing the password

  next();
});

// Method to compare entered password with hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate a JWT token for user authentication
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "1d",
  });
};

const User = model("User", userSchema);
export default User;
