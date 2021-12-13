let numberButtons = document.querySelectorAll('.number');
let functionButtons = document.querySelectorAll('.function');
let allButtons = document.querySelectorAll('.button');
let dotButton = document.querySelector('#button-dot')
let displayField = document.querySelector('input');


let num1 = 0;
let num2 = 0;
let operator = '';

let num1Switch = true;
let num2Switch = false;
let resultSwitch = false;

// Function which collects number 1, number 2 and operator.
// It uses the switches, which turn on and off, depending on
// which value we need.

allButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {

if(num1Switch === true &&                                                               // Extra case: when result is printed after pressing "=", restart the calculator if the user presses a number
    num2Switch === false &&
    resultSwitch === true){  
        if (e.target.classList.contains('number')) {                                    // SUBCASE 1: user presses a number after the result is printed
            document.querySelector('input').value = ''; 
            document.querySelector('input').value = e.target.textContent;
            num1 = e.target.textContent; 
            resultSwitch = false;
            
        }else if (e.target.classList.contains('function')){                             // SUBCASE 2: when the user presses an operator after result is printed:
            operator = e.target.textContent;
            num1Switch = false;
            num2Switch = true;
            resultSwitch = false;
            document.querySelector('input').value = '';                                 // Reseting the display when users presses an operator
        };

}else if( num1Switch === true &&                                                        // CASE 1: getting the num1 and operator
            num2Switch === false &&
            resultSwitch === false) {

            if (e.target.classList.contains('number')) {                                // SUBCASE 1: when the user presses a number:
                num1 += e.target.textContent;                                           // getting the num1 (first number)
                document.querySelector('input').value += e.target.textContent;          // printing the num1 in the display  
                

            }else if (e.target.classList.contains('function')){                         // SUBCASE 2: when the user presses an operator:
                operator = e.target.textContent;
                num1Switch = false;
                num2Switch = true;
                document.querySelector('input').value = '';                             // Reseting the display when users presses an operator
            };
                        
} else if (num1Switch === false &&                                                      // CASE 2: getting the num 2 
            num2Switch === true) {

            if (e.target.classList.contains('number')) {                                // SUBCASE 1: if a user presses a number:

                num2 += e.target.textContent;                                           // getting the num2 (second number)
                document.querySelector('input').value += e.target.textContent;          // printing the num2 in the display 

            } else if (e.target.classList.contains('function')) {                       // SUBCASE 2: if a user presses an operator again:

                operate(num1, num2, operator);                                          // Calling the function, so we get the result
                displayField.value = operate(num1, num2, operator);                     // Displaying the result
                num1 = displayField.value;                                              // This takes the result as the new num1
                num2 = 0;                                                               // This resets num2, so we can listen for a new one.
                operator = e.target.textContent;
                displayField.value = '';                                                // Reseting the display when users presses an operator
            };
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
        if (add(num1, num2) % 1 === 0){
            return add(num1, num2);
        }else{
            return add(num1, num2)
        };
    }else if (operator === '-'){
        if (subtract(num1, num2) % 1 === 0){
            return subtract(num1, num2);
        }else{
            return subtract(num1, num2)
        };
    }else if (operator === '×'){
        if (multiply(num1, num2) % 1 === 0){
            return multiply(num1, num2);
        }else{
            return multiply(num1, num2)
        };
    }else if (operator === '÷'){
        if (divide(num1, num2) % 1 === 0){
            return divide(num1, num2);
        }else{
            return (divide(num1, num2));
        };
    };
};



// Adding functionality to button 'equals'

document.querySelector('#button-equals').addEventListener('click', () => {
    operate(num1, num2, operator);                              // Calling the function
    displayField.value = operate(num1, num2, operator);         // Displaying the result
    if (displayField.value.length > 6) {                         // Limiting the length of the result (for long decimals)
        displayField.value = displayField.value.substr(0, 8)
    };
    if (displayField.value == Infinity || displayField.value == 'NaN' || displayField.value == 'undefined'){
        displayField.value = 'error';                           
    };
    num1Switch = true;                                          // This resets the Eventlistener and the calculator
    num2Switch = false;                                         // This stops listening for num2 when we press =
    resultSwitch = true;
    num1 = displayField.value;                                  // This sets the result as the new num1.
    num2 = 0;                                                   // This resets the num 2, so we can listen for a new num2.
});


// Adding functionality to "back" button

document.querySelector('#button-back').addEventListener('click', () => {
    displayField.value = displayField.value.substring(0, displayField.value.length - 1);  // Making the display value 1 char.shorter
    if (num1Switch === true){       // If we are entering number 1, assign the shortened display value as new number 1
        num1 = displayField.value; 
    };
    if (num2Switch === true){       // If we are entering number 2, assing the shortened display value as new number 2
        num2 = displayField.value;
    };
});


// Adding functionality to "clear" button

document.querySelector('#button-c').addEventListener('click', () => {
    displayField.value = '';
    num1 = 0;
    num2 = 0;
    operator = '';
    num1Switch = true;
    num2Switch = false;
});