
const BASE_URL = 'http://127.0.0.1:5000'
const $msg = $('#messages')
const $input = $('input')

async function guess(evt) {
    evt.preventDefault();
    const word = $input.val();
    $input.val('');

    const response = await axios({
        url: `${BASE_URL}/guess`,
        method: 'GET',
        params: {
            word: word,
        }
    });

    const answer = response.data.result;
    $msg.text(answer);

    return answer;
}

function displayResult(word, answer) {
    
}

$('form').on('submit', guess)