// backend/teste.js
import db from "./models/db.js";
import dotenv from "dotenv";
dotenv.config();

// Função para testar cadastro de jogador
const testarCadastro = (nome) => {
  // 1️⃣ Insere na tabela de jogadores
  const sqlJogador = "INSERT INTO tb_jogador (nome) VALUES (?)";
  db.query(sqlJogador, [nome], (err, result) => {
    if (err) {
      console.error("Erro ao inserir jogador:", err);
      return db.end(); // fecha conexão
    }

    const id_jogador = result.insertId;
    console.log(`Jogador inserido com sucesso! ID: ${id_jogador}`);

    // 2️⃣ Insere na tabela de pontuação
    const sqlPontuacao = `
            INSERT INTO tb_pontuacao (
                id_jogador, fase_1, fase_2, fase_3, fase_4, fase_5, fase_6, fase_7, fase_oculta
            ) VALUES (?, 0,0,0,0,0,0,0,0)
        `;
    db.query(sqlPontuacao, [id_jogador], (err2, result2) => {
      if (err2) {
        console.error("Erro ao criar pontuação inicial:", err2);
      } else {
        console.log("Pontuação inicial criada com sucesso!");
      }

      db.end(); // fecha a conexão
    });
  });
};

// Troque o nome para testar
testarCadastro("JogadorTeste");
