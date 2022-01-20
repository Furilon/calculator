function add(x, y) {
    return +x + +y
}

function substract(x, y) {
    return +x - +y
}

function multiply(x, y) {
    return +x * +y
}

function divide(x, y) {
    if (y != 0) {
        return +x / +y
    } else return "infinityError"
}

function operate(operator, x, y) {
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return substract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
}

// Internal representation of the lower screen string
let display_values = "";

// Internal representation of the operator
// let operator = "";

const lowerScreen = document.getElementById('lower-screen');
const upperScreen = document.getElementById('upper-screen');


const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach(digitBtn => digitBtn.addEventListener('click', function(e) {
    signBtns.forEach(btn => btn.classList.remove('disabled-button'));

    // Allow user to either hit signs or period if string starts with 0
    if (checkStartsWithZero()) {
        digitBtns.forEach(btn => btn.classList.add('disabled-button'))
    } else {
        display_values += e.target.id;
        lowerScreen.textContent += e.target.textContent;
    }

}));

const signBtns = document.querySelectorAll('.sign');
signBtns.forEach(signBtn => signBtn.addEventListener('click', function(e) {
    digitBtns.forEach(btn => btn.classList.remove('disabled-button'))

        // If the string is empty, disable all signs.
    if (checkEmpty()) {
        signBtns.forEach(btn => btn.classList.add('disabled-button'));
        return;
    
        // If the string ends with sign, disable this particular sign but allow
        // other signs to be active.
    } else if (checkEndsWithSign()) {
        let arr = display_values.split("");
        let sign = arr[arr.length - 1];
        console.log(sign);

        if (!checkBtnDisabled(sign)) {
            arr.pop();
            display_values = arr.join("");
            
            let displayArr = lowerScreen.textContent.split("");
            console.log(displayArr);
            displayArr.splice(displayArr.length - 3, displayArr.length - 1);
            console.log(displayArr);
            lowerScreen.textContent = displayArr.join("");

            signBtns.forEach(btn => btn.classList.remove('disabled-button'));
            e.target.classList.add('disabled-button');
        } else  {
            return;
        }
    } else if (checkDisplayFull()) {
        const [sign] = [...display_values.match(/[+\-*\/]/)];
        const [leftOperand, rightOperand] = [...display_values.split(sign)];
        console.log(sign, leftOperand, rightOperand);

        let result = operate(sign, leftOperand, rightOperand);
        console.log(result)
        upperScreen.textContent = display_values;
        display_values = result.toString();
        lowerScreen.textContent = result.toString() + ` ${e.target.textContent} `;
        e.target.classList.add('disabled-button');
    } else {

    lowerScreen.textContent += " " + e.target.textContent + " ";
    display_values += e.target.id;
    }
}))

const periodBtn = document.getElementById('.');
periodBtn.addEventListener('click', function(e) {
    digitBtns.forEach(btn => btn.classList.remove('disabled-button'))
});

const equalsBtn = document.getElementById('=');
equalsBtn.addEventListener('click', function(e) {
    if (checkDisplayFull()) {
        const [sign] = [...display_values.match(/[+\-*\/]/)];
        const [leftOperand, rightOperand] = [...display_values.split(sign)];
        console.log(sign, leftOperand, rightOperand);

        let result = operate(sign, leftOperand, rightOperand);
        console.log(result)
        upperScreen.textContent = display_values;
        display_values = result.toString();
        lowerScreen.textContent = result.toString();
    }
});

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
});


function turnOffSignBtns() {
    signBtns.forEach(btn => btn.classList.add("disabled-button"));
}

function turnOnSignBtns() {
    signBtns.forEach(btn => btn.classList.remove("disabled-button"));
}

function checkEndsWithSign() {
    const endsWithSignPattern = /([0-9]+[+\-*\/]{1})$/;
    if (display_values.match(endsWithSignPattern)) {
        return 1
    }
}
    
function checkEmpty() {   
    if (display_values == "") {
        return 1
    }
}

function checkStartsWithZero() {
    if (display_values.match(/^0+/)) {
        return 1
    }
}

function checkDisplayFull() {
    const fullDisplayPattern = /^([0-9]+)([+\-*\/])([0-9]+)$/g;
    if (display_values.match(fullDisplayPattern)) {
        return 1
    }
}

function checkBtnDisabled(sign) {
    const signBtn = document.getElementById(sign);

    if ("disabled-button" in signBtn.classList) return 1
    else return 0;
}


// JS
// After you press digits, a sign, again digits, hit a sign to calculate the result
// and then hit sign again to change it, it doesn't but adds this new sign to the lower screen.

// CSS stuff
// 6. Make buttons hoverable.
// 7. Increase padding-right on the lower screen.
