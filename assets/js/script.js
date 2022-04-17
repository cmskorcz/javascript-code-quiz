// Grab Elements off of initial screen
const mainEl = document.querySelector('main');
const startBtnEl = document.querySelector('#start-btn');
const answerBtnEl = document.querySelector('.answer-btn')

// Initialize timer, intervalID, and score
let timeCount = 75
let intervalID;
let scoreCount = 0

// Question Array
const question = {
    heading: "This is a question?",
    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    answer: "Answer 3"
}


const createQuestion = () => {
    const questionContainerEl = document.createElement('div');
    const questionHeadingEl = document.createElement('h2');
    const answerContainerEl = document.createElement('div');

    questionContainerEl.className = "container-flex";
    answerContainerEl.className = "answer-flex";

    questionHeadingEl.textContent = question.heading;

    mainEl.replaceWith(questionContainerEl)

    questionContainerEl.appendChild(questionHeadingEl);

    generateAnswers(answerContainerEl);

    questionContainerEl.appendChild(answerContainerEl);

    startTimer();
};

const startTimer = () => {
    intervalID = setInterval(postTime, 1000);
};

const stopTimer = () => {
    clearInterval(intervalID);
};

const generateAnswers = (container) => {

    for (let i = 0; i < question.options.length; i++) {
        let answer = document.createElement('button');
        answer.className = "btn answer-btn";
        answer.textContent = question.options[i];
        answer.setAttribute('value', question.options[i]);
        answer.setAttribute('data-id', i);

        answer.addEventListener('click', checkAnswer);

        container.appendChild(answer);
        
    };
};

const postTime = () => {
    const timerSpanEl = document.getElementById("time");
    timerSpanEl.innerHTML = `Timer: ${timeCount}`
    
    if (parseInt(timeCount) <= 0) {
        stopTimer();
        return endQuiz();
    }

    return timeCount--;
}

const checkAnswer = (event) => {
    let answer = event.target;
    const containerEl = document.querySelector('.container-flex')
    const feedbackEl = document.createElement('div');
    feedbackEl.className = "feedback-flex"
    
    if (answer.value === question.answer) {
        feedbackEl.innerHTML = "<h3>Correct!</h3>";
        scoreCount = scoreCount + 10;
    } else {
        feedbackEl.innerHTML = "<h3>Incorrect!</h3>";
        timeCount = timeCount - 5;
    };

    containerEl.appendChild(feedbackEl);
};

const endQuiz = () => {
    const questionContainerEl = document.querySelector('div[class="container-flex"]');
    const scoreContainerEl = document.createElement('div');

    scoreCount = scoreCount + timeCount;

    scoreContainerEl.className = 'container-flex';
    scoreContainerEl.innerHTML = `<h3>Score: ${scoreCount}`;
    questionContainerEl.replaceWith(scoreContainerEl);
}

startBtnEl.addEventListener('click', createQuestion);
