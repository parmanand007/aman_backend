import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";


dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Increase payload limit to prevent 413 errors
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatorbit-frontend.vercel.app"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   const distPath = path.join(__dirname, "../frontend/dist");

//   if (fs.existsSync(distPath)) {
//     app.use(express.static(distPath));

//     app.get("/*", (req, res) => {
//       res.sendFile(path.join(distPath, "index.html"));
//     });
//   } else {
//     console.warn("⚠️ Warning: 'frontend/dist' folder not found. Skipping static file serving.");
//   }
// }

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
