const clearScoreEl = document.getElementById('clear-score')

const displayScores = () => {
    let scoresJSON = localStorage.getItem('scores');
    let scoresArray = JSON.parse(scoresJSON);

    let highscoreListEl = document.getElementById('highscores');

    if (scoresArray) {
        for (score of scoresArray) {
            let scoreEl = document.createElement('li');
            scoreEl.textContent = score;
            highscoreListEl.appendChild(scoreEl);
        }    
    }
}

const clearLocalStorage = () => {
    localStorage.clear();
    location.reload();
}

clearScoreEl.addEventListener('click', clearLocalStorage);
displayScores();