const express = require("express");
const app = express();
const router = express.Router();
const { initIGDB, searchGames } = require('../services/igdb');
//Criando um banco de dados falso, verificar se vamos utilizar uma base dados para buscar esses dados.
let games = [
    {id: 1, title: "test", platform: "pc", status: "Added", rating: 5, review: "A great game"}
];

initIGDB();

//Rotas
//READ

router.get("/search/:gameName", async(req, res) => {
    try{
        const { gameName } = req.params;
        const results = await searchGames(gameName);

        res.json(results);
    } catch(error){
        res.status(500).json({ erro: 'Erro ao buscar jogo', detalhe: error.message});
    }
});

app.get('/', (req, res) => {
    console.log(games); 
});

//CREATE
router.post("/", (req, res) => {
    res.status(201).json({ mensagem: "Rota POST pronta, lógica a implementar" });
});

//Exportando o roteador
module.exports = router;