// ── Custom Logger Middleware ───────────────────────────
// Displays request method, URL, and timestamp in terminal
// for every API request that hits the server
 
const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] METHOD: ${req.method} | URL: ${req.url}`);
  next(); // Pass control to the next middleware or route
};
 
module.exports = logger; 
