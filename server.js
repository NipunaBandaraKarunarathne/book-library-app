// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json"); // your database
const middlewares = jsonServer.defaults();

// Default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Custom CORS + headers middleware
server.use((req, res, next) => {
  // Allow all origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow common headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Expose custom headers
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    return res.sendStatus(204); // No Content
  }

  next();
});

// Use default router
server.use(router);

// Start server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server running with middleware at http://localhost:${PORT}`);
});
