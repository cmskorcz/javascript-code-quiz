const displayScores = () => {
    let scoresJSON = localStorage.getItem('scores');
    let scoresArray = JSON.parse(scoresJSON);

    let highscoreListEl = document.getElementById('highscores');

    for (score of scoresArray) {
        let scoreEl = document.createElement('li');
        scoreEl.textContent = score;
        highscoreListEl.appendChild(scoreEl);
    }
}

displayScores();