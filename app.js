const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const schoolarshipRoute = require("./routes/schoolarshipRoute");
const authenticationController = require("./controllers/authenticationController");
const authRoute = require("./routes/authRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.use(
  "/api/v1/schoolarship",
  authenticationController.protect,
  schoolarshipRoute
);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middelware
app.use(globalErrorHandler);

module.exports = app;
