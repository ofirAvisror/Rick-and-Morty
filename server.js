import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route for homepage
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "public/html", "index.html"));
});

// Handle 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "not-found.html"));
});

// app.get("/contact", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, "public/html", "contact.html"));
// });

// app.get("/characters-list", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(
//     path.join(__dirname, "public/html/charters", "characters-list.html")
//   );
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
