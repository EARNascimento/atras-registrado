const API_URL = '';

const inputBusca = document.getElementById('input-busca');
const btnBusca = document.getElementById('btn-busca');
const containerResultados = document.getElementById('resultados-busca')
const containerBacklog = document.getElementById('meu-backlog');

const modalEditarNota = new bootstrap.Modal(document.getElementById('modalEditarNota'));
const editJogoId = document.getElementById('edit-jogo-id');
const selectEditRating = document.getElementById('edit-jogo-rating');
const btnSalvarNota = document.getElementById('btn-salvar-nota');

async function buscarJogos(){
    const nomeDoJogo = inputBusca.value.trim();

    if (!nomeDoJogo) return;

    const response = await fetch(`/games/search/${nomeDoJogo}`);
    const resultados = await response.json();

    renderizarResultados(resultados);
}

btnBusca.addEventListener('click', buscarJogos);

inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarJogos();
});

function renderizarResultados(resultados) {
    containerResultados.innerHTML = '';

    resultados.forEach(jogo => {
        // Dentro do forEach da função renderizarResultados:
        const urlPronta = jogo.cover 
    ? 'https:' + jogo.cover.url.replace('t_thumb', 't_cover_big') 
    : '';

                containerResultados.innerHTML += `
            <div class="card" style="max-width: 180px;">
                <img src="${urlPronta}" alt="${jogo.name}" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
                <div class="card-body p-2">
                    <h6 class="card-title" style="font-size: 0.85rem;">${jogo.name}</h6>
                    <button class="btn btn-sm btn-outline-success" onclick="adicionarJogo(${jogo.id}, '${jogo.name.replace(/'/g, "\\'")}', '${urlPronta}')">
                        Adicionar ao Backlog
                    </button>
                </div>
            </div>
        `;
    });
}

async function carregarBacklog() {
    try {
        const response = await fetch(`${API_URL}/games`);
        const games = await response.json();

        // Limpa o container antes de renderizar
        containerBacklog.innerHTML = '';

        // Se não houver jogos, você pode colocar uma mensagem amigável
        if (games.length === 0) {
            containerBacklog.innerHTML = '<p class="text-muted text-center w-100">Nenhum jogo no seu backlog ainda.</p>';
            return;
        }

        games.forEach(jogo => {
            // Garante que a nota seja um número válido para não quebrar o .repeat()
            const nota = jogo.rating || 0;
            const estrelas = '★'.repeat(nota) + '☆'.repeat(5 - nota);

            // IMPORTANTE: Use as propriedades exatas que o seu servidor printou no console
            containerBacklog.innerHTML += `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${jogo.coverUrl || ''}" class="card-img-top" alt="${jogo.title || 'Jogo'}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${jogo.title || 'Sem título'}</h5>
                            <p class="card-text text-warning fs-5 mb-3">${estrelas}</p>
                            <div class="mt-auto d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary flex-grow-1" onclick="editarAvaliacao(${jogo.id})">Editar</button>
                                <button class="btn btn-sm btn-outline-danger" onclick="removerJogo(${jogo.id})">Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar o backlog visual:", error);
    }
}

function editarAvaliacao(id) {
    editJogoId.value = id;
    modalEditarNota.show();
}

async function adicionarJogo(id, title, coverUrl) {
    // Envia o formato final exato que o array do servidor armazena
    const jogoParaEnviar = {
        id: Number(id),
        title: title,
        coverUrl: coverUrl,
        rating: 0
    };

    await fetch('/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jogoParaEnviar)
    });

    carregarBacklog();
}

btnSalvarNota.addEventListener('click', async () => {
    const id = editJogoId.value;
    const rating = selectEditRating.value; // Corrigido de 'editJogoRating' para 'selectEditRating'

    await fetch(`/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: Number(rating) })
    });

    modalEditarNota.hide();
    carregarBacklog();
});

async function removerJogo(id) {
    await fetch(`/games/${id}`, {
        method: 'DELETE'
    });

    carregarBacklog();
}   

carregarBacklog();