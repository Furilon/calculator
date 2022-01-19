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

let display_values = "";

const lowerScreen = document.getElementById('lower-screen');
const upperScreen = document.getElementById('upper-screen');

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach(digitBtn => digitBtn.addEventListener('click', function(e) {
    lowerScreen.textContent += e.target.textContent;
    display_values += e.target.id;
    // console.log(display_values); 
}));

const  signBtns = document.querySelectorAll('.sign');
signBtns.forEach(signBtn => signBtn.addEventListener('click', function(e) {
    lowerScreen.textContent += " " + e.target.textContent + " ";
    display_values += e.target.id;
}))

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
    upperScreen.textContent = "";
    lowerScreen.textContent = "";
    display_values = "";
});

const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', () => {
    let displayArr = lowerScreen.textContent.split("");
    let internalArr = display_values.split("");

    if (displayArr[displayArr.length - 1] == " ") {
        for (i = 0; i < 3; i++){
            displayArr.pop();
        }
    } else {
        displayArr.pop()
    }
    internalArr.pop()

    lowerScreen.textContent = displayArr.join("");
    display_values = internalArr.join("");
})

// 1. Check if display already has digits or not
// 2. If not, turn sign buttons off

// 3. Check if display already has a sign
// 4. If yes, but no digits after, turn sign buttons off
// 5. If yes, and there are digits after, calculate and place results into upper screen.

// 6. Make buttons hoverable.
// 7. Increase padding-right on the lower screen.
