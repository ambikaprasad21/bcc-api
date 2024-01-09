const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const schoolarshipRoute = require("./routes/schoolarshipRoute");
const notificationRoute = require("./routes/notificationRoute");
const breakingNewsRoute = require("./routes/breakingNewsRoute");
const jobRoute = require("./routes/jobRoute");
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
    origin: [
      "http://localhost:5173",
      "https://bcccafe.vercel.app",
      "https://bcc-frontend-kws7p360b-ambika-prasads-projects.vercel.app",
    ],
    // origin: "*",
  })
);
app.use(express.json());
// Disable caching
// app.use((req, res, next) => {
//   res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
//   next();
// });
// app.use("/", (req, res, next) => {
//   res.json({
//     status: "success",
//     msg: "testing api successfully",
//   });
// });
app.use("/api/v1/auth", authRoute);

app.use(
  "/api/v1/schoolarship",
  authenticationController.protect,
  schoolarshipRoute
);

app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/breaking/news", breakingNewsRoute);
app.use("/api/v1/job", jobRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middelware
app.use(globalErrorHandler);

module.exports = app;
