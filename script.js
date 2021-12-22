const numberButtons = document.querySelectorAll('.number');
const functionButtons = document.querySelectorAll('.function');
const allButtons = document.querySelectorAll('.button');
const dotButton = document.querySelector('#button-dot')
const minusButton = document.querySelector('#button-subtract');
const displayField = document.querySelector('input');
const history = document.querySelector('#display-upper');


let num1 = '';
let num2 = '';
let operator = '';

let num1Switch = true;
let num2Switch = false;
let resultSwitch = false;

let resultValueToPrintInHistory = 0;

// Main function which collects number 1, number 2 and operator.
// It uses the switches, which turn on and off, depending on
// which value we need. It has to be NAMED, so we can remove
// the event listeners when we need to.
//___________________________________________________________________________________________________________________________________________________________________________________________________

function getInputs (e) {

    if( num1Switch === true &&                                                      // CASE 1: getting the num1 and operator
        num2Switch === false &&
        resultSwitch === false) {

        if (!num1 && e.target.classList.contains('subtract')){                          // If we want to enter a negative number and press (-) button first:
            num1 += e.target.textContent;                                               // Start num1 with a (-)
            document.querySelector('input').value += e.target.textContent;              // Print - to display
            minusButton.removeEventListener('click', getInputs);                        // Temporarily disable the - button, so we cannot type multiple -
        
        }else{

            if (e.target.classList.contains('number')) {                                // SUBCASE 1: when the user presses a number:
                num1 += e.target.textContent;                                           // getting the num1 (first number)
                document.querySelector('input').value += e.target.textContent;          // printing the num1 in the display  
                minusButton.addEventListener('click', getInputs);                       // Negative numbers: enable - button when entering a digit, if it was disabled before

            } else if (e.target.classList.contains('dot')) {                            // SUBCASE 2: when the user presses the dot:
                num1 += e.target.textContent;
                document.querySelector('input').value += e.target.textContent;
                dotButton.removeEventListener('click', getInputs);                      // Disabling the dot button, if we aldready have a decimal dot
            

            } else if (e.target.classList.contains('function')) {                       // SUBCASE 3: when the user presses an operator:
                operator = e.target.textContent;
                num1Switch = false;
                num2Switch = true;
                document.querySelector('input').value = '';                             // Reseting the display when users presses an operator
                history.textContent = Number(num1) + ' ' + operator;
                dotButton.addEventListener('click', getInputs);                         // Enabling the dot button for the num2 (next step)
            };  
        };

    } else if (num1Switch === false &&                                                          // CASE 2: getting the num 2 
                num2Switch === true) {
                
                if (!num2 && e.target.classList.contains('subtract')){                          // If we want to enter a negative number and press (-) button first:
                    num2 += e.target.textContent;                                               // Start num2 with a (-)
                    document.querySelector('input').value += e.target.textContent;              // Print - to display
                    minusButton.removeEventListener('click', getInputs);                        // Temporarily disable the - button, so we cannot type multiple -
                
                }else{

                    if (e.target.classList.contains('number')) {                                // SUBCASE 1: if a user presses a number:
                        
                        num2 += e.target.textContent;                                           // getting the num2 (second number)
                        document.querySelector('input').value += e.target.textContent;          // printing the num2 in the display  
                        minusButton.addEventListener('click', getInputs);                       // Negative numbers: enable - button when entering a digit, if it was disabled before


                    } else if (e.target.classList.contains('dot')) {                            // SUBCASE 2: if the user presses the dot:
                        num2 += e.target.textContent;
                        document.querySelector('input').value += e.target.textContent;
                        dotButton.removeEventListener('click', getInputs);                      // Disabling the dot button, if we aldready have a decimal dot

                    } else if (e.target.classList.contains('function')) {                       // SUBCASE 3: if a user presses an operator again:

                        operate(num1, num2, operator);                                          // Calling the function, so we get the result
                        displayField.value = operate(num1, num2, operator);                     // Displaying the result
                        operator = e.target.textContent;                                        // Getting the operator
                        history.textContent += ' ' + Number(num2) + ' ' + operator;             // Printing to history display
                        num1 = displayField.value;                                              // This takes the result as the new num1
                        num2 = '';                                                              // This resets num2, so we can listen for a new one.         
                        displayField.value = '';                                                // Reseting the display when users presses an operator
                        dotButton.addEventListener('click', getInputs);                         // Reseting - enabling the dot button for the num2 (next step)
                    };
                };

} else if (num1Switch === true &&                                                    // CASE 3: when result is printed after pressing "=", restart the calculator if the user presses a number
            num2Switch === false &&
            resultSwitch === true) {  
                if (e.target.classList.contains('number')) {                         // SUBCASE 1: user presses a number after the result is printed
                    document.querySelector('input').value = ''; 
                    document.querySelector('input').value = e.target.textContent;
                    history.textContent = '';
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
                    history.textContent = 
                    //   history.textContent.substr(0, (history.textContent.length - 1)) 
                    //     + ' ' + operator;
                        resultValueToPrintInHistory + ' ' + operator;
                    dotButton.addEventListener('click', getInputs);                   // Enabling the dot button for the next step
                };
    };
};

// end of main function
//___________________________________________________________________________________________________________________________________________________________________________________________________


// Function that adds styling on click / touch on the buttons for 0,1s

let addStyle = (btn) => {
    btn.target.classList.add('pressedkey');           // Add styling
    this.setTimeout(function() {           // Remove styling
        btn.target.classList.remove('pressedkey')}, 100);
};


// Functions that add and remove styling on mouse hovering over elements

let addHoverStyle = (btn) => {
    btn.target.classList.add('pressedkey');
};

let removeHoverStyle = (btn) => {
    btn.target.classList.remove('pressedkey');
};


// Function that limits the display length to 9 characters, so that numbers
// do not overflow the display

let limitDisplay = () => {
    if (displayField.value.length > 7) {
        displayField.value = displayField.value.substr(0, 9)
    };
};


// Adding the FUNCTIONS above to all buttons. This is done using named functions.
// We need a named function to be able to remove the event listener when needed (dot button).

allButtons.forEach((btn) => {

    btn.addEventListener('click', getInputs);  // Call main function
    btn.addEventListener('click', limitDisplay);  // Limiting display length
    btn.addEventListener('click', addStyle);  // Call styling function
    btn.addEventListener('mouseenter', addHoverStyle);  // Hovering function
    btn.addEventListener('mouseleave', removeHoverStyle);

});


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

    displayField.value = operate(num1, num2, operator);         // Displaying the result
    
    if (displayField.value.length > 7) {                        // Limiting the length of the result (for long decimals)
        displayField.value = displayField.value.substr(0, 9)
    };
    if (displayField.value == Infinity || displayField.value == 'NaN' || displayField.value == 'undefined'){  // Display 'error' when value is invalid
        displayField.value = 'error';                           
    };


    const regex = new RegExp('\.');                              // If the result ends in zeroes after decimal dot, trim the zeroes
    if (displayField.value[displayField.value.length - 1] === '0'
         && (regex.test(displayField.value))) {
            displayField.value = Number(displayField.value);
        };

    if(num2){                                                   // Showing the calculation history
        history.textContent += ' ' + Number(num2) + ' ' + '=';
    };     

    if (displayField.value == 'error'){                         // If we get an error, delete calc.history
        history.textContent = '';                           
    };
    
    resultValueToPrintInHistory = displayField.value;           // If after result we use an operator, this prints the result in history
    
    num1Switch = true;                                          // This resets the Eventlistener and the calculator
    num2Switch = false;                                         // This stops listening for num2 when we press =
    resultSwitch = true;
    
    num1 = displayField.value;                                  // This sets the result as the new num1.
    num2 = '';                                                   // This resets the num 2, so we can listen for a new num2.
    
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
    history.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
    num1Switch = true;
    num2Switch = false;
    resultSwitch = false;
    dotButton.addEventListener('click', getInputs);
});



// Adding keyboard support:
// Function that takes a button as argument and presses key:

let pressKey = (element) => {
    document.getElementById(element).click();  // Clicks on element
    document.getElementById(element).classList.add('pressedkey');  // Adds animation for 0,1s
    this.setTimeout(function() {document.getElementById(element).classList.remove('pressedkey')}, 100);
}


// Function that takes (e) from eventListener and maps keys to elements
let keyFunction = (e) => {

    if (e.key === '1') { pressKey('button1'); };
    if (e.key === '2') { pressKey('button2'); };
    if (e.key === '3') { pressKey('button3'); };
    if (e.key === '4') { pressKey('button4'); };
    if (e.key === '5') { pressKey('button5'); };
    if (e.key === '6') { pressKey('button6'); };
    if (e.key === '7') { pressKey('button7'); };
    if (e.key === '8') { pressKey('button8'); };
    if (e.key === '9') { pressKey('button9'); };
    if (e.key === '0') { pressKey('button0'); };
    if (e.key === '.') { pressKey('button-dot'); };
    if (e.key === 'Enter') { pressKey('button-equals'); };
    if (e.key === '=') { pressKey('button-equals'); };
    if (e.key === 'Backspace') { pressKey('button-back'); };
    if (e.key === 'Delete') { pressKey('button-back'); };
    if (e.key === 'Escape') { pressKey('button-c'); };
    if (e.key === 'c') { pressKey('button-c'); };
    if (e.key === '+') { pressKey('button-add'); };
    if (e.key === '-') { pressKey('button-subtract'); };
    if (e.key === '/') { pressKey('button-divise'); };
    if (e.key === '*') { pressKey('button-multiply'); };
};


// Eventlistener for the keyboard, calls the function above:
document.addEventListener('keydown', (e) => {
    keyFunction(e);
});
