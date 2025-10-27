// backend/models/jogadorModel.js
import db from "./db.js";

// Cria um novo jogador
export const criarJogador = (nome, callback) => {
  const sql = "INSERT INTO tb_jogador (nome) VALUES (?)";
  db.query(sql, [nome], callback);
};

// Cria a pontuação inicial para um jogador
export const criarPontuacaoInicial = (id_jogador, callback) => {
  const sql = `
    INSERT INTO tb_pontuacao (
      id_jogador, fase_1, fase_2, fase_3, fase_4, fase_5, fase_6, fase_7, fase_oculta, pontuacao_total
    ) VALUES (?, 0,0,0,0,0,0,0,0,0)
  `;
  db.query(sql, [id_jogador], callback);
};

// Atualiza a pontuação de uma fase específica
export const atualizarPontuacao = (id_jogador, campo, valor, callback) => {
  const sql = `UPDATE tb_pontuacao SET ${campo} = ? WHERE id_jogador = ?`;
  db.query(sql, [valor, id_jogador], callback);
};

// Atualiza a pontuação total manualmente
export const atualizarPontuacaoTotal = (id_jogador, callback) => {
  const sql = `
    UPDATE tb_pontuacao
    SET pontuacao_total = 
      (fase_1 + fase_2 + fase_3 + fase_4 + fase_5 + fase_6 + fase_7 + fase_oculta)
    WHERE id_jogador = ?
  `;
  db.query(sql, [id_jogador], callback);
};

// Lista o Top 10 jogadores pelo total de pontuação
export const listarTop10 = (callback) => {
  const sql = `
    SELECT j.nome, p.pontuacao_total 
    FROM tb_jogador j
    JOIN tb_pontuacao p ON j.id_jogador = p.id_jogador
    ORDER BY p.pontuacao_total DESC
    LIMIT 10
  `;
  db.query(sql, callback);
};