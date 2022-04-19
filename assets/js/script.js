// Grab Elements off of initial screen
const mainEl = document.querySelector('main');
const startBtnEl = document.querySelector('#start-btn');
const answerBtnEl = document.querySelector('.answer-btn')

// Initialize timer, intervalID, and score
let timeCount = 75
let intervalID;
let scoreCount = 0;
let highScores;

// Question Array
const question = [
    {
        heading: "This is a question?",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        answer: "Answer 3"
    },
    {
        heading: "This is also a question?",
        options: ["Answer 5", "Answer 6", "Answer 7", "Answer 8"],
        answer: "Answer 5"
    }
]
// Initialize question idex counter
let questionIndex;

// Creates first question on the page
const createQuestion = () => {
    questionIndex = 0;

    const questionContainerEl = document.createElement('div');
    const questionHeadingEl = document.createElement('h2');
    const answerContainerEl = document.createElement('div');

    questionContainerEl.className = "container-flex";
    answerContainerEl.className = "answer-flex";

    questionHeadingEl.textContent = question[questionIndex].heading;

    mainEl.replaceWith(questionContainerEl);

    questionContainerEl.appendChild(questionHeadingEl);

    generateAnswers(answerContainerEl, questionIndex);

    questionContainerEl.appendChild(answerContainerEl);

    startTimer();
};

// Replaces previous question values with next question values and content
const nextQuestion = (index) => {
    if (index < question.length) {
        const questionHeadingEl = document.querySelector('h2');

        questionHeadingEl.textContent = question[index].heading;
        replaceAnswers(question[index]);    
    } else {
        stopTimer();
        return endQuiz();
    }
};

// Starts quiz timer
const startTimer = () => {
    intervalID = setInterval(postTime, 1000);
};

// Ends quiz timer
const stopTimer = () => {
    clearInterval(intervalID);
};

// Populates answer buttons within the first question
const generateAnswers = (container, index) => {
    let answerArray = question[index].options
    for (let i = 0; i < answerArray.length; i++) {
        let answer = document.createElement('button');
        answer.className = "btn answer-btn";
        answer.textContent = answerArray[i];
        answer.setAttribute('value', answerArray[i]);
        answer.setAttribute('data-id', i);

        answer.addEventListener('click', checkAnswer);

        container.appendChild(answer);
        
    };
};

// Replaces answer values and content within nextQuestion()
const replaceAnswers = (index) => {
    let answerArray = index.options
    for (let i = 0; i < answerArray.length; i++) {
        let answer = document.querySelector(`button[data-id="${i}"]`);
        answer.textContent = answerArray[i];
        answer.setAttribute('value', answerArray[i]);
        answer.setAttribute('data-id', i);
    }
}

// Updates timer on page
const postTime = () => {
    const timerSpanEl = document.getElementById("time");
    timerSpanEl.innerHTML = `Timer: ${timeCount}`
    
    if (parseInt(timeCount) <= 0) {
        stopTimer();
        return endQuiz();
    }

    return timeCount--;
}

// Checks the value of the option selected with the actual question answer
const checkAnswer = (event) => {
    let answer = event.target;

    const containerEl = document.querySelector('.container-flex')
    let feedbackEl = document.querySelector('div[class="feedback-flex"]');
    
    if(!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = "feedback-flex"
        containerEl.appendChild(feedbackEl);
    };

    if (answer.value === question[questionIndex].answer) {
        feedbackEl.innerHTML = "<h3>Correct!</h3>";
        questionIndex++;
    } else {
        feedbackEl.innerHTML = "<h3>Incorrect!</h3>";
        timeCount = timeCount - 5;
        questionIndex++;
    };
    
    nextQuestion(questionIndex);
};

// Ends the quiz and displays score
const endQuiz = () => {
    const questionContainerEl = document.querySelector('div[class="container-flex"]');
    const scoreContainerEl = document.createElement('div');
    const formEl = document.createElement('form');
    const nameLabelEl = document.createElement('label');
    const nameInputEl = document.createElement('input');
    const scoreBtnEl = document.createElement('button')

    nameLabelEl.textContent = "Enter Your Initials!";
    nameLabelEl.setAttribute('for', 'name');
    
    nameInputEl.setAttribute('id', 'name');
    
    scoreBtnEl.textContent = 'Submit';
    scoreBtnEl.className = 'btn';
    scoreBtnEl.setAttribute('type', 'submit')

    scoreCount = timeCount;
    
    scoreContainerEl.className = 'container-flex';
    scoreContainerEl.innerHTML = `<h3>Score: ${scoreCount}`;
    questionContainerEl.replaceWith(scoreContainerEl);
    scoreContainerEl.appendChild(formEl);
    formEl.appendChild(nameLabelEl);
    formEl.appendChild(nameInputEl);
    formEl.appendChild(scoreBtnEl);

    formEl.addEventListener('submit', saveScore)
}

// Saves high score to localstorage
const saveScore = () => {
    let storedScores = localStorage.getItem('scores');
    
    // If no key of scores, create key with value of array containing score
    if (!storedScores) {
        highScores = [scoreCount];
        localStorage.setItem('scores', JSON.stringify(highScores));
    
    // Else parse stored score, push new score, and reset stored value
    } else {
        let newHighScores = JSON.parse(storedScores);
        newHighScores.push(scoreCount);
        localStorage.setItem('scores', JSON.stringify(newHighScores));
    }
}

startBtnEl.addEventListener('click', createQuestion);
