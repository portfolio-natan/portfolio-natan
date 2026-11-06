/* =========================================================
   PROJETO 5 - SITE DE CLIMA
========================================================= */


/* =========================================================
   DADOS DAS CIDADES
========================================================= */

const cidades = {

    "são paulo": {
        cidade: "São Paulo",
        pais: "Brasil",
        temperatura: 24,
        sensacao: 25,
        umidade: 65,
        vento: 12,
        condicao: "Ensolarado",
        icone: "☀️"
    },

    "rio de janeiro": {
        cidade: "Rio de Janeiro",
        pais: "Brasil",
        temperatura: 28,
        sensacao: 30,
        umidade: 72,
        vento: 15,
        condicao: "Parcialmente nublado",
        icone: "🌤️"
    },

    "curitiba": {
        cidade: "Curitiba",
        pais: "Brasil",
        temperatura: 18,
        sensacao: 17,
        umidade: 78,
        vento: 10,
        condicao: "Nublado",
        icone: "☁️"
    },

    "campinas": {
        cidade: "Campinas",
        pais: "Brasil",
        temperatura: 26,
        sensacao: 27,
        umidade: 61,
        vento: 13,
        condicao: "Ensolarado",
        icone: "☀️"
    }

};


/* =========================================================
   ELEMENTOS
========================================================= */

const cityInput =
    document.getElementById("cityInput");

const searchButton =
    document.getElementById("searchButton");

const message =
    document.getElementById("message");

const weatherCard =
    document.getElementById("weatherCard");

const cityName =
    document.getElementById("cityName");

const countryName =
    document.getElementById("countryName");

const temperature =
    document.getElementById("temperature");

const weatherDescription =
    document.getElementById("weatherDescription");

const weatherIcon =
    document.getElementById("weatherIcon");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const feelsLike =
    document.getElementById("feelsLike");


/* =========================================================
   MOSTRAR CLIMA
========================================================= */

function mostrarClima(nomeCidade) {

    const nome =
        nomeCidade
            .trim()
            .toLowerCase();


    /* verifica se a cidade existe */

    if (!cidades[nome]) {

        message.textContent =
            "Cidade não encontrada. Tente uma das cidades sugeridas.";

        return;

    }


    /* remove mensagem */

    message.textContent = "";


    const dados =
        cidades[nome];


    /* atualiza informações */

    cityName.textContent =
        dados.cidade;

    countryName.textContent =
        dados.pais;

    temperature.textContent =
        dados.temperatura;

    weatherDescription.textContent =
        dados.condicao;

    weatherIcon.textContent =
        dados.icone;

    humidity.textContent =
        dados.umidade + "%";

    wind.textContent =
        dados.vento + " km/h";

    feelsLike.textContent =
        dados.sensacao + "°C";


    /* animação */

    weatherCard.classList.remove(
        "animate"
    );


    void weatherCard.offsetWidth;


    weatherCard.classList.add(
        "animate"
    );

}


/* =========================================================
   BOTÃO PESQUISAR
========================================================= */

searchButton.addEventListener(
    "click",
    function () {

        if (
            cityInput.value.trim() === ""
        ) {

            message.textContent =
                "Digite o nome de uma cidade.";

            cityInput.focus();

            return;

        }


        mostrarClima(
            cityInput.value
        );

    }
);


/* =========================================================
   ENTER NO CAMPO
========================================================= */

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            searchButton.click();

        }

    }
);


/* =========================================================
   CIDADES RÁPIDAS
========================================================= */

const botoesCidade =
    document.querySelectorAll(
        ".city-buttons button"
    );


botoesCidade.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const cidade =
                    botao.getAttribute(
                        "data-city"
                    );


                cityInput.value =
                    cidade;


                mostrarClima(
                    cidade
                );

            }
        );

    }
);


/* =========================================================
   CLIMA INICIAL
========================================================= */

mostrarClima("São Paulo");