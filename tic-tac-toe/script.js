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
];

let currentPlayer = 'circle';

function init() {
    render();
}

function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = 'circle';
    render();
}

function handleCellClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        const td = document.getElementById(`cell-${index}`);
        td.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        td.onclick = null; // Entferne das onclick-Attribut

        const winningCombination = checkWin();
        if (winningCombination) {
            drawWinningLine(winningCombination);
            // Deaktiviere alle Zellen nach einem Gewinn
            for (let i = 0; i < fields.length; i++) {
                const cell = document.getElementById(`cell-${i}`);
                cell.onclick = null;
            }
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsle den Spieler
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Gibt die gewinnende Kombination zurück
        }
    }

    return null;
}

function drawWinningLine(winningCombination) {
    const contentDiv = document.getElementById('content');
    const svgNS = "http://www.w3.org/2000/svg";

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5');

    const [a, , c] = winningCombination;

    const positions = [
        { x: 35, y: 35 }, // Center of cell 0
        { x: 105, y: 35 }, // Center of cell 1
        { x: 175, y: 35 }, // Center of cell 2
        { x: 35, y: 105 }, // Center of cell 3
        { x: 105, y: 105 }, // Center of cell 4
        { x: 175, y: 105 }, // Center of cell 5
        { x: 35, y: 175 }, // Center of cell 6
        { x: 105, y: 175 }, // Center of cell 7
        { x: 175, y: 175 }, // Center of cell 8
    ];

    const startX = positions[a].x;
    const startY = positions[a].y;
    const endX = positions[c].x;
    const endY = positions[c].y;

    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '210');
    svg.setAttribute('height', '210');
    svg.setAttribute('style', 'position: absolute; pointer-events: none;');

    svg.appendChild(line);
    contentDiv.appendChild(svg);
}

function render() {
    const contentDiv = document.getElementById('content');
    let html = '<div style="position: relative;"><table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldIndex = i * 3 + j;
            const fieldValue = fields[fieldIndex];
            html += `<td id="cell-${fieldIndex}" onclick="handleCellClick(${fieldIndex})">${fieldValue === 'circle' ? generateCircleSVG() : fieldValue === 'cross' ? generateCrossSVG() : ''}</td>`;
        }
        html += '</tr>';
    }

    html += '</table></div>';
    contentDiv.innerHTML = html;
}

function generateCircleSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="10" fill="none">
                <animate attributeName="stroke-dasharray" from="0,188.4" to="188.4,188.4" dur="2s" fill="freeze" />
            </circle>
        </svg>
    `;
    return svg;
}

function generateCrossSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="10">
                <animate attributeName="stroke-dasharray" from="0,70" to="70,70" dur="1.5s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="10">
                <animate attributeName="stroke-dasharray" from="0,70" to="70,70" dur="1.5s" fill="freeze" />
            </line>
        </svg>
    `;
    return svg;
}

init();
