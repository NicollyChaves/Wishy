import db from "../models/db.js";

export const listarJogadores = (req, res) => {
    db.query("SELECT * FROM tb_jogadores ORDER BY pontuacao_total DESC LIMIT 10", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const adicionarJogador = (req, res) => {
    const { nome, fase1_pontuacao, fase2_pontuacao } = req.body;
    const query = `
    INSERT INTO tb_jogadores (nome, fase1_pontuacao, fase2_pontuacao)
    VALUES (?, ?, ?)
  `;
    db.query(query, [nome, fase1_pontuacao, fase2_pontuacao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Jogador adicionado com sucesso!" });
    });
};
