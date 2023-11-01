let fields = [
    null,
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null
]

function init() {
    render();
}

// Die Funktion zum Rendern des Spielfelds
// Die vereinfachte Funktion zum Rendern des Spielfelds
function render() {
    const container = document.getElementById('container');
    let tableHtml = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            tableHtml += '<td>';
            const symbol = fields[i * 3 + j];
            tableHtml += symbol === 'circle' ? 'O' : symbol === 'cross' ? 'X' : '';
            tableHtml += '</td>';
        }
        tableHtml += '</tr>';
    }

    tableHtml += '</table>';
    container.innerHTML = tableHtml;
}




