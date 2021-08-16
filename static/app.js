
const BASE_URL = 'http://127.0.0.1:5000';
const $msg = $('#messages');
const $guess = $('#guess');
const $score = $('#score');
const $highScore = $('#high-score');
const $form = $('form');
const $timer = $('#timer');
const $startBtn = $('#start-btn');
const $playCount = $('#play-count');
let gameOver = true;

async function handleGuess(evt) {
    evt.preventDefault();

    if (gameOver) return;

    const word = $guess.val();
    $guess.val('');

    const response = await axios.post('/guess',
        `guess=${word}`
    );

    const answer = response.data.result;
    
    // update message for user
    $msg.text(`${word} is ${answer.replace(/-/g, ' ')}`);

    // add score if valid word
    if (answer == 'ok') $score.text(Number($score.text()) + word.length);

    return answer;
}

$form.on('submit', handleGuess)

async function endGame() {

    gameOver = true;
    $msg.hide();
    $startBtn.text("Play Again?").show();

    const score = $score.text();
    const highscore = $highScore.text();
    $highScore.text(score > highscore? score: highscore);

    const response = await axios.post("/game-over", {"highscore": $highScore.text()});

    $playCount.text(response.data["play_count"]);
}

function handleStart(){

    gameOver = false;
    $startBtn.hide();
    $msg.text("Guess a word on the board.").show();

    $timer.text(60);

    const timerInterval = setInterval(() => {
        $timer.text($timer.text() - 1)
    }, 1000);

    // game over process
    setTimeout(() => {
        endGame();
        clearInterval(timerInterval);
        $timer.text("Time over!");
    }, 60000);
}

$msg.hide();
$startBtn.click(handleStart);
