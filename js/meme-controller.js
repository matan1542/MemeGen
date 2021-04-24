let gCanvas
let gCtx
let gIsTouch = false;
let gIsMenuOpen = false;
let gCountFlex = 0;
function onInit() {
    renderImgs();
    setInterval(handleDropDownMenu, 100);
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
    ev.preventDefault()
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
    if (gIsTouch) gIsTouch = false;
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function renderImgs() {
    const elImageContainer = document.querySelector('.images-wrapper');
    let imgs = getImgs();
    var strHtml = imgs.map((img) => {

        return `<img data-id="${img.id}" onclick="onOpenMemeEditor(this)"  src="${img.url}">`
    });
    elImageContainer.innerHTML = strHtml.join('');
}

function onRemoveLine() {
    removeLine();
}


function onOpenGalleryMemes() {
    //when rendring memes saved gallery remove the editor container from the viewport for the footer to sit correctly

    renderImgMemes();
    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = true;
    const elImageContainer = document.querySelector('.main-content');
    elImageContainer.style.display = 'none';
    const elMemesContainer = document.querySelector('.memes-container');
    elMemesContainer.hidden = false;

}
function openMemeEditor(elImg) {
    const elImageWrapper = document.querySelector('.main-content');
    const elCanvasContainer = document.querySelector('.editor-container');
    const elMemesContainer = document.querySelector('.memes-container');
    const elInputText = document.querySelector('.input-text');
    const meme = getMeme();
    elCanvasContainer.hidden = false;
    elMemesContainer.hidden = true;
    elImageWrapper.style.display = 'none';
    elInputText.value = meme.lines[0].txt;
    setNewImg(elImg.dataset.id)
    renderCanvas();
}





function toggleMenu() {
    const elDropDown = document.querySelector('.main-menu-wrapper ul');
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    if (!gIsMenuOpen) {
        gIsMenuOpen = true;
        elDropDown.style.display = 'flex';
    } else {
        elDropDown.style.display = 'none';
        gIsMenuOpen = false;
    }
    elDropDown.classList.toggle('menu-open')

}
function handleDropDownMenu() {
    const elDropDown = document.querySelector('.main-menu-wrapper ul');
    const screenWidth = window.innerWidth;
    if (screenWidth >= 870) {
        gCountFlex = 0;
        elDropDown.classList.remove('menu-open')
        elDropDown.style.display = 'flex';
    } else if (!gCountFlex) {
        console.log('smaller then')
        elDropDown.style.display = 'none';
        gCountFlex++;
    }
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
    var strHtml = `<canvas id="${id}" class = "canvas-editor">
    </canvas>`;
    document.querySelector(`.${containerClass}`).innerHTML = strHtml;
    gCanvas = document.getElementById(`${id}`);
    gCtx = gCanvas.getContext('2d');

    resizeCanvas();
    drawImg()
    drawDetails();
    addListeners();
}



function OnUpdateCanvas(img) {
    updateCanvas(img);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    getTheCurrSizes(gCanvas.width);
    // TODO: redraw..
}
