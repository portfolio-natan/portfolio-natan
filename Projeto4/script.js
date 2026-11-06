const currentOperation =
    document.getElementById("current-operation");

const previousOperation =
    document.getElementById("previous-operation");

const numberButtons =
    document.querySelectorAll("[data-number]");

const operationButtons =
    document.querySelectorAll("[data-operation]");

const actionButtons =
    document.querySelectorAll("[data-action]");


let currentValue = "";
let previousValue = "";
let operation = null;


/* ================================
   ATUALIZAR DISPLAY
================================ */

function updateDisplay() {

    if (currentValue === "") {

        currentOperation.textContent = "0";

    } else {

        currentOperation.textContent =
            currentValue;

    }

    if (previousValue !== "" && operation) {

        previousOperation.textContent =
            `${previousValue} ${getOperationSymbol(operation)}`;

    } else {

        previousOperation.textContent = "";

    }

}


/* ================================
   SÍMBOLOS
================================ */

function getOperationSymbol(operation) {

    const symbols = {

        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"

    };

    return symbols[operation] || operation;

}


/* ================================
   NÚMEROS
================================ */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number =
            button.dataset.number;

        if (number === ".") {

            if (currentValue.includes(".")) {
                return;
            }

            if (currentValue === "") {
                currentValue = "0";
            }

        }

        currentValue += number;

        updateDisplay();

    });

});


/* ================================
   OPERAÇÕES
================================ */

operationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedOperation =
            button.dataset.operation;

        if (selectedOperation === "%") {

            if (currentValue === "") {
                return;
            }

            currentValue =
                String(parseFloat(currentValue) / 100);

            updateDisplay();

            return;
        }


        if (currentValue === "" && previousValue === "") {
            return;
        }


        if (
            previousValue !== "" &&
            currentValue !== ""
        ) {

            calculate();

        }


        if (currentValue !== "") {

            previousValue =
                currentValue;

            currentValue = "";

        }


        operation =
            selectedOperation;

        updateDisplay();

    });

});


/* ================================
   CALCULAR
================================ */

function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        !operation
    ) {
        return;
    }


    const previous =
        parseFloat(previousValue);

    const current =
        parseFloat(currentValue);

    let result;


    switch (operation) {

        case "+":

            result =
                previous + current;

            break;


        case "-":

            result =
                previous - current;

            break;


        case "*":

            result =
                previous * current;

            break;


        case "/":

            if (current === 0) {

                showError(
                    "Não é possível dividir por zero."
                );

                return;

            }

            result =
                previous / current;

            break;

    }


    previousOperation.textContent =
        `${previousValue} ${getOperationSymbol(operation)} ${currentValue} =`;


    currentValue =
        formatResult(result);

    previousValue = "";

    operation = null;

    updateCurrentOnly();

}


/* ================================
   FORMATAR RESULTADO
================================ */

function formatResult(value) {

    if (!Number.isFinite(value)) {
        return "Erro";
    }


    const rounded =
        Math.round(value * 100000000) / 100000000;


    return String(rounded);

}


/* ================================
   ATUALIZAR RESULTADO
================================ */

function updateCurrentOnly() {

    currentOperation.textContent =
        currentValue;

}


/* ================================
   BOTÕES DE AÇÃO
================================ */

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action =
            button.dataset.action;


        if (action === "clear") {

            clearCalculator();

        }


        if (action === "delete") {

            deleteNumber();

        }


        if (action === "calculate") {

            calculate();

        }

    });

});


/* ================================
   LIMPAR
================================ */

function clearCalculator() {

    currentValue = "";

    previousValue = "";

    operation = null;

    previousOperation.textContent = "";

    currentOperation.textContent = "0";

}


/* ================================
   APAGAR
================================ */

function deleteNumber() {

    if (currentValue === "") {
        return;
    }


    currentValue =
        currentValue.slice(0, -1);


    updateDisplay();

}


/* ================================
   ERRO
================================ */

function showError(message) {

    currentOperation.textContent =
        "Erro";

    previousOperation.textContent =
        message;


    setTimeout(() => {

        clearCalculator();

    }, 1800);

}


/* ================================
   TECLADO DO COMPUTADOR
================================ */

document.addEventListener("keydown", event => {

    const key =
        event.key;


    if (
        /^[0-9.]$/.test(key)
    ) {

        const button =
            document.querySelector(
                `[data-number="${key}"]`
            );

        if (button) {
            button.click();
        }

    }


    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        const button =
            document.querySelector(
                `[data-operation="${key}"]`
            );

        if (button) {
            button.click();
        }

    }


    if (key === "Enter" || key === "=") {

        const button =
            document.querySelector(
                '[data-action="calculate"]'
            );

        button.click();

    }


    if (key === "Backspace") {

        const button =
            document.querySelector(
                '[data-action="delete"]'
            );

        button.click();

    }


    if (key === "Escape") {

        const button =
            document.querySelector(
                '[data-action="clear"]'
            );

        button.click();

    }


    if (key === "%") {

        const button =
            document.querySelector(
                '[data-operation="%"]'
            );

        button.click();

    }

});


updateDisplay();