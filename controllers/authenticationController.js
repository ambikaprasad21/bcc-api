const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.login = catchAsync(async (req, res, next) => {
  const user = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  };

  const secretKey = process.env.JWT_SECRET;

  const inputUsername = req.body.username;
  const inputPassword = req.body.password;

  if (user.username !== inputUsername || user.password !== inputPassword) {
    return res.status(404).json({
      status: "fail",
      body: {
        message: "Invalid username or password",
      },
    });
  } else {
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "None",
        secure: true,
        httpOnly: true,
      })
      .json({
        token,
        message: "Login successful",
      });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    const token = req.headers.Authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
      req.user = decoded;

      next();
    });
  } catch (err) {
    return next(new AppError("Some error occured please try again", 400));
  }

  // res.send({
  //   msg: "authentication",
  // });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.json({ message: "Logout successful" });
});
