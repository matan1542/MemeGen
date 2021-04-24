
let gCountLines = 0;
let gYPos = 50;
let gHeight = 50;
let gImgMemes = [];
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let KEY = 'memes';
let gCurrWidth = 0;
let gMeme = {
    id: makeId(),
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Inever eat Falafel',
            size: 40,
            align: 'center',
            color: 'red',
            family: 'Impact',
            x: (gCurrWidth / 2) + 160,
            y: gHeight,
            isDragging: false
        }
    ]
}
let gLastLine;


function getTheCurrSizes(width) {
    gCurrWidth = width;
}

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
    var startX = 0;
    let endx = gCanvas.width;
    if (clickedPos.x >= startX && clickedPos.x <= endx && clickedPos.y >= pos.y - 60 && clickedPos.y <= pos.y + 20) {
        return true;
    }
    return false;

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
    gImgMemes = (loadFromStorage(KEY)) ? loadFromStorage(KEY) : [];
    return gImgMemes;
}

function saveMeme() {
    loadMemesLocalStorage();
    let img = {
        url: gCanvas.toDataURL("image/png"),
        meme: gMeme
    };
  
    const boolean = gImgMemes.some(memeObj => memeObj.meme.id === img.meme.id);
    console.log(boolean)
    if (boolean) removeImg(img.meme.id);
    gImgMemes.push(img);
    saveToStorage(KEY, gImgMemes);
    onOpenGalleryMemes(gMeme.selectedImgId);
}



function findMemeById(imgId) {
    loadMemesLocalStorage();
    let memeUpdate = gImgMemes.find((memeObj) => {
        return memeObj.meme.id === imgId
    });
    gMeme = memeUpdate.meme;
    gMeme.selectedLineIdx = 0;
    gCountLines = 0;
}

function findImgIdxById(imgId) {
    let memeUpdateIdx = gImgMemes.findIndex((memeObj) => {
        return memeObj.meme.id === imgId
    });
    return memeUpdateIdx;
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

function getMeme() {
    return gMeme;
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
