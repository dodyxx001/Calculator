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

// Main function which collects number 1, number 2 and operator.
// It uses the switches, which turn on and off, depending on
// which value we need. It has to be NAMED, so we can remove
// the event listeners when we need to.
//___________________________________________________________________________________________________________________________________________________________________________________________________

function getInputs (e) {

    if( num1Switch === true &&                                                      // CASE 1: getting the num1 and operator
        num2Switch === false &&
        resultSwitch === false) {

        if (e.target.classList.contains('number')) {                                // SUBCASE 1: when the user presses a number:
            num1 += e.target.textContent;                                           // getting the num1 (first number)
            document.querySelector('input').value += e.target.textContent;          // printing the num1 in the display  

        } else if (e.target.classList.contains('dot')) {                             // SUBCASE 2: when the user presses the dot:
            num1 += e.target.textContent;
            document.querySelector('input').value += e.target.textContent;
            dotButton.removeEventListener('click', getInputs);                      // Disabling the dot button, if we aldready have a decimal dot
        

        } else if (e.target.classList.contains('function')) {                       // SUBCASE 3: when the user presses an operator:
            operator = e.target.textContent;
            num1Switch = false;
            num2Switch = true;
            document.querySelector('input').value = '';                             // Reseting the display when users presses an operator
            dotButton.addEventListener('click', getInputs);                         // Enabling the dot button for the num2 (next step)
        };  

    } else if (num1Switch === false &&                                                      // CASE 2: getting the num 2 
                num2Switch === true) {
                    
                if (e.target.classList.contains('number')) {                                // SUBCASE 1: if a user presses a number:
                    
                    num2 += e.target.textContent;                                           // getting the num2 (second number)
                    document.querySelector('input').value += e.target.textContent;          // printing the num2 in the display  

                } else if (e.target.classList.contains('dot')) {                            // SUBCASE 2: if the user presses the dot:
                    num2 += e.target.textContent;
                    document.querySelector('input').value += e.target.textContent;
                    dotButton.removeEventListener('click', getInputs);                      // Disabling the dot button, if we aldready have a decimal dot

                } else if (e.target.classList.contains('function')) {                       // SUBCASE 3: if a user presses an operator again:

                    operate(num1, num2, operator);                                          // Calling the function, so we get the result
                    displayField.value = operate(num1, num2, operator);                     // Displaying the result
                    num1 = displayField.value;                                              // This takes the result as the new num1
                    num2 = 0;                                                               // This resets num2, so we can listen for a new one.
                    operator = e.target.textContent;
                    displayField.value = '';                                                // Reseting the display when users presses an operator
                    dotButton.addEventListener('click', getInputs);                         // Reseting - enabling the dot button for the num2 (next step)
                };

} else if (num1Switch === true &&                                                        // CASE 3: when result is printed after pressing "=", restart the calculator if the user presses a number
            num2Switch === false &&
            resultSwitch === true) {  
                if (e.target.classList.contains('number')) {                         // SUBCASE 1: user presses a number after the result is printed
                    document.querySelector('input').value = ''; 
                    document.querySelector('input').value = e.target.textContent;
                    num1 = e.target.textContent; 
                    resultSwitch = false;                                             // Quits the result case and enables the CASE 1
                    
                } else if ( e.target.classList.contains('dot')) {                     // SUBCASE 2: if the user presses the dot button
                    num1 += e.target.textContent;                                     // Adds the dot to the current number (result)
                    document.querySelector('input').value += e.target.textContent;    // Prints the dot on the screen
                    dotButton.removeEventListener('click', getInputs);                // Disables the dot button
                    resultSwitch = false;                                             // Quits the result case

                } else if (e.target.classList.contains('function')) {                 // SUBCASE 3: when the user presses an operator after result is printed:
                    operator = e.target.textContent;
                    num1Switch = false;                                               // Stop listening for num 1 and start listening for num2
                    num2Switch = true;
                    resultSwitch = false;                                             // Quits the result case and enables the CASE 1
                    document.querySelector('input').value = '';                       // Reseting the display when users presses an operator
                    dotButton.addEventListener('click', getInputs);                   // Enabling the dot button for the next step
                };
    };
};

// Adding the main function above to all buttons. This is done here below, so we can use NAMED function.
// We need a named function to be able to remove the event listener when needed (dot button).

allButtons.forEach((btn) => {
    btn.addEventListener('click', getInputs);
});

// end of main function
//___________________________________________________________________________________________________________________________________________________________________________________________________



// Operation functions, changing all inputs to numbers

let add = (num1, num2) => {
    return Number(num1) + Number(num2);
};

let subtract = (num1, num2) => {
    return Number(num1) - Number(num2);
};

let multiply = (num1, num2) => {
    return Number(num1) * Number(num2);
};

let divide = (num1, num2) => {
    return Number(num1) / Number(num2);
};


// Function operate, which calls specific operation, depending on
// which operator we choose.

let operate = (num1, num2, operator) => {
    
    if (operator === '+') {
        return add(num1, num2);

    } else if (operator === '-') {
        return subtract(num1, num2);

    } else if (operator === '×') {
        return multiply(num1, num2);
        
    } else if (operator === '÷') {
        return divide(num1, num2);   
    };
};



// Adding functionality to button 'equals'

document.querySelector('#button-equals').addEventListener('click', () => {
    operate(num1, num2, operator);                              // Calling the operate function
    displayField.value = operate(num1, num2, operator);         // Displaying the result
    if (displayField.value.length > 6) {                        // Limiting the length of the result (for long decimals)
        displayField.value = displayField.value.substr(0, 8)
    };
    if (displayField.value == Infinity || displayField.value == 'NaN' || displayField.value == 'undefine'){  // Display 'error' when value is invalid
        displayField.value = 'error';                           
    };
    num1Switch = true;                                          // This resets the Eventlistener and the calculator
    num2Switch = false;                                         // This stops listening for num2 when we press =
    resultSwitch = true;
    num1 = displayField.value;                                  // This sets the result as the new num1.
    num2 = 0;                                                   // This resets the num 2, so we can listen for a new num2.
    if (Number(displayField.value) % 1 === 0) {                                                
        dotButton.addEventListener('click', getInputs);         // This enables the dot button for the  new num2
    }else {
        dotButton.removeEventListener('click', getInputs); 
    };                                                          // If the result is not a whole number, disable dot button.
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
    resultSwitch = false;
    dotButton.addEventListener('click', getInputs);
});