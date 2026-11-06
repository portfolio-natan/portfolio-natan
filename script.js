document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURSOR PERSONALIZADO
    ===================================================== */

    const cursor = document.querySelector(".custom-cursor");

    if (cursor) {

        document.addEventListener("mousemove", function (event) {

            cursor.style.left = event.clientX + "px";
            cursor.style.top = event.clientY + "px";
            cursor.style.opacity = "1";

        });

        document.addEventListener("mouseleave", function () {
            cursor.style.opacity = "0";
        });

        const elementosHover = document.querySelectorAll(
            "a, button, .project-card, .about-card"
        );

        elementosHover.forEach(function (elemento) {

            elemento.addEventListener("mouseenter", function () {
                cursor.classList.add("cursor-hover");
            });

            elemento.addEventListener("mouseleave", function () {
                cursor.classList.remove("cursor-hover");
            });

        });
    }


    /* =====================================================
       PARTÍCULAS
    ===================================================== */

    const particlesContainer = document.getElementById("particles");

    if (particlesContainer) {

        const quantidade = 55;

        for (let i = 0; i < quantidade; i++) {

            const particle = document.createElement("div");

            particle.classList.add("particle");

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            const tamanho =
                Math.random() * 3 + 1;

            particle.style.width =
                tamanho + "px";

            particle.style.height =
                tamanho + "px";

            particle.style.animationDuration =
                (Math.random() * 10 + 8) + "s";

            particle.style.animationDelay =
                (Math.random() * 8) + "s";

            particlesContainer.appendChild(particle);
        }
    }


    /* =====================================================
       MENU ATIVO
    ===================================================== */

    const menuLinks =
        document.querySelectorAll(".menu a");

    const sections =
        document.querySelectorAll("section[id]");


    function atualizarMenu() {

        let posicaoAtual =
            window.scrollY + 150;

        sections.forEach(function (section) {

            const topo =
                section.offsetTop;

            const altura =
                section.offsetHeight;

            const id =
                section.getAttribute("id");

            if (
                posicaoAtual >= topo &&
                posicaoAtual < topo + altura
            ) {

                menuLinks.forEach(function (link) {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + id
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });
    }


    window.addEventListener(
        "scroll",
        atualizarMenu
    );

    atualizarMenu();


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino =
                link.getAttribute("href");

            if (
                destino &&
                destino.startsWith("#")
            ) {

                const elemento =
                    document.querySelector(destino);

                if (elemento) {

                    event.preventDefault();

                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =====================================================
       BOTÕES "VER PROJETO"
       
       TODOS OS PROJETOS ABREM EM NOVA GUIA
    ===================================================== */

    const botoesProjeto =
        document.querySelectorAll(
            ".project-overlay-button"
        );


    botoesProjeto.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const link =
                botao.getAttribute("data-link");

            if (!link) {
                return;
            }

            /*
             * Abre projetos externos E locais
             * em uma nova guia.
             */

            window.open(link, "_blank");

        });

    });


    /* =====================================================
       ANIMAÇÃO DE ENTRADA
    ===================================================== */

    const elementosReveal =
        document.querySelectorAll(
            ".section-title, .about-card, .project-card, .contact-box"
        );


    elementosReveal.forEach(function (elemento) {

        elemento.classList.add("reveal");

    });


    /* =====================================================
       PROTEÇÃO CONTRA ELEMENTOS INVISÍVEIS
    ===================================================== */

    elementosReveal.forEach(function (elemento) {

        elemento.style.opacity = "1";
        elemento.style.visibility = "visible";
        elemento.style.transform = "none";

    });


    /* =====================================================
       EFEITO NOS CARDS DOS PROJETOS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                card.style.zIndex = "20";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.zIndex = "";

            }
        );

    });


    /* =====================================================
       EFEITO NOS CARDS "SOBRE MIM"
    ===================================================== */

    const aboutCards =
        document.querySelectorAll(
            ".about-card"
        );


    aboutCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                aboutCards.forEach(function (outroCard) {

                    if (outroCard !== card) {

                        outroCard.style.opacity =
                            "0.65";

                    }

                });

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                aboutCards.forEach(function (outroCard) {

                    outroCard.style.opacity =
                        "1";

                });

            }
        );

    });


    /* =====================================================
       PROTEÇÃO CONTRA IMAGENS QUEBRADAS
    ===================================================== */

    const imagens =
        document.querySelectorAll("img");


    imagens.forEach(function (imagem) {

        imagem.addEventListener(
            "error",
            function () {

                imagem.style.background =
                    "#100b15";

            }
        );

    });


    /* =====================================================
       LOG NO CONSOLE
    ===================================================== */

    console.log(
        "Portfólio de Natan carregado com sucesso!"
    );

});