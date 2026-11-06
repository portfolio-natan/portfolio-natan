// 1. Ganhos dos elementos
const imagem = document.getElementById("foto-natureza");
const textoDescricao = document.getElementById("descricao");
const btnAlterar = document.getElementById("btn-alterar");

const musica = document.getElementById("musica");

const btnSom = document.getElementById("btn-som");

// Variável de controle do carrossel
let statusCenario = "preservado";

// 2. Lógica do Carrossel (Condicional de Imagem)
btnAlterar.onclick = function() {

    if (statusCenario == "preservado") {

        // Muda para cenário de alerta
        imagem.src = "https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg?auto=compress&cs=tinysrgb&w=600";
        textoDescricao.innerText = "Alerta: O desmatamento destrói vidas.";
        statusCenario = "alerta";

    } else {

        // Volta para cenário preservado
        imagem.src = "natureza.jpeg";
        textoDescricao.innerText = "A natureza floresce quando cuidamos dela.";
        statusCenario = "preservado";
    }
}

// 3. Lógica do Som (Condicional de Áudio)
btnSom.onclick = function() {

    if (musica.paused) {

        musica.play();
        btnSom.innerText = "🔇 Pausar Som";
        btnSom.style.backgroundColor = "#e74c3c";

    } else {

        musica.pause();
        btnSom.innerText = "🔊 Ouvir a Natureza";
        btnSom.style.backgroundColor = "#3498db";
    }
}