let numberButtons = document.querySelectorAll('.number');
let functionButtons = document.querySelectorAll('.function');
let allButtons = document.querySelectorAll('.button');
let displayField = document.querySelector('input');

let num1 = 0;
let num2 = 0;
let operator = '';

let num1Switch = true;
let operatorSwitch = false;
let num2Switch = false;

// DELUJOCA FUNKCIJA - NABERE VSE 3 VREDNOSTI

allButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if( num1Switch === true && num2Switch === false && operatorSwitch === false) {
            num1 = e.target.textContent;  // getting the num1 (first number)
            document.querySelector('input').value = e.target.textContent;  //printing the num1 in the display 
            operatorSwitch = true;
        } else if ( num1Switch === true && num2Switch === false && operatorSwitch === true) {
            operator = e.target.textContent;
            operatorSwitch = false;
            num1Switch = false;
            num2Switch = true;
        } else if (num1Switch === false && num2Switch === true && operatorSwitch === false) {
            num2 = e.target.textContent;  // getting the num2 (second number)
            document.querySelector('input').value = e.target.textContent;  //printing the num1 in the display 
            num2Switch = false;
        };
    });
});


// Operation functions
let add = (num1, num2) => {
    return parseInt(num1) + parseInt(num2);
};

let subtract = (num1, num2) => {
    return num1 - num2;
};

let multiply = (num1, num2) => {
    return num1 * num2;
};

let divide = (num1, num2) => {
    return num1 / num2;
};

// Function operate, which calls specific operation, depending on
// which operator we choose.

let operate = (num1, num2, operator) => {
    
    if (operator === '+'){
        return add(num1, num2);
    }else if (operator === '-'){
        return subtract(num1, num2);
    }else if (operator === '*'){
        return multiply(num1, num2);
    }else if (operator === '/'){
        return divide(num1, num2);
    };
};


// Adding functionality to button 'equals'

document.querySelector('#button-equals').addEventListener('click', () => {
    operate(num1, num2, operator);
    console.log(operate(num1, num2, operator));
    displayField.value = operate(num1, num2, operator);
});
