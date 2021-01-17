//jshint esversion:8
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong__letters');
const playAgainBtnEl = document.getElementById('play__btn');
const popupEl = document.querySelector('.popup__container');
const notificationEl = document.querySelector('.notification__container');
const finalMessageEl = document.querySelector('.final__message');


const figurePartsEl = document.querySelectorAll('.figure__part');

const words = ['application', 'programming', 'mongodb', 'reactjs'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `<div class="letter">${correctLetters.includes(letter) ? letter : ''}</div>`)
            .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    console.log(innerWord);

    if (innerWord === selectedWord) {
        finalMessageEl.innerText = 'Congratulation! You won. 😃';
        popupEl.style.visibility = 'visible';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}    
    `;

    figurePartsEl.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.visibility = 'visible';
        }else{
            part.style.visibility = 'hidden';
        }
    });

    // Check if lost
    if (wrongLetters.length === figurePartsEl.length) {
        finalMessageEl.innerText = 'Sorry! You lost. 😔';
        popupEl.style.visibility = 'visible';
    }
}

// Show Notification
function showNotification() {
    notificationEl.classList.add('show');
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 2000);
}

//  Keywdown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});


// RESTART A GAME AND PLAY AGAIN
playAgainBtnEl.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popupEl.style.visibility = 'hidden';
});

displayWord();
