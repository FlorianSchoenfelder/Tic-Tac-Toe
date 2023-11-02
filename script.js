let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

function init() {
    render();
}

function render() {
    const container = document.getElementById('container');
    let tableHtml = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            tableHtml += '<td onclick="handleCellClick(' + (i * 3 + j) + ');">';
            const symbol = fields[i * 3 + j];
            if (symbol === 'circle') {
                tableHtml += generateAnimatedCircleSVG();
            } else if (symbol === 'cross') {
                tableHtml += generateAnimatedCrossSVG();
            }
            tableHtml += '</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    container.innerHTML = tableHtml;
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();
}

function handleCellClick(index) {
    if (fields[index] === null) {
        fields[index] = getNextPlayerSymbol(); // Abwechselnd "circle" oder "cross"
        const tdElement = document.getElementsByTagName('td')[index];
        tdElement.innerHTML = generateSymbolSVG(fields[index]);
        tdElement.removeAttribute('onclick');
    }
}

function getNextPlayerSymbol() {
    const circleCount = fields.filter(symbol => symbol === 'circle').length;
    const crossCount = fields.filter(symbol => symbol === 'cross').length;
    return circleCount <= crossCount ? 'circle' : 'cross';
}

function generateSymbolSVG(symbol) {
    if (symbol === 'circle') {
        return generateAnimatedCircleSVG();
    } else if (symbol === 'cross') {
        return generateAnimatedCrossSVG();
    }
}

// ...

function handleCellClick(index) {
    if (fields[index] === null) {
        fields[index] = getNextPlayerSymbol();
        const tdElement = document.getElementsByTagName('td')[index];
        tdElement.innerHTML = generateSymbolSVG(fields[index]);
        tdElement.removeAttribute('onclick');
        
        if (isGameWon(fields)) {
            // Das Spiel wurde gewonnen, zeichne die Siegerlinie
            const winningCombination = getWinningCombination(fields);
            drawWinningLine(winningCombination);
            disableAllCells(); // Deaktiviere alle Zellen nach dem Sieg
        }
    }
}

function disableAllCells() {
    const tdElements = document.getElementsByTagName('td');
    for (const tdElement of tdElements) {
        tdElement.removeAttribute('onclick');
    }
}

// Überprüfen, ob das Spiel gewonnen wurde
function isGameWon(gameState) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale
        [0, 4, 8], [2, 4, 6]              // Diagonale
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }

    return false;
}

// Finde die Gewinnkombination
function getWinningCombination(gameState) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return combination;
        }
    }

    return [];
}

// Zeichne die Siegerlinie
function drawWinningLine(winningCombination) {
    const [a, b, c] = winningCombination;
    const tds = document.getElementsByTagName('td');
    const lineElement = document.createElement('div');
    lineElement.className = 'winning-line';

    const x1 = tds[a].offsetLeft + tds[a].offsetWidth / 2;
    const y1 = tds[a].offsetTop + tds[a].offsetHeight / 2;
    const x2 = tds[c].offsetLeft + tds[c].offsetWidth / 2;
    const y2 = tds[c].offsetTop + tds[c].offsetHeight / 2;

    lineElement.style.left = x1 + 'px';
    lineElement.style.top = y1 + 'px';
    lineElement.style.width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 'px';
    lineElement.style.transform = 'rotate(' + Math.atan2(y2 - y1, x2 - x1) + 'rad)';
    lineElement.style.transformOrigin = 'top left';
    document.getElementById('container').appendChild(lineElement);
}

init();
// Füge das generierte SVG zur HTML-Seite hinzu
function generateAnimatedCrossSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("version", "1.1");

    const cross = document.createElementNS(svgNS, "path");
    cross.setAttribute("d", "M0,35 70,35 M35,0 35,70");
    cross.setAttribute("fill", "#FFC000");
    cross.setAttribute("stroke", "#FFC000");
    cross.setAttribute("stroke-width", "5");
    cross.setAttribute("transform", "rotate(45 35 35)");

    // Create an opacity animation
    const animateOpacity = document.createElementNS(svgNS, "animate");
    animateOpacity.setAttribute("attributeName", "opacity");
    animateOpacity.setAttribute("from", "0");
    animateOpacity.setAttribute("to", "1");
    animateOpacity.setAttribute("dur", "1s");
    animateOpacity.setAttribute("begin", "0s");
    animateOpacity.setAttribute("fill", "freeze");

    cross.appendChild(animateOpacity);

    svg.appendChild(cross);

    return svg.outerHTML;
}

function generateAnimatedCircleSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("stroke-dasharray", "188");
    circle.setAttribute("stroke-dashoffset", "188");

    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "188");
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "500ms");
    animate.setAttribute("begin", "0s");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svg.appendChild(circle);

    return svg.outerHTML;
}