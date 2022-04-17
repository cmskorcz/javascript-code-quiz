// Grab Elements off of initial screen
const mainEl = document.querySelector('main');
const startBtnEl = document.querySelector('#start-btn');
const answerBtnEl = document.querySelector('.answer-btn')

// Initialize timer, intervalID, and score
let timeCount = 75
let intervalID;
let scoreCount = 0;

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

const nextQuestion = (index) => {
    const questionHeadingEl = document.querySelector('h2');

    questionHeadingEl.textContent = question[index].heading;
    replaceAnswers(question[index]);
};

const startTimer = () => {
    intervalID = setInterval(postTime, 1000);
};

const stopTimer = () => {
    clearInterval(intervalID);
};

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

const replaceAnswers = (index) => {
    let answerArray = index.options
    for (let i = 0; i < answerArray.length; i++) {
        let answer = document.querySelector(`button[data-id="${i}"]`);
        answer.textContent = answerArray[i];
        answer.setAttribute('value', answerArray[i]);
        answer.setAttribute('data-id', i);
    }
}

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
    let feedbackEl = document.querySelector('div[class="feedback-flex"]');
    
    if(!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = "feedback-flex"
        containerEl.appendChild(feedbackEl);
    };

    if (answer.value === question[questionIndex].answer) {
        feedbackEl.innerHTML = "<h3>Correct!</h3>";
        scoreCount = scoreCount + 10;
        questionIndex++;
    } else {
        feedbackEl.innerHTML = "<h3>Incorrect!</h3>";
        timeCount = timeCount - 5;
        questionIndex++;
    };
    
    nextQuestion(questionIndex);
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
