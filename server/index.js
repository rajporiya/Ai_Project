import express from "express";
import dotenv from "dotenv";
import connectDb from "./utills/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors(
  {origin:"http://localhost:5173",
    credentials: true,
    methods:["GET", "POST","PUT","DELETE","OPTIONS"]
  }
))
// Allow OAuth popup windows to close without COOP blocking the window.closed call
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Examination Notes" });
});

// google auth route
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb()
});
