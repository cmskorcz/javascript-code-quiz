const mainEl = document.querySelector('main');
const startBtnEl = document.querySelector('#start-btn');

const question = {
    heading: "This is a question?",
    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]

}

// const questionArray = [
// ]


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
};

const generateAnswers = (container) => {

    for (let i = 0; i < question.options.length; i++) {
        let answer = document.createElement('button');
        answer.className = "btn";
        answer.textContent = question.options[i];
        answer.setAttribute('value', question.options[i]);

        container.appendChild(answer);
    };
};

startBtnEl.addEventListener('click', createQuestion);