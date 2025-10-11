import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jogadorRoutes from "./routes/jogadorRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jogadores", jogadorRoutes);

app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
});
