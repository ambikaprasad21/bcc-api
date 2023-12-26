const express = require("express");
const morgan = require("morgan");
const schoolarshipRoute = require("./routes/schoolarshipRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/schoolarship", schoolarshipRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middelware
app.use(globalErrorHandler);

module.exports = app;
