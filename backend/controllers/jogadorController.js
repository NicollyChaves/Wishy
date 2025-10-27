// backend/controllers/jogadorController.js
import { criarJogador, criarPontuacaoInicial, atualizarPontuacao, atualizarPontuacaoTotal, listarTop10 } from "../models/jogadorModel.js";

// Registra um jogador novo
export const registrarJogador = (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json({ erro: "O nome do jogador é obrigatório." });
  }

  criarJogador(nome.trim(), (err, result) => {
    if (err) return res.status(500).json({ erro: err.message || err });

    const id_jogador = result.insertId;

    // Cria a pontuação inicial
    criarPontuacaoInicial(id_jogador, (erro2) => {
      if (erro2) return res.status(500).json({ erro: erro2.message || erro2 });

      res.status(201).json({ id_jogador, nome });
    });
  });
};

// Atualiza a pontuação de uma fase e a pontuação total
export const salvarPontuacao = (req, res) => {
  const { id_jogador, campo, valor } = req.body;

  if (!id_jogador || !campo || valor == null) {
    return res.status(400).json({ erro: "ID do jogador, campo e valor são obrigatórios." });
  }

  atualizarPontuacao(id_jogador, campo, valor, (err) => {
    if (err) return res.status(500).json({ erro: err.message || err });

    // Atualiza também a pontuação total
    atualizarPontuacaoTotal(id_jogador, (erro2) => {
      if (erro2) return res.status(500).json({ erro: erro2.message || erro2 });

      res.json({ mensagem: "Pontuação atualizada com sucesso!" });
    });
  });
};

// Retorna o ranking Top 10 geral
export const rankingTop10 = (req, res) => {
  listarTop10((err, resultados) => {
    if (err) return res.status(500).json({ erro: err.message || err });

    res.json(resultados);
  });
};
