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
        heading: "JavaScript is the programming language of the _____.",
        options: ["Desktop", "Mobile", "Web", "Server"],
        answer: "Web"
    },
    {
        heading: "Which symbol is used separate JavaScript statements?",
        options: ["Comma (,)", "Colon (:)", "Hyphen (-)", "Semicolon (;)"],
        answer: "Semicolon (;)"
    },
    {
        heading: "JavaScript ignores?",
        options: ["Newlines", "Tabs", "Spaces", "All of the Above"],
        answer: "All of the Above"
    },
    {
        heading: "Which JavaScript method is used to access an HTML element by id?",
        options: ["getElementById()", "getElement(id)", "getElementById(id)", "elementById(id)"],
        answer: "getElementById(id)"
    },
    {
        heading: "Which property is used to define the HTML content to an HTML element with a specific id?",
        options: ["innerText", "innerContent", "elementText", "innerHTML"],
        answer: "innerHTML"
    },
    {
        heading: "Which JavaScript method is used to write on browser's console?",
        options: ["console.write()", "console.output()", "console.log()", "console.writeHTML()"],
        answer: "console.log()"
    },
    {
        heading: "Which JavaScript method is used to write into an alert box?",
        options: ["window.alertHTML()", "window.alert()", "window.alertBox()", "window.alertContent()"],
        answer: "window.alert()"
    },
    {
        heading: "In JavaScript, single line comment begins with ___.",
        options: ["#", "/*", "$", "//"],
        answer: "//"
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

    questionContainerEl.className = "flex";
    questionContainerEl.id = "question-container"
    answerContainerEl.className = "flex";
    answerContainerEl.id = "answer-container"

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

    const containerEl = document.getElementById('question-container')
    let feedbackEl = document.getElementById('feedback-container');
    
    if(!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = "flex";
        feedbackEl.id = "feedback-container";
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
    const questionContainerEl = document.getElementById('question-container');
    const scoreContainerEl = document.createElement('div');
    const formEl = document.createElement('form');
    const nameLabelEl = document.createElement('label');
    const nameInputEl = document.createElement('input');
    const scoreBtnEl = document.createElement('button');

    formEl.className = "flex"
    formEl.id = "form-container"

    nameLabelEl.textContent = "Enter Your Initials!";
    nameLabelEl.setAttribute('for', 'name');
    
    nameInputEl.setAttribute('id', 'name');
    
    scoreBtnEl.textContent = 'Submit';
    scoreBtnEl.className = 'btn';
    scoreBtnEl.setAttribute('type', 'submit')

    scoreCount = timeCount;
    
    scoreContainerEl.className = 'flex';
    scoreContainerEl.id = "player-score"
    scoreContainerEl.innerHTML = `<h2>Score: ${scoreCount}`;
    questionContainerEl.replaceWith(scoreContainerEl);
    scoreContainerEl.appendChild(formEl);
    formEl.appendChild(nameLabelEl);
    formEl.appendChild(nameInputEl);
    formEl.appendChild(scoreBtnEl);

    formEl.addEventListener('submit', saveScore)
}

// Saves high score to localstorage
const saveScore = (event) => {
    event.preventDefault();
    let nameInputEl = document.querySelector('input');
    let storedScores = localStorage.getItem('scores');

    let userName = nameInputEl.value
    
    // If no key of scores, create key with value of array containing score
    if (!storedScores) {
        highScores = [`${userName}: ${scoreCount}`];
        localStorage.setItem('scores', JSON.stringify(highScores));
    
    // Else parse stored score, push new score, and reset stored value
    } else {
        let newHighScores = JSON.parse(storedScores);
        newHighScores.push(`${userName}: ${scoreCount}`);
        localStorage.setItem('scores', JSON.stringify(newHighScores));
    }

    // Redirect to highscore page
    location.replace('./highscores.html');
}


startBtnEl.addEventListener('click', createQuestion);
