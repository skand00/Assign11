const circleArea = document.getElementById('circle-area');
const circleCount = document.getElementById('circle-count');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const resetBtn = document.getElementById('reset');

let circles = [];
let redoStack = [];

function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function updateCount() {
    circleCount.textContent = `Circles: ${circles.length}`;
}

function createCircle(x, y, color) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.background = color;
    circle.style.left = `${x - 25}px`;
    circle.style.top = `${y - 25}px`;
    circleArea.appendChild(circle);
    return circle;
}

circleArea.addEventListener('click', (e) => {
    if (e.target !== circleArea) return;
    const rect = circleArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = randomColor();
    const circle = createCircle(x, y, color);
    circles.push({ x, y, color, element: circle });
    redoStack = [];
    updateCount();
});

undoBtn.addEventListener('click', () => {
    if (circles.length === 0) return;
    const last = circles.pop();
    last.element.remove();
    redoStack.push(last);
    updateCount();
});

redoBtn.addEventListener('click', () => {
    if (redoStack.length === 0) return;
    const circleData = redoStack.pop();
    const circle = createCircle(circleData.x, circleData.y, circleData.color);
    circles.push({ ...circleData, element: circle });
    updateCount();
});

resetBtn.addEventListener('click', () => {
    circles.forEach(c => c.element.remove());
    circles = [];
    redoStack = [];
    updateCount();
});

updateCount();
