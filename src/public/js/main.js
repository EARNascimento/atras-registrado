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
        containerResultados.innerHTML += `
            <div class="card">
                <img src="${jogo.cover ? 'https:' + jogo.cover.url : ''}" alt="${jogo.name}">
                <div class="card-body">
                    <h5 class="card-title">${jogo.name}</h5>
                    <button onclick="adicionarJogo(${jogo.id}, '${jogo.name}', '${jogo.cover ? 'https:' + jogo.cover.url : ''}')">
                        Adicionar ao Backlog
                    </button>
                </div>
            </div>
        `;
    });
}

async function carregarBacklog() {
    const response = await fetch('/games');
    const games = await response.json();

    containerBacklog.innerHTML = '';

    games.forEach(jogo => {
        const estrelas = '★'.repeat(jogo.rating) + '☆'.repeat(5 - jogo.rating);

        containerBacklog.innerHTML += `
            <div class="card">
                <img src="${jogo.cover ? 'https:' + jogo.cover.url : ''}" alt="${jogo.name}">
                <div class="card-body">
                    <h5 class="card-title">${jogo.name}</h5>
                    <p class="card-text">${estrelas}</p>
                    <button onclick="editarAvaliacao(${jogo.id})">Editar Avaliação</button>
                    <button onclick="removerJogo(${jogo.id})">Remover</button>
                </div>
            </div>
        `;
    });
}

function editarAvaliacao(id) {
    editJogoId.value = id;
    modalEditarNota.show();
}

carregarBacklog();