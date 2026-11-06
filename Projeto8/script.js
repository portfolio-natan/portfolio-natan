document.addEventListener("DOMContentLoaded", function () {

    const canvas =
        document.getElementById("gameCanvas");

    const ctx =
        canvas.getContext("2d");


    const scoreElement =
        document.getElementById("score");

    const highScoreElement =
        document.getElementById("highScore");

    const startScreen =
        document.getElementById("startScreen");

    const gameOverScreen =
        document.getElementById("gameOver");

    const startButton =
        document.getElementById("startButton");

    const restartButton =
        document.getElementById("restartButton");

    const finalScore =
        document.getElementById("finalScore");


    /* =====================================================
       CONFIGURAÇÕES
    ===================================================== */

    const tamanhoGrid = 20;

    const quantidadeCelulas = 20;

    const velocidade = 120;


    canvas.width =
        quantidadeCelulas * tamanhoGrid;

    canvas.height =
        quantidadeCelulas * tamanhoGrid;


    /* =====================================================
       VARIÁVEIS
    ===================================================== */

    let cobra;

    let comida;

    let direcao;

    let proximaDirecao;

    let score = 0;

    let highScore =
        localStorage.getItem(
            "snakeHighScore"
        ) || 0;

    let jogoRodando = false;

    let intervalo;


    highScoreElement.textContent =
        highScore;


    /* =====================================================
       INICIAR JOGO
    ===================================================== */

    function iniciarJogo() {

        cobra = [

            {
                x: 10,
                y: 10
            },

            {
                x: 9,
                y: 10
            },

            {
                x: 8,
                y: 10
            }

        ];


        direcao = {
            x: 1,
            y: 0
        };


        proximaDirecao = {
            x: 1,
            y: 0
        };


        score = 0;

        scoreElement.textContent =
            score;


        criarComida();


        jogoRodando = true;


        startScreen.classList.add(
            "hidden"
        );

        gameOverScreen.classList.add(
            "hidden"
        );


        clearInterval(intervalo);


        intervalo =
            setInterval(
                atualizarJogo,
                velocidade
            );


        desenhar();

    }


    /* =====================================================
       CRIAR COMIDA
    ===================================================== */

    function criarComida() {

        let novaComida;


        do {

            novaComida = {

                x:
                    Math.floor(
                        Math.random() *
                        quantidadeCelulas
                    ),

                y:
                    Math.floor(
                        Math.random() *
                        quantidadeCelulas
                    )

            };

        } while (
            cobra.some(
                parte =>
                    parte.x === novaComida.x &&
                    parte.y === novaComida.y
            )
        );


        comida = novaComida;

    }


    /* =====================================================
       ATUALIZAR JOGO
    ===================================================== */

    function atualizarJogo() {

        if (!jogoRodando) {
            return;
        }


        direcao = proximaDirecao;


        const novaCabeca = {

            x:
                cobra[0].x +
                direcao.x,

            y:
                cobra[0].y +
                direcao.y

        };


        /* verifica parede */

        if (

            novaCabeca.x < 0 ||

            novaCabeca.x >=
            quantidadeCelulas ||

            novaCabeca.y < 0 ||

            novaCabeca.y >=
            quantidadeCelulas

        ) {

            terminarJogo();

            return;

        }


        /* verifica corpo */

        if (
            cobra.some(
                parte =>
                    parte.x === novaCabeca.x &&
                    parte.y === novaCabeca.y
            )
        ) {

            terminarJogo();

            return;

        }


        cobra.unshift(
            novaCabeca
        );


        /* comeu comida */

        if (

            novaCabeca.x ===
            comida.x &&

            novaCabeca.y ===
            comida.y

        ) {

            score++;


            scoreElement.textContent =
                score;


            if (score > highScore) {

                highScore = score;


                highScoreElement.textContent =
                    highScore;


                localStorage.setItem(
                    "snakeHighScore",
                    highScore
                );

            }


            criarComida();

        } else {

            cobra.pop();

        }


        desenhar();

    }


    /* =====================================================
       DESENHAR
    ===================================================== */

    function desenhar() {

        /* fundo */

        ctx.fillStyle =
            "#08050b";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* grade */

        desenharGrade();


        /* comida */

        desenharComida();


        /* cobra */

        desenharCobra();

    }


    /* =====================================================
       GRADE
    ===================================================== */

    function desenharGrade() {

        ctx.strokeStyle =
            "rgba(139, 44, 255, 0.06)";

        ctx.lineWidth = 1;


        for (
            let i = 0;
            i <= quantidadeCelulas;
            i++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i * tamanhoGrid,
                0
            );

            ctx.lineTo(
                i * tamanhoGrid,
                canvas.height
            );

            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(
                0,
                i * tamanhoGrid
            );

            ctx.lineTo(
                canvas.width,
                i * tamanhoGrid
            );

            ctx.stroke();

        }

    }


    /* =====================================================
       DESENHAR COMIDA
    ===================================================== */

    function desenharComida() {

        const centroX =
            comida.x * tamanhoGrid +
            tamanhoGrid / 2;

        const centroY =
            comida.y * tamanhoGrid +
            tamanhoGrid / 2;


        ctx.fillStyle =
            "#ff3b81";


        ctx.shadowColor =
            "#ff3b81";


        ctx.shadowBlur = 15;


        ctx.beginPath();

        ctx.arc(
            centroX,
            centroY,
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.shadowBlur = 0;

    }


    /* =====================================================
       DESENHAR COBRA
    ===================================================== */

    function desenharCobra() {

        cobra.forEach(
            function (parte, index) {

                const x =
                    parte.x *
                    tamanhoGrid;

                const y =
                    parte.y *
                    tamanhoGrid;


                if (index === 0) {

                    ctx.fillStyle =
                        "#b35cff";

                    ctx.shadowColor =
                        "#8b2cff";

                    ctx.shadowBlur =
                        12;

                } else {

                    ctx.fillStyle =
                        "#8b2cff";

                    ctx.shadowBlur = 0;

                }


                ctx.beginPath();


                ctx.roundRect(
                    x + 2,
                    y + 2,
                    tamanhoGrid - 4,
                    tamanhoGrid - 4,
                    5
                );


                ctx.fill();


                ctx.shadowBlur = 0;


                /* olhos da cabeça */

                if (index === 0) {

                    ctx.fillStyle =
                        "#ffffff";


                    ctx.beginPath();

                    ctx.arc(
                        x + 7,
                        y + 7,
                        2,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();


                    ctx.beginPath();

                    ctx.arc(
                        x + 14,
                        y + 7,
                        2,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();

                }

            }
        );

    }


    /* =====================================================
       CONTROLES
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (!jogoRodando) {
                return;
            }


            switch (evento.key) {

                case "ArrowUp":

                    if (direcao.y !== 1) {

                        proximaDirecao = {
                            x: 0,
                            y: -1
                        };

                    }

                    evento.preventDefault();

                    break;


                case "ArrowDown":

                    if (direcao.y !== -1) {

                        proximaDirecao = {
                            x: 0,
                            y: 1
                        };

                    }

                    evento.preventDefault();

                    break;


                case "ArrowLeft":

                    if (direcao.x !== 1) {

                        proximaDirecao = {
                            x: -1,
                            y: 0
                        };

                    }

                    evento.preventDefault();

                    break;


                case "ArrowRight":

                    if (direcao.x !== -1) {

                        proximaDirecao = {
                            x: 1,
                            y: 0
                        };

                    }

                    evento.preventDefault();

                    break;

            }

        }
    );


    /* =====================================================
       GAME OVER
    ===================================================== */

    function terminarJogo() {

        jogoRodando = false;


        clearInterval(intervalo);


        finalScore.textContent =
            score;


        gameOverScreen.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       BOTÕES
    ===================================================== */

    startButton.addEventListener(
        "click",
        iniciarJogo
    );


    restartButton.addEventListener(
        "click",
        iniciarJogo
    );


});