let gImgs = [];
let gKeywords = { 'happy': 12, 'funny puk': 1 };
let gId = 1;
let gImg = _loadImgs();


function createImg(num) {
    const img = {
        id: gId++,
        url: `materials/img/${num}.jpg`,
        keywords: ['happy']
    }
    return img;
}


// set new img to our meme
function setNewImg(imgId) {
    gMeme.selectedImgId = imgId;
}


function _loadImgs() {
    let imgs = [];
    for (let i = 1; i <= 18; i++) {
        const img = createImg(i);
        imgs.push(img);
    }
    return imgs;
}



