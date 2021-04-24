

function renderImgMemes() {
    const elMemesContainer = document.querySelector('.memes-wrapper');
    let memes = loadFromStorage(KEY);
    let strHtml = memes.map((img) => {
        return ` <img data-memeid ="${img.meme.id}" data-id="${img.meme.selectedImgId}" onclick = "onOpenMemeUpdate(this)"  src="${img.url}" > `;
    })
    elMemesContainer.innerHTML = strHtml.join('');
}

function removeImg(imgId) {
    const idx = findImgIdxById(imgId);
    gImgMemes.splice(idx,1);
    saveToStorage(KEY,gImgMemes);
    renderImgMemes();
}


function onOpenMemeUpdate(img){
    findMemeById(img.dataset.memeid);
    onOpenMemeEditor(img);
}