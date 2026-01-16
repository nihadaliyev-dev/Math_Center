// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// Load routes with error handling
let advertisementRouter, newsRouter, userRouter, documentRouter,
  researcherRouter, eventRouter, repositoryRouter, dashboardRouter;

try {
  advertisementRouter = require("./src/routes/AdvertisementRoute");
  newsRouter = require("./src/routes/NewsRoute");
  userRouter = require("./src/routes/AuthRoute");
  documentRouter = require("./src/routes/DocumentRoute");
  researcherRouter = require("./src/routes/ResearcherRoute");
  eventRouter = require("./src/routes/EventRoute");
  repositoryRouter = require("./src/routes/RepositoryRoute");
  dashboardRouter = require("./src/routes/DashboardRoute");
} catch (error) {
  console.error("❌ Error loading routes:", error);
  process.exit(1);
}

const app = express();
const errorHandler = require("./src/middlewares/errorHandler");
const i18n = require("./src/config/i18n");

//middleware
// CORS MUST be configured BEFORE body parsers
const allowedOrigins = [
  "http://localhost",
  "http://127.0.0.1",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://mrc.asoiu.edu.az",
  "https://mrc.asoiu.edu.az",
  process.env.FRONTEND_URL, // Add from environment variable
].filter(Boolean).filter(url => typeof url === 'string' && url.length > 0); // Remove undefined/null/empty values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Dynamic check for allowed origins
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed === origin) return true;
        // Check for exact match or subdomains if needed, but for now exact match or specific patterns
        return false;
      });

      if (isAllowed || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        // Strict production check
        const frontendUrl = process.env.FRONTEND_URL;
        // Allow if origin starts with frontend URL (handling trailing slashes etc)
        if (frontendUrl && origin.startsWith(frontendUrl.replace(/\/$/, ""))) {
          return callback(null, true);
        }

        // Also allow https version if http is configured or vice versa if needed, 
        // but strictly following the list is safer. 
        // Let's print what failed for easier debugging on server logs
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        callback(new Error(`CORS not allowed for origin: ${origin}`));
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

// Configure helmet with production-ready security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    // Content Security Policy - more restrictive in production
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for React
        styleSrc: ["'self'", "'unsafe-inline'"], // Needed for inline styles
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", (process.env.FRONTEND_URL && typeof process.env.FRONTEND_URL === 'string') ? process.env.FRONTEND_URL : "https://mrc.asoiu.edu.az"].filter(Boolean),
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.google.com"], // For Google Maps iframe
      },
    } : false, // Disable CSP in development
    // Additional security headers
    hsts: process.env.NODE_ENV === "production" ? {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    } : false,
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

app.use(i18n.init); // Add i18n middleware

// Validate routers before mounting
const routers = [
  { path: "/advertisements", router: advertisementRouter, name: "advertisementRouter" },
  { path: "/news", router: newsRouter, name: "newsRouter" },
  { path: "/auth", router: userRouter, name: "userRouter" },
  { path: "/documents", router: documentRouter, name: "documentRouter" },
  { path: "/researchers", router: researcherRouter, name: "researcherRouter" },
  { path: "/events", router: eventRouter, name: "eventRouter" },
  { path: "/repositories", router: repositoryRouter, name: "repositoryRouter" },
  { path: "/admin/dashboard", router: dashboardRouter, name: "dashboardRouter" },
];

routers.forEach(({ path, router, name }) => {
  if (!router) {
    console.error(`❌ Error: ${name} is not loaded properly`);
    process.exit(1);
  }
  try {
    app.use(path, router);
  } catch (error) {
    console.error(`❌ Error mounting route ${path}:`, error);
    process.exit(1);
  }
});

// API 404 Handlers - Must be before frontend routing
const apiRoutes = [
  "/advertisements", "/news", "/auth", "/documents",
  "/researchers", "/events", "/repositories", "/admin/dashboard"
];

apiRoutes.forEach(route => {
  app.use(route, (req, res) => {
    res.status(404).json({ success: false, message: `API Route not found: ${req.originalUrl}` });
  });
});


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
  // Use regex for wildcard matching in Express 5
  app.get(/(.*)/, (req, res, next) => {
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
