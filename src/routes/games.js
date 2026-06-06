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
});

//Adiciona um jogo (Máx. 10)
router.post("/", (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            error: "O corpo da requisição não foi enviado."
        });
    }

    if (games.lenght >= 10) {
        return res.status(400).json({
            error : "Limite de 10 jogos atingido!"
        });
    }

    let URLdaCapa = '';
    if (req.body.cover && req.body.cover.url){
        URLdaCapa = `https:${req.body.cover.url}`;
    }

    const novoJogo = {
        id: req.body.id,
        title: req.body.name,
        coverUrl: URLdaCapa,
        rating: req.body.rating || 0
    };

    games.push(novoJogo);
    res.status(201).json(novoJogo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    games = games.filter(g => g.id != id);
    res.json({ message: "Jogo removido com sucesso"});
});

//Exportando o roteador
module.exports = router;