const express = require("express");
const app = express();
const router = express.Router();

//Criando um banco de dados falso, verificar se vamos utilizar uma base dados para buscar esses dados.
let games = [
    {id: 1, title: "test", platform: "pc", status: "Added", rating: 5, review: "A great game"}
];

//Rotas
//READ
app.get('/', (req, res) => {
    console.log(games); 
});

//CREATE
app.post()
//Exportando o roteador
module.exports = router;