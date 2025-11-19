const form = document.getElementById("form-jogo");
const gamesDiv = document.getElementById("games");

let games = JSON.parse(localStorage.getItem("games")) || [];


function salvar() {
    localStorage.setItem("games", JSON.stringify(games));
}

function render() {
    gamesDiv.innerHTML = "";

    games.forEach((game, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${game.capa}">
            <h3>${game.nome}</h3>
            <p>${game.genero} • ${game.categoria}</p>
            <small>${game.plataformas.join(", ")}</small><br>

            <button class="download">Baixar capa</button>
            <button class="delete-btn">Deletar</button>
        `;

        
        card.querySelector(".download").addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = game.capa;
            link.download = `${game.nome}.png`;
            link.click();
        });

        
        card.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm("Tem certeza que deseja excluir este jogo?")) {
                games.splice(index, 1);
                salvar();
                render();
            }
        });

        gamesDiv.appendChild(card);
    });
}

render();


form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const categoria = document.getElementById("categoria").value;
    const imagemURL = document.getElementById("imagem-url").value;

    /* ---- plataformas ---- */
    const checkboxInputs = document.querySelectorAll(".checkbox input");
    const plataformas = [...checkboxInputs]
        .filter(p => p.checked)
        .map(p => p.value);

    let capa = "";

    
    if (imagemURL.trim() !== "") {
        capa = imagemURL.trim();
        adicionar();
        return;
    }

    
    const file = document.getElementById("imagem").files[0];
    if (!file) {
        alert("Escolha uma imagem ou informe uma URL!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        capa = e.target.result;
        adicionar();
    };
    reader.readAsDataURL(file);

   
    function adicionar() {
        games.push({
            nome,
            genero,
            categoria,
            plataformas,
            capa
        });

        salvar();
        render();
        form.reset();
    }
});

