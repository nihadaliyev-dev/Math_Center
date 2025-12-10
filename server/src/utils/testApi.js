const axios = require("axios");
require("dotenv").config();

// Configuration
const API_BASE_URL = "http://localhost:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin000@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

let authToken = null;

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// Helper function for logging
const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) =>
    console.log(`\n${colors.cyan}━━━ ${msg} ━━━${colors.reset}`),
};

// Helper function to make requests
const request = async (method, endpoint, data = null) => {
  const config = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  };

  if (data) {
    config.data = data;
  }

  return axios(config);
};

// Test functions
const tests = {
  // 1. Test Authentication
  async testAuth() {
    log.section("Testing Authentication");

    try {
      // Test login
      log.info("Testing login...");
      const response = await request("POST", "/auth/login", {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (response.data.success && response.data.token) {
        authToken = response.data.token;
        log.success("Login successful");
        log.info(`Token: ${authToken.substring(0, 20)}...`);
      } else {
        log.error("Login failed - no token received");
        return false;
      }

      // Test getting current user
      log.info("Testing /auth/me...");
      const meResponse = await request("GET", "/auth/me");
      if (meResponse.data.success) {
        log.success(`Got user data: ${meResponse.data.data.email}`);
      } else {
        log.error("Failed to get current user");
        return false;
      }

      return true;
    } catch (error) {
      log.error(`Auth test failed: ${error.message}`);
      return false;
    }
  },

  // 2. Test Dashboard Endpoints
  async testDashboard() {
    log.section("Testing Dashboard Endpoints");

    try {
      // Test stats
      log.info("Testing GET /admin/dashboard/stats...");
      const statsResponse = await request("GET", "/admin/dashboard/stats");
      if (statsResponse.data.success) {
        log.success(
          `Stats: ${statsResponse.data.data.totalDocuments} documents, ${statsResponse.data.data.totalUsers} users`
        );
      }

      // Test user data
      log.info("Testing GET /admin/dashboard/user-data...");
      const userDataResponse = await request(
        "GET",
        "/admin/dashboard/user-data"
      );
      if (userDataResponse.data.success) {
        log.success(`User data: ${userDataResponse.data.data.name}`);
      }

      // Test categories
      log.info("Testing GET /admin/dashboard/categories...");
      const categoriesResponse = await request(
        "GET",
        "/admin/dashboard/categories"
      );
      if (categoriesResponse.data.success) {
        log.success(`Categories: ${categoriesResponse.data.data.length} found`);
      }

      // Test time entries
      log.info("Testing GET /admin/dashboard/time-entries...");
      const today = new Date().toISOString().split("T")[0];
      const timeEntriesResponse = await request(
        "GET",
        `/admin/dashboard/time-entries?date=${today}`
      );
      if (timeEntriesResponse.data.success) {
        log.success(
          `Time entries: ${timeEntriesResponse.data.data.length} found`
        );
      }

      // Test notifications
      log.info("Testing GET /admin/dashboard/notifications...");
      const notificationsResponse = await request(
        "GET",
        "/admin/dashboard/notifications"
      );
      if (notificationsResponse.data.success) {
        log.success(
          `Notifications: ${notificationsResponse.data.data.length} found`
        );
      }

      return true;
    } catch (error) {
      log.error(`Dashboard test failed: ${error.message}`);
      return false;
    }
  },

  // 3. Test Document Endpoints
  async testDocuments() {
    log.section("Testing Document Endpoints");

    try {
      // Test get all documents
      log.info("Testing GET /documents...");
      const docsResponse = await request("GET", "/documents");
      if (docsResponse.data.success) {
        log.success(`Documents: ${docsResponse.data.data.length} found`);
      }

      // Test document stats
      log.info("Testing GET /documents/stats...");
      const statsResponse = await request("GET", "/documents/stats");
      if (statsResponse.data.success) {
        log.success(
          `Document stats: ${statsResponse.data.data.totalDocuments} total`
        );
      }

      // Test latest draft
      log.info("Testing GET /documents/latest-draft...");
      const draftResponse = await request("GET", "/documents/latest-draft");
      if (draftResponse.data.success) {
        log.success(
          `Latest draft: ${
            draftResponse.data.data ? draftResponse.data.data.name : "None"
          }`
        );
      }

      // Test search
      log.info("Testing GET /documents/search...");
      const searchResponse = await request("GET", "/documents/search?q=math");
      if (searchResponse.data.success) {
        log.success(`Search results: ${searchResponse.data.data.length} found`);
      }

      return true;
    } catch (error) {
      log.error(`Document test failed: ${error.message}`);
      return false;
    }
  },

  // 4. Test Researcher Endpoints
  async testResearchers() {
    log.section("Testing Researcher Endpoints");

    try {
      // Test get all researchers
      log.info("Testing GET /researchers...");
      const researchersResponse = await request("GET", "/researchers");
      if (researchersResponse.data.success) {
        log.success(
          `Researchers: ${researchersResponse.data.data.length} found`
        );
      }

      // Test leaderboard
      log.info("Testing GET /researchers/leaderboard...");
      const leaderboardResponse = await request(
        "GET",
        "/researchers/leaderboard?limit=5"
      );
      if (leaderboardResponse.data.success) {
        log.success(
          `Leaderboard: ${leaderboardResponse.data.data.length} entries`
        );
        if (leaderboardResponse.data.data.length > 0) {
          log.info(
            `Top researcher: ${leaderboardResponse.data.data[0].name} (${leaderboardResponse.data.data[0].documentsCount} contributions)`
          );
        }
      }

      // Test search
      log.info("Testing GET /researchers/search...");
      const searchResponse = await request("GET", "/researchers/search?q=Dr");
      if (searchResponse.data.success) {
        log.success(`Search results: ${searchResponse.data.data.length} found`);
      }

      return true;
    } catch (error) {
      log.error(`Researcher test failed: ${error.message}`);
      return false;
    }
  },

  // 5. Test Repository Endpoints
  async testRepositories() {
    log.section("Testing Repository Endpoints");

    try {
      // Test get all repositories
      log.info("Testing GET /repositories...");
      const reposResponse = await request("GET", "/repositories");
      if (reposResponse.data.success) {
        log.success(`Repositories: ${reposResponse.data.data.length} found`);
      }

      // Test user repositories
      log.info("Testing GET /repositories/user...");
      const userReposResponse = await request("GET", "/repositories/user");
      if (userReposResponse.data.success) {
        log.success(
          `User repositories: ${userReposResponse.data.data.length} found`
        );
      }

      return true;
    } catch (error) {
      log.error(`Repository test failed: ${error.message}`);
      return false;
    }
  },

  // 6. Test News Endpoints
  async testNews() {
    log.section("Testing News Endpoints");

    try {
      // Test get all news
      log.info("Testing GET /news...");
      const newsResponse = await request("GET", "/news");
      if (newsResponse.data.success) {
        log.success(`News: ${newsResponse.data.data.length} articles found`);
      }

      return true;
    } catch (error) {
      log.error(`News test failed: ${error.message}`);
      return false;
    }
  },

  // 7. Test Event Endpoints
  async testEvents() {
    log.section("Testing Event Endpoints");

    try {
      // Test get all events
      log.info("Testing GET /events...");
      const eventsResponse = await request("GET", "/events");
      if (eventsResponse.data.success) {
        log.success(`Events: ${eventsResponse.data.data.length} events found`);
      }

      return true;
    } catch (error) {
      log.error(`Event test failed: ${error.message}`);
      return false;
    }
  },
};

// Main test runner
async function runAllTests() {
  console.log(`${colors.yellow}
╔═══════════════════════════════════════════════╗
║   Mathematics Research Center - API Tests    ║
╚═══════════════════════════════════════════════╝${colors.reset}
  `);

  log.info(`Testing API at: ${API_BASE_URL}`);
  log.info(`Admin Email: ${ADMIN_EMAIL}`);
  log.info(`Make sure the server is running and database is seeded!\n`);

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
  };

  // Run all tests
  const testSuite = [
    { name: "Authentication", fn: tests.testAuth },
    { name: "Dashboard", fn: tests.testDashboard },
    { name: "Documents", fn: tests.testDocuments },
    { name: "Researchers", fn: tests.testResearchers },
    { name: "Repositories", fn: tests.testRepositories },
    { name: "News", fn: tests.testNews },
    { name: "Events", fn: tests.testEvents },
  ];

  for (const test of testSuite) {
    results.total++;
    const success = await test.fn();
    if (success) {
      results.passed++;
    } else {
      results.failed++;
      // If auth fails, stop testing
      if (test.name === "Authentication") {
        log.error("Authentication failed - stopping tests");
        break;
      }
    }
  }

  // Print summary
  console.log(`\n${colors.yellow}╔═════════════════════════════════════════╗`);
  console.log(`║           TEST SUMMARY                  ║`);
  console.log(`╚═════════════════════════════════════════╝${colors.reset}`);
  console.log(`Total Tests: ${results.total}`);
  console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);

  if (results.failed === 0) {
    console.log(
      `\n${colors.green}✓ All tests passed successfully!${colors.reset}\n`
    );
  } else {
    console.log(
      `\n${colors.red}✗ Some tests failed. Please check the logs above.${colors.reset}\n`
    );
  }

  process.exit(results.failed === 0 ? 0 : 1);
}

// Run tests
runAllTests().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
