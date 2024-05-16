// Check trivia answer
function checkTriviaAnswer() {
    const answer = document.getElementById('trivia-answer').value.trim();
    const responseDiv = document.getElementById('trivia-response');

    if (answer.toLowerCase() === 'paris') {
        responseDiv.textContent = `You guessed ${answer}. Correct!`;
    } else {
        responseDiv.textContent = `You guessed ${answer}. Incorrect. Try again!`;
    }
}

// Event listener for clicking submit
document.getElementById('trivia-submit').addEventListener('click', checkTriviaAnswer);

// Event listener for hitting enter
document.getElementById('trivia-answer').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkTriviaAnswer();
    }
});

// Function to check if a number is odd or even and validate 5-digit input
function checkNumber() {
    const numberInput = document.getElementById('number-input').value.trim();
    const responseDiv = document.getElementById('number-response');
    const number = parseInt(numberInput, 10);

    if (isNaN(number) || !Number.isInteger(number) || numberInput.length !== 5) {
        responseDiv.textContent = 'Please enter a valid 5-digit integer.';
        return;
    }

    if (number % 2 === 0) {
        responseDiv.textContent = `The number ${number} is even.`;
    } else {
        responseDiv.textContent = `The number ${number} is odd.`;
    }
}

// Event listener for clicking on submit
document.getElementById('number-submit').addEventListener('click', checkNumber);

// Event listener for hitting enter
document.getElementById('number-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkNumber();
    }
});