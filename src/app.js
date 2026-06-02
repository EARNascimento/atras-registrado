require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

//Camuflando a porta com o 'dotenv'.
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Agora qualquer arquivo no diretório `public` pode ser acessado.

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}!`)
});