const board = document.getElementById("game-board");
const currentPlayerText = document.getElementById("current-player");
const scoreJako = document.getElementById("score-jako");
const scoreJosie = document.getElementById("score-josie");
const restartBtn = document.getElementById("restart-btn");
const winnerText = document.getElementById("winner-text"); // 🔥 neu
let currentPlayer = "Josie";
let scores = { Jako: 0, Josie: 0 };
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let images = [
    "images/IMG_0049.JPG",
    "images/IMG_3393.jpg",
    "images/IMG_3431.jpg",
    "images/IMG_3433.jpg",
    "images/IMG_3470.jpg",
    "images/IMG_3517.jpg",
    "images/IMG_3523.jpg",
    "images/IMG_3530.jpg",
    "images/IMG_3544.jpg",
    "images/IMG_3567.JPG",
    "images/IMG_4936.JPG",
    "images/IMG_5032.JPG",
    "images/IMG_5049.JPG",
    "images/IMG_5072.JPG",
    "images/IMG_5186.JPG",
    "images/IMG_5439.JPG",
    "images/IMG_5490.JPG",
    "images/IMG_7376.jpg"
];
images.sort(() => 0.5 - Math.random());
images = images.slice(0, 18);
let cardsArray = [...images, ...images];
cardsArray.sort(() => 0.5 - Math.random());
function createBoard() {
    board.innerHTML = "";
    cardsArray.forEach((imgSrc) => {
        const card = document.createElement("div");
        // 🔥 wichtig: KEIN hidden mehr
        card.classList.add("card");
        card.dataset.image = imgSrc;
        // 🔥 Flip Struktur
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${imgSrc}">
                </div>
            </div>
        `;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;
    this.classList.add("flipped");
    if (!firstCard) {
                    firstCard = this;
                    return;
    }
    secondCard = this;
    lockBoard = true;
    checkMatch();
}
function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        scores[currentPlayer]++;
        updateScore();
        resetTurn();
        checkGameEnd();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            switchPlayer();
            resetTurn();
        }, 1000);
    }
}
function switchPlayer() {
    currentPlayer = currentPlayer === "Jako" ? "Josie" : "Jako";
    currentPlayerText.textContent = currentPlayer;
}
function updateScore() {
    scoreJako.textContent = scores.Jako;
    scoreJosie.textContent = scores.Josie;
}
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
function checkGameEnd() {
    const matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === cardsArray.length) {
        let winner = "Unentschieden 🤝";
        if (scores.Jako > scores.Josie) winner = "Jako gewinnt 💪";
        if (scores.Josie > scores.Jako) winner = "Josie gewinnt 💖";
        winnerText.textContent = winner;
        winnerText.style.display = "block";
        restartBtn.style.display = "block";
    }
}
restartBtn.addEventListener("click", () => {
    scores = { Jako: 0, Josie: 0 };
    updateScore();
    currentPlayer = "Josie";
    currentPlayerText.textContent = currentPlayer;
    winnerText.style.display = "none";
    restartBtn.style.display = "none";
    cardsArray.sort(() => 0.5 - Math.random());
    createBoard();
});
createBoard();