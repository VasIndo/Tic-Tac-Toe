let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init(){
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldIndex = i * 3 + j;
            const fieldValue = fields[fieldIndex];
            html += `<td>${fieldValue === 'circle' ? 'o' : fieldValue === 'cross' ? 'x' : ''}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    contentDiv.innerHTML = html;
}

