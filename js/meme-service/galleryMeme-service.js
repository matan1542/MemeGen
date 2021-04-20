

function renderImgMemes() {
    const elMemesContainer = document.querySelector('.memes-wrapper');
    let memes = loadFromStorage(KEY);
    let strHtml = memes.map((src) => {
        return ` <img  src="${src}" > `;
    })
    elMemesContainer.innerHTML = strHtml.join('');
    console.log(strHtml);


}