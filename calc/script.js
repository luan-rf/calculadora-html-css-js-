let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".tela");
screen.textContent = buffer;
// o codigo acima faz a tela da calculadora mostrar o valor do buffer, que é o número que o usuário está digitando no momento. O buffer começa com "0" e vai sendo atualizado conforme o usuário digita os números.

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = undefined;
            break;
        case "DEL":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "igual":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case "soma":
        case "subtracao":
        case "multiplicacao":
        case "divisao":
            handleMath(symbol);
            break;
    }
}
//o codigo acima é a função que lida com os símbolos da calculadora, como "C", "DEL", "igual" e os operadores matemáticos. Ele usa um switch para determinar qual ação tomar com base no símbolo clicado.


function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}
// a funcao acima é a função que lida com os operadores matemáticos. Ela verifica se o buffer é "0" (o que significa que o usuário ainda não digitou um número) e, se não for, converte o buffer para um número inteiro. Se o runningTotal for 0, ele define o runningTotal como o número do buffer. Caso contrário, ele chama a função flushOperation para realizar a operação matemática com base no operador anterior. Depois disso, ele atualiza o previousOperator para o símbolo atual e redefine o buffer para "0" para que o usuário possa digitar o próximo número.

function flushOperation(intBuffer) {
    if (previousOperator === "soma") {
        runningTotal += intBuffer;
    } else if (previousOperator === "subtracao") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "multiplicacao") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "divisao") {
        runningTotal /= intBuffer;
    }
}
// a função acima é a função que realiza a operação matemática com base no operador anterior. Ela verifica qual é o operador anterior e realiza a operação correspondente com o runningTotal e o intBuffer (o número atual do buffer convertido para inteiro).

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }   
}
// a função acima é a função que lida com os números. Ela verifica se o buffer é "0" (o que significa que o usuário ainda não digitou um número) e, se for, define o buffer como o número clicado. Caso contrário, ela adiciona o número clicado ao final do buffer, permitindo que o usuário digite números de múltiplos dígitos.

function init() {
    document.querySelector(".calculadora")
        .addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON") {
                const button = event.target;
                const buttonText = button.innerText;
                const buttonClass = button.className;
                
                // Check if it's a number button
                if (buttonClass.includes("numero")) {
                    handleNumber(buttonText);
                } else if (buttonClass.includes("erase")) {
                    handleSymbol("C");
                } else if (buttonClass.includes("delete")) {
                    handleSymbol("DEL");
                } else if (buttonClass.includes("igual")) {
                    handleSymbol("igual");
                } else if (buttonClass.includes("soma")) {
                    handleSymbol("soma");
                } else if (buttonClass.includes("subtracao")) {
                    handleSymbol("subtracao");
                } else if (buttonClass.includes("multiplicacao")) {
                    handleSymbol("multiplicacao");
                } else if (buttonClass.includes("divisao")) {
                    handleSymbol("divisao");
                }
                
                screen.innerText = buffer;
            }
        });
}
// a função acima é a função de inicialização que adiciona um event listener para a calculadora. Ele verifica se o elemento clicado é um botão e, em seguida, determina qual tipo de botão foi clicado (número, símbolo de operação, etc.) e chama a função apropriada para lidar com a ação. Depois disso, ele atualiza o texto da tela da calculadora para mostrar o valor atual do buffer.

init();
