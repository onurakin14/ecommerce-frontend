import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB bağlantısı başarılı");
        app.listen(process.env.PORT, () =>
            console.log(`🚀 Server ${process.env.PORT} portunda çalışıyor`)
        );
    })
    .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));