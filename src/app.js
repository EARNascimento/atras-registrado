require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { fileURLToPath } = require('url');
const { initIGDB } = require('./services/igdb.js');
const gamesRouter = require('./routes/games.js');

//Camuflando a porta com o 'dotenv'.
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Agora qualquer arquivo no diretório `public` pode ser acessado.
app.use('/games', gamesRouter);

initIGDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}!`)
    });
}).catch(erro => {
    console.error("Falha fatal: não foi possível obter o token do IGDB.", erro)
});