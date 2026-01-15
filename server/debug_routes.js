const express = require('express');
const app = express();

const routes = [
  "./src/routes/AdvertisementRoute",
  "./src/routes/NewsRoute",
  "./src/routes/AuthRoute",
  "./src/routes/DocumentRoute",
  "./src/routes/ResearcherRoute",
  "./src/routes/EventRoute",
  "./src/routes/RepositoryRoute",
  "./src/routes/DashboardRoute"
];

console.log("🔍 Testing route loading...");

routes.forEach(routePath => {
  try {
    const router = require(routePath);
    app.use('/', router);
    console.log(`✅ Loaded ${routePath} successfully`);
  } catch (error) {
    console.error(`❌ FAILED to load ${routePath}`);
    console.error(error.message);
  }
});

console.log("🏁 Route testing complete");
