'use strict';
let timer;
let clock = document.querySelector('.clock');
let isStarted = false;
let cards = document.querySelectorAll('.card');
let chosenCards;
let cardsArray = Array.from(cards).slice();
let game = document.querySelector('.pairs-game');
let pairs = 0;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i = i - 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
 
function start() {
    chosenCards = [];
    shuffle(cardsArray);
    game.textContent = ''
    cardsArray.forEach(card => {
        game.appendChild(card);
        card.children[0].classList.remove('visible');
        card.classList.remove('disabled');
    })
}
start();

cards.forEach(card => card.addEventListener('click', handleClicked));

function handleClicked(event) {
    firstClick();
    showImage(event);
    checkPairs();
    pairs === 5 ? restart() : pairs;
}

function firstClick() {
    if (!isStarted) { isStarted = true; startClock(); }
}

function startClock() {
    timer = setInterval(countTimer, 1000);
    let totalSeconds = 0;
    function countTimer() {
        totalSeconds += 1;
        let minute = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        ( minute < 10 ) ? minute = `0${minute}` : minute;
        ( seconds < 10 ) ? seconds = `0${seconds}` : seconds;
        clock.textContent = `${minute}:${seconds}`;
    }
}

function showImage(event) {
    event.target.children[0].classList.add('visible');
    chosenCards.push(event.target);
}

function checkPairs() {
    if (chosenCards.length === 2 && (chosenCards[0].children[0].src !== chosenCards[1].children[0].src)) {
        cards.forEach(card => card.classList.add('disabled'));
        setTimeout(() => {
            chosenCards[0].children[0].classList.remove('visible');
            chosenCards[1].children[0].classList.remove('visible');
            cards.forEach(card => card.classList.remove('disabled'));
            chosenCards = [];
        }, 1000)
    } else if (chosenCards.length === 2) {
        chosenCards[0,1].classList.add('disabled');
        chosenCards = [];
        pairs += 1;
    }
}

function restart() {
    clearInterval(timer);
    isStarted = false;
    pairs = 0;
    chosenCards = [];
    setTimeout(() => {
        clock.textContent = '00:00';
        start();
    }, 5000)
}