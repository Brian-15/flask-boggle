
const BASE_URL = 'http://127.0.0.1:5000';
const $msg = $('#messages');
const $guess = $('#guess');
const $score = $('#score');
const $form = $('form');
const $timer = $('#timer');
let gameOver = false;

async function handleGuess(evt) {
    evt.preventDefault();

    if (gameOver) return;

    const word = $guess.val();
    $guess.val('');

    const response = await axios({
        url: `${BASE_URL}/guess`,
        method: 'GET',
        params: {
            word: word,
        }
    });

    const answer = response.data.result;
    
    // update message for user
    $msg.text(`${word} is ${answer.replace(/-/g, ' ')}`);

    // add score if valid word
    if (answer == 'ok') $score.text(Number($score.text()) + word.length);

    return answer;
}

$form.on('submit', handleGuess)

const timerInterval = setInterval(() => {
    $timer.text($timer.text() - 1)
}, 1000);

setTimeout(() => {
    gameOver = true;
    clearInterval(timerInterval);
    $timer.text("Time over!");
}, 60000);