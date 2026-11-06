/* =========================================
   CARRINHO DA PIZZARIA
========================================= */

let carrinho = [];


/* =========================================
   ADICIONAR PIZZA
========================================= */

function adicionarCarrinho(nome, preco) {

    const pizzaExistente = carrinho.find(
        item => item.nome === nome
    );

    if (pizzaExistente) {

        pizzaExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    abrirCarrinho();
}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const quantidade =
        document.getElementById("quantidadeCarrinho");

    const total =
        document.getElementById("totalCarrinho");


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;

    }


    let totalPedido = 0;
    let quantidadeTotal = 0;


    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;


        totalPedido += subtotal;

        quantidadeTotal += item.quantidade;


        const elemento =
            document.createElement("div");


        elemento.className =
            "item-carrinho";


        elemento.innerHTML = `

            <div>

                <h4>
                    ${item.nome}
                </h4>

                <small>
                    R$ ${item.preco.toFixed(2).replace(".", ",")}
                    cada
                </small>

            </div>

            <div class="item-acoes">

                <button onclick="diminuirItem(${index})">
                    −
                </button>

                <strong>
                    ${item.quantidade}
                </strong>

                <button onclick="aumentarItem(${index})">
                    +
                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });


    quantidade.textContent =
        quantidadeTotal;


    total.textContent =
        `R$ ${totalPedido.toFixed(2).replace(".", ",")}`;

}


/* =========================================
   AUMENTAR QUANTIDADE
========================================= */

function aumentarItem(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


/* =========================================
   DIMINUIR QUANTIDADE
========================================= */

function diminuirItem(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();

}


/* =========================================
   ABRIR CARRINHO
========================================= */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    carrinhoElemento.classList.add("ativo");

    document.body.style.overflow = "hidden";

}


/* =========================================
   FECHAR CARRINHO
========================================= */

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    carrinhoElemento.classList.remove("ativo");

    document.body.style.overflow = "";

}


/* =========================================
   FINALIZAR PEDIDO
========================================= */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;

    }


    let mensagem =
        "Olá! Gostaria de fazer um pedido:%0A%0A";


    let total = 0;


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;


        mensagem +=
            `${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2)}%0A`;

    });


    mensagem +=
        `%0ATotal: R$ ${total.toFixed(2)}`;


    /*
       Troque pelo número da sua pizzaria.

       Exemplo:
       5519999999999
    */

    const telefone =
        "5519999999999";


    const url =
        `https://wa.me/${telefone}?text=${mensagem}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   FECHAR CARRINHO CLICANDO FORA
========================================= */

document
    .getElementById("carrinho")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                fecharCarrinho();

            }

        }
    );