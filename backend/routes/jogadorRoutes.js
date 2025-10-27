// backend/routes/jogadorRoutes.js
import express from "express";
import { registrarJogador, salvarPontuacao, rankingTop10 } from "../controllers/jogadorController.js";

const router = express.Router();

router.post("/registrar", registrarJogador); // cria o jogador com o nome
router.post("/pontuacao", salvarPontuacao); // atualiza pontuação das fases
router.get("/ranking", rankingTop10); // retorna o top 10 geral

export default router;
