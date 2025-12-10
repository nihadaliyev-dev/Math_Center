const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const advertisementRouter = require("./src/routes/AdvertisementRoute");
const newsRouter = require("./src/routes/NewsRoute");
const userRouter = require("./src/routes/AuthRoute");
const documentRouter = require("./src/routes/DocumentRoute");
const researcherRouter = require("./src/routes/ResearcherRoute");
const eventRouter = require("./src/routes/EventRoute");
const repositoryRouter = require("./src/routes/RepositoryRoute");
const dashboardRouter = require("./src/routes/DashboardRoute");

const app = express();
const path = require("path");
const errorHandler = require("./src/middlewares/errorHandler");
const i18n = require("./src/config/i18n");

//middleware
// CORS MUST be configured BEFORE body parsers
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.FRONTEND_URL, // Add from environment variable
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV !== "production") {
          callback(null, true);
        } else {
          // In production, check if origin matches allowed patterns
          const frontendUrl = process.env.FRONTEND_URL;
          if (frontendUrl && origin.startsWith(frontendUrl.replace(/\/$/, ""))) {
            callback(null, true);
          } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
          }
        }
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "api-key",
      "X-Requested-With",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Serve static files from frontend build in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../front/dist");
  app.use(express.static(frontendPath));
}

// Configure helmet with less restrictive settings for development
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    contentSecurityPolicy: false, // Disable CSP in development to avoid issues
  })
);

app.use(i18n.init); // Add i18n middleware
app.use("/advertisements", advertisementRouter);
app.use("/news", newsRouter);
app.use("/auth", userRouter);
app.use("/documents", documentRouter);
app.use("/researchers", researcherRouter);
app.use("/events", eventRouter);
app.use("/repositories", repositoryRouter);
app.use("/admin/dashboard", dashboardRouter);

// Serve frontend in production, fallback to admin view in development
app.get("/", (_, res) => {
  if (process.env.NODE_ENV === "production") {
    const frontendIndex = path.join(__dirname, "../front/dist/index.html");
    res.sendFile(frontendIndex);
  } else {
    res.sendFile(path.join(__dirname, "src/views/index.html"));
  }
});

// Catch all routes for frontend SPA routing (must be after API routes)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res, next) => {
    // Don't serve frontend for API routes
    if (req.path.startsWith("/api") || 
        req.path.startsWith("/advertisements") ||
        req.path.startsWith("/news") ||
        req.path.startsWith("/auth") ||
        req.path.startsWith("/documents") ||
        req.path.startsWith("/researchers") ||
        req.path.startsWith("/events") ||
        req.path.startsWith("/repositories") ||
        req.path.startsWith("/admin") ||
        req.path.startsWith("/uploads")) {
      return next();
    }
    const frontendIndex = path.join(__dirname, "../front/dist/index.html");
    res.sendFile(frontendIndex);
  });
}

app.use(errorHandler);
module.exports = app;
