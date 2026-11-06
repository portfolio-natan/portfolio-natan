document.addEventListener("DOMContentLoaded", function () {

    const botoes = document.querySelectorAll(".choice-button");

    const playerChoice = document.getElementById("playerChoice");

    const computerChoice = document.getElementById("computerChoice");

    const resultText = document.getElementById("resultText");

    const playerScoreElement = document.getElementById("playerScore");

    const computerScoreElement = document.getElementById("computerScore");

    const resetButton = document.getElementById("resetButton");


    const gameOverScreen = document.getElementById("gameOverScreen");

    const gameOverTitle = document.getElementById("gameOverTitle");

    const gameOverMessage = document.getElementById("gameOverMessage");

    const finalPlayerScore = document.getElementById("finalPlayerScore");

    const finalComputerScore = document.getElementById("finalComputerScore");

    const playAgainButton = document.getElementById("playAgainButton");


    let playerScore = 0;

    let computerScore = 0;

    let jogoFinalizado = false;


    const escolhas = {
        pedra: "✊",
        papel: "✋",
        tesoura: "✌️"
    };


    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            if (jogoFinalizado) {
                return;
            }


            const escolhaJogador =
                botao.getAttribute("data-choice");


            const opcoes = [
                "pedra",
                "papel",
                "tesoura"
            ];


            const escolhaComputador =
                opcoes[Math.floor(Math.random() * opcoes.length)];


            playerChoice.textContent =
                escolhas[escolhaJogador];

            computerChoice.textContent =
                escolhas[escolhaComputador];


            playerChoice.classList.remove("shake");

            computerChoice.classList.remove("shake");


            void playerChoice.offsetWidth;
            void computerChoice.offsetWidth;


            playerChoice.classList.add("shake");

            computerChoice.classList.add("shake");


            const resultado =
                verificarResultado(
                    escolhaJogador,
                    escolhaComputador
                );


            if (resultado === "jogador") {

                playerScore++;

                playerScoreElement.textContent =
                    playerScore;

                resultText.textContent =
                    "🎉 Você venceu a rodada!";


                if (playerScore >= 10) {

                    finalizarJogo(true);

                }

            }


            else if (resultado === "computador") {

                computerScore++;

                computerScoreElement.textContent =
                    computerScore;

                resultText.textContent =
                    "💻 Computador venceu a rodada!";


                if (computerScore >= 10) {

                    finalizarJogo(false);

                }

            }


            else {

                resultText.textContent =
                    "🤝 Empate!";

            }

        });

    });


    function verificarResultado(jogador, computador) {

        if (jogador === computador) {
            return "empate";
        }


        if (
            jogador === "pedra" &&
            computador === "tesoura"
        ) {
            return "jogador";
        }


        if (
            jogador === "papel" &&
            computador === "pedra"
        ) {
            return "jogador";
        }


        if (
            jogador === "tesoura" &&
            computador === "papel"
        ) {
            return "jogador";
        }


        return "computador";
    }


    function finalizarJogo(jogadorVenceu) {

        jogoFinalizado = true;


        finalPlayerScore.textContent =
            playerScore;

        finalComputerScore.textContent =
            computerScore;


        if (jogadorVenceu) {

            gameOverTitle.textContent =
                "YOU WIN";

            gameOverMessage.textContent =
                "🏆 Parabéns! Você venceu a partida!";

        }

        else {

            gameOverTitle.textContent =
                "GAME OVER";

            gameOverMessage.textContent =
                "💻 O computador venceu a partida!";

        }


        gameOverScreen.classList.add("active");


        document.body.style.overflow =
            "hidden";

    }


    playAgainButton.addEventListener("click", function () {

        playerScore = 0;

        computerScore = 0;

        jogoFinalizado = false;


        playerScoreElement.textContent =
            "0";

        computerScoreElement.textContent =
            "0";


        playerChoice.textContent =
            "❔";

        computerChoice.textContent =
            "❔";


        resultText.textContent =
            "Escolha uma opção!";


        gameOverScreen.classList.remove("active");


        document.body.style.overflow =
            "";

    });


    resetButton.addEventListener("click", function () {

        playerScore = 0;

        computerScore = 0;

        jogoFinalizado = false;


        playerScoreElement.textContent =
            "0";

        computerScoreElement.textContent =
            "0";


        playerChoice.textContent =
            "❔";

        computerChoice.textContent =
            "❔";


        resultText.textContent =
            "Escolha uma opção!";

    });


    console.log(
        "Jokenpô carregado com sucesso!"
    );

});