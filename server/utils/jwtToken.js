const saveToken = async function (user, res, status) {
  try {
    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true, // Secure from XSS attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // Required for cross-origin requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    });
    const { password, ...filteredUser } = { ...user._doc };

    return res.status(status).json({
      success: true,
      user: filteredUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    console.log("Error while generating the token");
  }
};

export default saveToken;
