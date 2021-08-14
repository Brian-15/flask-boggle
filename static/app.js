
// generate word guess form
$('body').append(
    $('<form>').append(
        $('<label>').attr({
            'for': 'guess',
        }).text('Guess word: '),
        $('<input>').attr({
            'type': 'text',
            'name': 'guess',
        }),
        $('<button>').attr({
            'type': 'submit',
        }).text('Submit')
    ).attr('action', '/')
)