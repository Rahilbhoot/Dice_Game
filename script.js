'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Selecting elements
const score0El = document.querySelector('#score--0');
// Works exactly same as below..
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1.Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2.Display Dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3.Check for rolled 1: IF true, switch to next player
        if (dice != 1) {
            // Add dice to the current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Swithc to the next player
            switchPlayer();

        }
    }
})


btnHold.addEventListener('click', function () {
    if (playing) {
        // 1.Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // 2. check score is >=100
        // finish game
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {

            // 3. Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    scores = [0, 0];
    currentScore = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    activePlayer = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    playing = true;
})