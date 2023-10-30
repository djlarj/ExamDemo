const nameModal = document.getElementById('nameModal');
const closeNameModal = document.getElementById('closeNameModal');
const nameSubmitButton = document.getElementById('nameSubmit');

// Show the name modal when the page loads
window.onload = function () {
    nameModal.style.display = 'block';
};

// Close the modal when the "Close" button is clicked
// closeNameModal.onclick = function () {
//     nameModal.style.display = 'none';
// };

// Close the modal when the user clicks outside of it
// window.onclick = function (event) {
//     if (event.target === nameModal) {
//         nameModal.style.display = 'none';
//     }
// };

// Add an event listener for the name submission
nameSubmitButton.addEventListener('click', function () {
    // Validate and process the user's name, then hide the modal
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (firstName && lastName) {
        userName = `${firstName} ${lastName}`;
        nameModal.style.display = 'none';
        displayQuestion();
    } else {
        alert('You must fill in both first and last name fields to get started.');
    }
});

const quizData = [
    {
        question: 'What is the hottest planet in our solar system?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        answer: 'Venus',
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        answer: 'Jupiter',
    },
    {
        question: 'Which planet was downgraded to a dwarf planet in our solar system?',
        options: ['Mercury', 'Venus', 'Mars', 'Pluto'],
        answer: 'Pluto',
    },
    {
        question: 'Which planet is known as the Red Planet in our solar system?',
        options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
        answer: 'Mars',
    },
    {
        question: 'Which planet is known as the Jewel Planet in our solar system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        answer: 'Saturn',
    },
  ];
  
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const mainMenuButton = document.getElementById('mainMenu');
// const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
  
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
  
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
  
function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(' ' + shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}
  
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';

    // Calculate the percentage
    const percentage = (score / quizData.length) * 100;

    // Initialize a message variable
    let message = `<br>${userName}<br>You scored ${score} out of ${quizData.length} (${percentage}%)`;

    // Check if the user's score is 80% or more and add a congratulatory message
    if (percentage >= 80) {
        message = `Congratulations! You Passed!\n${message}`;
    }

    // Add date and time stamp on separate lines
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const time = currentDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    message += `<br>Date: ${date}\nTime: ${time}<br>Please Print this page before exiting.`;

    // Display the result with the message
    resultContainer.innerHTML = message;

    // Check if the user's score is 100%
    if (score === quizData.length) {
        mainMenuButton.style.display = 'inline-block';
        // retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
    } else {
        // retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
    }
}

// function retryQuiz() {
//     currentQuestion = 0;
//     score = 0;
//     incorrectAnswers = [];
//     quizContainer.style.display = 'block';
//     submitButton.style.display = 'inline-block';
//     retryButton.style.display = 'none';
//     showAnswerButton.style.display = 'none';
//     resultContainer.innerHTML = '';
//     displayQuestion();
// }

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    mainMenuButton.style.display = 'inline-block';
    // retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    // Calculate the percentage
    const percentage = (score / quizData.length) * 100;

    // Initialize a message variable
    let message = `<br>${userName}<br>You scored ${score} out of ${quizData.length} (${percentage}%)`;

    // Check if the user's score is 80% or more and add a congratulatory message
    if (percentage >= 80) {
        message = `Congratulations! You Passed!\n${message}`;
    }    
    
    // Add date and time stamp on separate lines
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const time = currentDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    message += `<br>Date: ${date}\nTime: ${time}<br>Please Print this page before exiting.`;

    // Display the result with the message and incorrect answers
    resultContainer.innerHTML = `${message}\n\n<p>Incorrect Answers:</p>${incorrectAnswersHtml}`;
}

function goHome()
{
window.location.href="index.html"
}

submitButton.addEventListener('click', checkAnswer);
mainMenuButton.addEventListener('click', goHome);
// retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// displayQuestion();

//Back-to-Top button
const btn = $('#btt-button');

$(window).scroll(function() {
    btn.toggleClass('show', $(window).scrollTop() > 100);
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 100);
});