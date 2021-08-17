
const BASE_URL = 'http://127.0.0.1:5000';
const $msg = $('#messages');
const $guess = $('#guess');
const $score = $('#score');
const $highScore = $('#high-score');
const $form = $('form');
const $timer = $('#timer');
const $startBtn = $('#start-btn');
const $playCount = $('#play-count');
const game = new BoggleGame();

async function handleGuess(evt) {
    evt.preventDefault();

    if (game.gameOver) return;

    const word = $guess.val();
    $guess.val('');

    const answer = await game.guess(word);

    // update message for user
    $msg.text(`${word} is ${answer.replace(/-/g, ' ')}`);

    // add score if valid word
    if (answer == 'ok') $score.text(Number($score.text()) + word.length);

    return answer;
}

$form.on('submit', handleGuess)

async function endGame() {

    $msg.hide();
    $startBtn.text("Play Again?").show();

    const score = $score.text();
    const currHighScore = $highScore.text();
    const highScore = currHighScore > score? currHighScore: score;
    $highScore.text(highScore);
    
    $playCount.text(await game.submitScore(highScore));
}

function handleStart(){

    game.start();
    $startBtn.hide();
    $msg.text("Guess a word on the board.").show();

    $timer.text(60);
    $score.text(0);

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
