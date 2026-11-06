document.addEventListener("DOMContentLoaded", function () {

    const gameBoard =
        document.getElementById("gameBoard");

    const movesElement =
        document.getElementById("moves");

    const pairsElement =
        document.getElementById("pairs");

    const restartButton =
        document.getElementById("restartButton");

    const winMessage =
        document.getElementById("winMessage");

    const finalMoves =
        document.getElementById("finalMoves");

    const playAgain =
        document.getElementById("playAgain");


    /* =====================================================
       EMOJIS DAS CARTAS
    ===================================================== */

    const emojis = [
        "🚀",
        "💻",
        "🎮",
        "⚡",
        "🤖",
        "🔥",
        "🎯",
        "🧠"
    ];


    let cards = [];

    let firstCard = null;

    let secondCard = null;

    let lockBoard = false;

    let moves = 0;

    let pairs = 0;


    /* =====================================================
       INICIAR JOGO
    ===================================================== */

    function iniciarJogo() {

        gameBoard.innerHTML = "";

        firstCard = null;

        secondCard = null;

        lockBoard = false;

        moves = 0;

        pairs = 0;


        movesElement.textContent = "0";

        pairsElement.textContent = "0 / 8";

        winMessage.classList.remove("show");


        /* cria pares */

        cards = [...emojis, ...emojis];


        /* embaralha */

        cards.sort(
            () => Math.random() - 0.5
        );


        /* cria cartas */

        cards.forEach(
            function (emoji, index) {

                const card =
                    document.createElement("div");


                card.classList.add("card");


                card.dataset.value =
                    emoji;


                card.innerHTML = `

                    <div class="card-inner">

                        <div class="card-front"></div>

                        <div class="card-back">
                            ${emoji}
                        </div>

                    </div>

                `;


                card.addEventListener(
                    "click",
                    virarCarta
                );


                gameBoard.appendChild(card);

            }
        );

    }


    /* =====================================================
       VIRAR CARTA
    ===================================================== */

    function virarCarta() {

        if (lockBoard) {
            return;
        }


        if (this === firstCard) {
            return;
        }


        if (this.classList.contains("matched")) {
            return;
        }


        this.classList.add("flipped");


        if (!firstCard) {

            firstCard = this;

            return;

        }


        secondCard = this;


        moves++;

        movesElement.textContent =
            moves;


        verificarPar();

    }


    /* =====================================================
       VERIFICAR PAR
    ===================================================== */

    function verificarPar() {

        const match =
            firstCard.dataset.value ===
            secondCard.dataset.value;


        if (match) {

            desativarCartas();

        } else {

            esconderCartas();

        }

    }


    /* =====================================================
       CARTAS IGUAIS
    ===================================================== */

    function desativarCartas() {

        firstCard.classList.add("matched");

        secondCard.classList.add("matched");


        pairs++;


        pairsElement.textContent =
            `${pairs} / 8`;


        resetTabuleiro();


        if (pairs === 8) {

            setTimeout(
                mostrarVitoria,
                500
            );

        }

    }


    /* =====================================================
       CARTAS DIFERENTES
    ===================================================== */

    function esconderCartas() {

        lockBoard = true;


        firstCard.classList.add("wrong");

        secondCard.classList.add("wrong");


        setTimeout(
            function () {

                firstCard.classList.remove(
                    "flipped"
                );

                secondCard.classList.remove(
                    "flipped"
                );


                firstCard.classList.remove(
                    "wrong"
                );

                secondCard.classList.remove(
                    "wrong"
                );


                resetTabuleiro();

            },
            900
        );

    }


    /* =====================================================
       RESETAR TABULEIRO
    ===================================================== */

    function resetTabuleiro() {

        [
            firstCard,
            secondCard
        ] = [null, null];


        lockBoard = false;

    }


    /* =====================================================
       VITÓRIA
    ===================================================== */

    function mostrarVitoria() {

        finalMoves.textContent =
            moves;


        winMessage.classList.add(
            "show"
        );

    }


    /* =====================================================
       BOTÃO REINICIAR
    ===================================================== */

    restartButton.addEventListener(
        "click",
        function () {

            iniciarJogo();

        }
    );


    playAgain.addEventListener(
        "click",
        function () {

            iniciarJogo();

        }
    );


    /* =====================================================
       COMEÇA O JOGO
    ===================================================== */

    iniciarJogo();

});