// backend/controllers/jogadorController.js
import {
  criarJogador,
  criarPontuacaoInicial,
  atualizarPontuacao,
  atualizarPontuacaoTotal,
  listarTop10,
} from "../models/jogadorModel.js";

// 🔹 Registra um jogador novo
export const registrarJogador = (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === "") {
    console.warn("⚠️ Nome do jogador não informado!");
    return res
      .status(400)
      .json({ erro: "O nome do jogador é obrigatório." });
  }

  console.log(`🧍 Criando jogador: ${nome}`);

  criarJogador(nome.trim(), (err, result) => {
    if (err) {
      console.error("💥 Erro ao criar jogador:", err);
      return res.status(500).json({ erro: err.message || err });
    }

    const id_jogador = result.insertId;
    console.log(`✅ Jogador criado com ID: ${id_jogador}`);

    // Cria a pontuação inicial
    criarPontuacaoInicial(id_jogador, (erro2) => {
      if (erro2) {
        console.error("💥 Erro ao criar pontuação inicial:", erro2);
        return res.status(500).json({ erro: erro2.message || erro2 });
      }

      console.log(`🏁 Pontuação inicial criada para o jogador ${id_jogador}`);
      res.status(201).json({ id_jogador, nome });
    });
  });
};

// 🔹 Atualiza a pontuação de uma fase e a pontuação total
export const salvarPontuacao = (req, res) => {
  let { id_jogador, campo, valor } = req.body;

  // 🔹 Corrige caso o campo venha duplicado (ex: "fase_fase_1")
  if (campo.startsWith("fase_fase_")) {
    campo = campo.replace("fase_fase_", "fase_");
  }


  console.log("📩 Requisição recebida para salvar pontuação:", req.body);

  if (!id_jogador || !campo || valor == null) {
    console.warn("⚠️ Dados inválidos recebidos:", req.body);
    return res
      .status(400)
      .json({ erro: "ID do jogador, campo e valor são obrigatórios." });
  }

  console.log(
    `🕹️ Atualizando pontuação: Jogador ${id_jogador}, Campo ${campo}, Valor ${valor}`
  );

  try {
    atualizarPontuacao(id_jogador, campo, valor, (err) => {
      if (err) {
        console.error("💥 Erro ao atualizar pontuação:", err);
        return res.status(500).json({ erro: err.message || err });
      }

      console.log("✅ Pontuação da fase atualizada com sucesso!");

      atualizarPontuacaoTotal(id_jogador, (erro2) => {
        if (erro2) {
          console.error("💥 Erro ao atualizar pontuação total:", erro2);
          return res.status(500).json({ erro: erro2.message || erro2 });
        }

        console.log("🏆 Pontuação total atualizada com sucesso!");
        res.json({ mensagem: "Pontuação atualizada com sucesso!" });
      });
    });
  } catch (error) {
    console.error("💥 Erro inesperado ao salvar pontuação:", error);
    res.status(500).json({ erro: "Erro interno ao salvar pontuação." });
  }
};

// 🔹 Retorna o ranking Top 10 geral
export const rankingTop10 = async (req, res) => {
  try {
    console.log('📊 Requisição recebida para buscar o ranking Top 10');
    const ranking = await listarTop10();
    res.status(200).json(ranking);
  } catch (error) {
    console.error('❌ Erro no controller ao buscar ranking:', error);
    res.status(500).json({ message: 'Erro ao carregar o ranking do servidor.' });
  }
};