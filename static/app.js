
const BASE_URL = 'http://127.0.0.1:5000'

// Guess word form
$('body').append(
    $('<form>').append(
        $('<label>').attr({
            'for': 'guess',
        }).text('Guess word: '),
        $('<input>').attr({
            'type': 'text',
            'name': 'guess',
            'required': true,
        }),
        $('<button>').attr({
            'type': 'submit',
        }).text('Guess')
    )
)

async function guess(evt) {
    evt.preventDefault();
    const $input = $('input')
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

    return answer;
}

function displayResult(word, answer) {
    
}

$('form').on('submit', guess)