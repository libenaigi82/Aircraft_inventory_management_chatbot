import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import aiRoutes from "./routes/ai.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        application: "Aero MRO AI",
        version: "1.0.0",
        status: "Running"
    });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

export default app;