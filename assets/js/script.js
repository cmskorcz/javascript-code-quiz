const mainEl = document.querySelector('main');
const startBtnEl = document.querySelector('#start-btn');
const answerBtnEl = document.querySelector('.answer-btn')

let timeCount = 75

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

    setInterval(postTime, 1000);
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
        console.log(timeCount);
        return clearInterval()
    }

    timeCount--;
}

const checkAnswer = (event) => {
    let answer = event.target;
    const containerEl = document.querySelector('.container-flex')
    const feedbackEl = document.createElement('div');
    feedbackEl.className = "feedback-flex"
    
    if (answer.value === question.answer) {
        feedbackEl.innerHTML = "<h3>Correct!</h3>";
    } else {
        feedbackEl.innerHTML = "<h3>Incorrect!</h3>";
        timeCount = timeCount - 5;
    };

    containerEl.appendChild(feedbackEl);
};

startBtnEl.addEventListener('click', createQuestion);
