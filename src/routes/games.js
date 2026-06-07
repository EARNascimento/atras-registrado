const express = require("express");
const app = express();
const router = express.Router();
const { initIGDB, searchGames } = require('../services/igdb');
//Criando um banco de dados falso, verificar se vamos utilizar uma base dados para buscar esses dados.
let games = [];

//initIGDB();

//Rotas
//Busca os jogos no IGDB
router.get("/search/:gameName", async(req, res) => {
    try{
        const { gameName } = req.params;
        const results = await searchGames(gameName);

        res.json(results);
    } catch(error){
        res.status(500).json({ erro: 'Erro ao buscar jogo', detalhe: error.message});
    }
});

// Lista todos os jogos adicionados
router.get('/', (req, res) => {
    console.log(games);
    res.json(games);
});

//Adiciona um jogo (Máx. 10)
router.post("/", (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            error: "O corpo da requisição não foi enviado."
        });
    }

    // 1. Corrigido de 'lenght' para 'length'
    if (games.length >= 10) {
        return res.status(400).json({
            error: "Limite de 10 jogos atingido!"
        });
    }

    // 2. Coleta os dados limpos que o front-end enviou via JSON.stringify
    const novoJogo = {
        id: Number(req.body.id),
        title: req.body.title,       // Sincronizado com o front
        coverUrl: req.body.coverUrl, // Sincronizado com o front
        rating: req.body.rating || 0
    };

    games.push(novoJogo);
    
    // Print de controle no terminal do Codespaces para checarmos o banco local
    console.log("Backlog Atualizado:", games); 

    res.status(201).json(novoJogo);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    const jogo = games.find(g => g.id == id);

    if (!jogo) {
        return res.status(404).json({ error: "Jogo não encontrado." });
    }

    jogo.rating = Number(rating);
    res.json(jogo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    games = games.filter(g => g.id != id);
    res.json({ message: "Jogo removido com sucesso"});
});

//Exportando o roteador
module.exports = router;