let gCanvas
let gCtx

function onInit() {
    renderImgs();
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const line = getCurrLine();
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    line.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const line = getCurrLine();
    if (line.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        let distanceX = line.x + dx
        let distanceY = line.y + dy
        moveLine(distanceX, distanceY);
        gStartPos = pos
        drawImg();
    }
}

function onUp() {
    const line = getCurrLine();
    line.isDragging = false
    document.body.style.cursor = 'grab'
}
function renderImgs() {
    const elImageContainer = document.querySelector('.images-wrapper');
    let imgs = getImgs();
    var strHtml = imgs.map((img) => {
        return `<img onclick="onOpenMemeEditor(this)" data-id="${img.id}" src="${img.url}">`
    });
    elImageContainer.innerHTML = strHtml.join('');
}

function onRemoveLine() {
    removeLine();
}
function onOpenGalleryMemes() {
    renderImgMemes();
    const elMemesContainer = document.querySelector('.memes-container');
    elMemesContainer.hidden = false;

}

function openMemeEditor(elImg) {
    let elCanvasContainer = document.querySelector('.editor-container');
    elCanvasContainer.hidden = false;
    setNewImg(elImg.dataset.id)
    renderCanvas(elImg.dataset.id);
}


function onOpenMemeEditor(elImg) {
    openMemeEditor(elImg)
}


function onFormMeme(ev) {
    ev.preventDefault();
}
function onSaveMeme() {
    drawImg();
    saveMeme();
}
function onUpdateTxtLine(val) {
    updateTxtLine(val);
}

function onIncreaseFont() {
    increaseFont();
}

function onDecreaseFont() {
    decreaseFont();
}

function onAlignText(val) {
    alignText(val);
}

function onAddLine() {
    addLine();
    document.querySelector('.input-text').value = getCurrLine().txt;
}

function onPrevLine() {
    moveToPrevLine();
    document.querySelector('.input-text').value = getCurrLine().txt;
}

function onMoveNextLine() {
    moveToNextLine();
    document.querySelector('.input-text').value = getCurrLine().txt;
}
function onChangeColor(val) {
    changeColor(val);
}


function renderCanvas(id = 'my-canvas', containerClass = 'canvas-container') {
    var strHtml = `<canvas id="${id}">
    </canvas>`;
    document.querySelector(`.${containerClass}`).innerHTML = strHtml;
    gCanvas = document.getElementById(`${id}`);
    gCtx = gCanvas.getContext('2d');
    // Can't make the width of the canvas match to his container for now
    resizeCanvas();
    drawImg()
    drawDetails();
    addListeners();


}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    // TODO: redraw..
}
