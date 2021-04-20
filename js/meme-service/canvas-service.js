

let gCountLines = 0;
let gYPos = 50;
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
            y: 50,
            isDragging: false
        }
    ]
}
let gLastLine;

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
    clearCanvas();
    drawDetails();
}
function isLineClicked(clickedPos) {
    const pos = {
        x: gMeme.lines[gMeme.selectedLineIdx].x,
        y: gMeme.lines[gMeme.selectedLineIdx].y
    }
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // pos.x + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    console.log('distance', distance)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
}

function lineSelect(ev) {
    ev.preventDefault()
    gMeme.selectedLineIdx = gMeme.lines.findIndex((line) => {
        return (
            ev.changedPointers[0].offsetY < line.y &&
            ev.changedPointers[0].offsetY > line.y - line.size
        )
    })
    renderCanvas()
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 12) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 5;
    clearCanvas();
    drawDetails();
}


function addLine() {

    if (gMeme.lines[gCountLines].y + 160 > gCanvas.height) return;
    gMeme.lines.push(createLine(x = 250, gMeme.lines[gCountLines++].y + 150))
    gMeme.selectedLineIdx = gCountLines;
    ifSelected();

}
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateTxtLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
    clearCanvas();
    drawDetails();
    // drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y, gMeme.lines[gMeme.selectedLineIdx]);

}


function removeLine(){
    console.log('remove')
    gMeme.lines.splice(gMeme.selectedLineIdx,1);
    gMeme.selectedLineIdx --;
    ifSelected()
    renderCanvas();
    console.dir(gMeme.lines)
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
// function drawRect(x, y, line) {
//     gCtx.beginPath()
//     gCtx.strokeStyle = 'black'
//     gCtx.strokeRect(x, y - parseInt(line.size), gCtx.measureText(line.txt).width, 50)
//     gCtx.closePath()
// }

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
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
    clearCanvas();
    drawDetails();
}

function changeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].pickedColor = val;
    clearCanvas();
    drawDetails();
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
