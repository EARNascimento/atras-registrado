const axios = require('axios');
require('dotenv').config();

//URL que vai buscar o token
const tokenURL = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;

//

let token = null;

async function igdbToken(){
    try{
        const { data } = await axios.post(tokenURL);

        token = data.access_token;

        console.log("Token obtido com sucesso!");
        console.log(`Expira em:`, data.expires_in, `segundos`);

        return token;
    } catch (error){
        console.error("Erro ao buscar o token:", error.response?.data || error.message);
        throw error;
    }
}

let igdbAPI = null;

async function initIGDB(){
    const tokenObtido = await igdbToken();

    igdbAPI = axios.create({
        baseURL: `https://api.igdb.com/v4`,
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': `Bearer ${tokenObtido}`,
            'Accept': 'application/json', 
        },
    });

    console.log("IGDB API pronta!");
}

async function searchGames(gameName) {
    try{
        const query = `fields name, cover.url; search "${gameName}"; limit 10;`;

        const { data } = await igdbAPI.post('/games', query, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        return data;

    } catch(error){
        console.error('Erro ao buscar jogo:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    initIGDB,
    searchGames
};