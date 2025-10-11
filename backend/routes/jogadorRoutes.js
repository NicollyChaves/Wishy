import express from "express";
import { listarJogadores, adicionarJogador } from "../controllers/jogadorController.js";

const router = express.Router();

router.get("/ranking", listarJogadores);
router.post("/add", adicionarJogador);

export default router;
