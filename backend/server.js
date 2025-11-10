import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jogadorRoutes from "./routes/jogadorRoutes.js";
import { rankingTop10 } from "./controllers/jogadorController.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 🔍 Middleware para mostrar todas as requisições recebidas
app.use((req, res, next) => {
    console.log(`📩 Requisição recebida: ${req.method} ${req.url}`);
    console.log("📦 Body recebido:", req.body);
    next();
});

// Rotas
app.use("/api/jogadores", jogadorRoutes);
app.get("/api/jogadores/ranking", rankingTop10);


const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
});
