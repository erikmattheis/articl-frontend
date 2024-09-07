const express = require("express");
const path = require("path");
const app = express();

// Serve the static files from the .output/public or dist directory
app.use(express.static(path.join(__dirname, "/public")));

// For client-side routing, always send back index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
