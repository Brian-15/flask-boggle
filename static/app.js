
const BASE_URL = 'http://127.0.0.1:5000';
const $msg = $('#messages');
const $guess = $('#guess');
const $score = $('#score');

async function handleGuess(evt) {
    evt.preventDefault();
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
    if (answer == 'ok') $score.text(Number(score.text()) + word.length);

    return answer;
}

function addScore(word) {
}

$('form').on('submit', handleGuess)