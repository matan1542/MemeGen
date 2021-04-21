

let gCountLines = 0;
let gYPos = 50;
let gHeight = 50;
let gImgMemes = [];
let gIsTouch = false;
const gTouchEvs = ['panstart', 'panmove', 'panend'];
let KEY = 'memes';
let gMeme = {
    selectedImgId: makeId(),
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Inever eat Falafel',
            size: 40,
            align: 'center',
            color: 'red',
            family: 'Impact',
            x: 250,
            y: gHeight,
            isDragging: false
        }
    ]
}
let gLastLine;

function getTouchEvs() {
    return gTouchEvs;
}
function isTouched() {
    return gIsTouch;
}
function ifSelected() {
    gMeme.lines.forEach((line, index) => {
        if (gMeme.selectedLineIdx !== index) {
            line.color = 'black';
        } else {

            line.color = 'red';


        }
    })
    // clearCanvas();
    drawDetails();
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5;
    drawImg();
}
function isLineClicked(clickedPos) {
    const pos = {
        x: gMeme.lines[gMeme.selectedLineIdx].x,
        y: gMeme.lines[gMeme.selectedLineIdx].y
    }
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // pos.x + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    return distance <= gMeme.lines[gMeme.selectedLineIdx].x + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
}



function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 12) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 5;
    drawImg();
}


function addLine() {
    let count = gCountLines;
    gHeight = gMeme.lines[count].y;
    if (gHeight + 160 > gCanvas.height) return;
    gMeme.lines.push(createLine(250, gMeme.lines[gCountLines++].y + 150))
    gHeight += 150;
    gMeme.selectedLineIdx = gCountLines;
    ifSelected();

}
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateTxtLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
    drawImg();
    // drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y, gMeme.lines[gMeme.selectedLineIdx]);

}


function removeLine() {
    let count = gMeme.selectedLineIdx;
    if (count-- <= 0) {
        gMeme.selectedLineIdx = 0
        gCountLines = 0;
        return;
    } else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
        gMeme.selectedLineIdx--;
        gCountLines--;
    }


    ifSelected()
    drawImg();
}


function moveToPrevLine() {
    gMeme.selectedLineIdx = (!gMeme.selectedLineIdx) ? 0 : gMeme.selectedLineIdx - 1;
    ifSelected();

}

function moveToNextLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? gMeme.selectedLineIdx : gMeme.selectedLineIdx + 1
    ifSelected();
}


function drawText() {
    gMeme.lines.forEach(line => {
        gCtx.fillStyle = (line.pickedColor) ? line.pickedColor : line.color;
        gCtx.strokeStyle = 'black';
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);

    })
}
//function that will check if localStorage is empty or not and load the memes accordingly
function loadMemesLocalStorage() {
    if (!loadFromStorage(KEY)) {
        gImgMemes = [];
    }
    else {
        gImgMemes = loadFromStorage(KEY);
    }
}

function saveMeme() {
    loadMemesLocalStorage();
    let img = gCanvas.toDataURL("image/png");
    // onSuccess(img);
    gImgMemes.push(img);
    saveToStorage(KEY, gImgMemes);
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        gIsTouch = true;
        // ev.preventDefault()
        pos = {
            x: ev.center.x,
            y: ev.center.y
        }
    }
    return pos
}

function setImgCanvBgImg() {
    gCanvas.style = `background-image: url("materials/img/${gMeme.selectedImgId}.jpg");background-size: cover;`
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


function drawDetails() {
    drawText();
}

function alignText(val) {

    gMeme.lines[gMeme.selectedLineIdx].align = val;
    drawImg();
}

function changeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].pickedColor = val;
    drawImg();
}
function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function moveLine(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].x = x;
    gMeme.lines[gMeme.selectedLineIdx].y = y;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function createLine(x = 250, y) {
    const line = {
        txt: 'Inever eat Falafel',
        size: 40,
        align: 'center',
        color: 'red',
        family: 'Impact',
        x,
        y
    }
    return line;
}


function drawImg() {

    const elImg = new Image()
    elImg.src = `materials/img/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        drawDetails();
    }
}

function getImgs() {
    return gImg;
}
