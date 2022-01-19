function add(x, y) {
    return +x + +y
}

function substract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function operate(operator, x, y) {
    switch (operator) {
        case "+":
            add(x, y);
            break;
        case "-":
            substract(x, y);
            break;
        case "*":
            multiply(x, y);
            break;
        case "/":
            divide(x, y);
            break;
    }
}

