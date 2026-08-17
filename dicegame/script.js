// ==========================================
// DICE BATTLE
// ==========================================

const TOTAL_ROUNDS = 5;

let numberOfPlayers = 0;
let currentPlayer = 0;
let currentRound = 1;

let scores = [];
let lastRolls = [];

let gameOver = false;
let rolling = false;


// Dice faces

const diceFaces = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅"
};


// ==========================================
// PLAYER SELECTION
// ==========================================

function selectPlayers(number) {

    numberOfPlayers = number;

    document
        .getElementById("threeBtn")
        .classList.remove("selected");

    document
        .getElementById("fourBtn")
        .classList.remove("selected");


    if (number === 3) {

        document
            .getElementById("threeBtn")
            .classList.add("selected");

    } else {

        document
            .getElementById("fourBtn")
            .classList.add("selected");

    }


    document.getElementById("selectedPlayers").innerText =
        `${number} Players Selected`;
}


// ==========================================
// START GAME
// ==========================================

function startGame() {

    if (numberOfPlayers === 0) {

        alert("Please select 3 or 4 players!");

        return;
    }


    currentPlayer = 0;

    currentRound = 1;

    scores = new Array(numberOfPlayers).fill(0);

    lastRolls = [];

    gameOver = false;

    rolling = false;


    document.getElementById("setup").style.display = "none";

    document.getElementById("game").style.display = "block";


    createPlayers();

    updateRound();

    updateTurn();

    updateLeader();

    updateHistory();
}


// ==========================================
// CREATE PLAYER CARDS
// ==========================================

function createPlayers() {

    const container =
        document.getElementById("playersContainer");

    container.innerHTML = "";


    for (let i = 0; i < numberOfPlayers; i++) {

        const card = document.createElement("div");

        card.className = "player-card";

        card.id = `player${i}`;


        card.innerHTML = `

            <div class="player-name">
                👤 Player ${i + 1}
            </div>

            <div class="dice" id="dice${i}">
                🎲
            </div>

            <div class="score-label">
                TOTAL SCORE
            </div>

            <div class="score" id="score${i}">
                0
            </div>

            <button
                class="roll-btn"
                id="roll${i}"
                onclick="rollDice()">

                🎲 Roll Dice

            </button>

        `;


        container.appendChild(card);
    }
}


// ==========================================
// ROLL DICE
// ==========================================

function rollDice() {

    if (gameOver || rolling) return;


    rolling = true;


    disableAllButtons();


    const diceElement =
        document.getElementById(`dice${currentPlayer}`);


    diceElement.classList.add("rolling");


    // Small rolling animation

    let animationTime = 0;


    const animation = setInterval(() => {

        const randomFace =
            Math.floor(Math.random() * 6) + 1;

        diceElement.innerText =
            diceFaces[randomFace];


        animationTime += 100;

    }, 100);


    setTimeout(() => {

        clearInterval(animation);

        diceElement.classList.remove("rolling");


        const finalRoll =
            Math.floor(Math.random() * 6) + 1;


        diceElement.innerText =
            diceFaces[finalRoll];


        scores[currentPlayer] += finalRoll;


        document.getElementById(
            `score${currentPlayer}`
        ).innerText =
            scores[currentPlayer];


        // Save history

        lastRolls.push({

            player: currentPlayer + 1,

            round: currentRound,

            value: finalRoll

        });


        updateHistory();

        updateLeader();


        rolling = false;


        // Move to next player

        setTimeout(nextTurn, 700);


    }, 800);
}


// ==========================================
// NEXT TURN
// ==========================================

function nextTurn() {

    currentPlayer++;


    // Everyone played

    if (currentPlayer >= numberOfPlayers) {

        currentPlayer = 0;

        currentRound++;


        // All rounds completed

        if (currentRound > TOTAL_ROUNDS) {

            finishGame();

            return;
        }
    }


    updateRound();

    updateTurn();

    updateLeader();

    enableCurrentPlayer();

}


// ==========================================
// UPDATE TURN
// ==========================================

function updateTurn() {

    document.getElementById("turnDisplay").innerText =
        `Player ${currentPlayer + 1}'s Turn`;


    for (let i = 0; i < numberOfPlayers; i++) {

        document
            .getElementById(`player${i}`)
            .classList.remove("active");

    }


    document
        .getElementById(`player${currentPlayer}`)
        .classList.add("active");
}


// ==========================================
// UPDATE ROUND
// ==========================================

function updateRound() {

    document.getElementById("roundNumber").innerText =
        Math.min(currentRound, TOTAL_ROUNDS);
}


// ==========================================
// BUTTON CONTROL
// ==========================================

function disableAllButtons() {

    for (let i = 0; i < numberOfPlayers; i++) {

        document
            .getElementById(`roll${i}`)
            .disabled = true;
    }
}


function enableCurrentPlayer() {

    disableAllButtons();


    if (!gameOver) {

        document
            .getElementById(`roll${currentPlayer}`)
            .disabled = false;
    }
}


// ==========================================
// LEADER
// ==========================================

function updateLeader() {

    for (let i = 0; i < numberOfPlayers; i++) {

        document
            .getElementById(`player${i}`)
            .classList.remove("leader");
    }


    const highestScore =
        Math.max(...scores);


    // Don't show leader before anyone has scored

    if (highestScore === 0) return;


    scores.forEach((score, index) => {

        if (score === highestScore) {

            document
                .getElementById(`player${index}`)
                .classList.add("leader");
        }

    });
}


// ==========================================
// HISTORY
// ==========================================

function updateHistory() {

    const history =
        document.getElementById("historyList");


    if (lastRolls.length === 0) {

        history.innerHTML = "No rolls yet.";

        return;
    }


    history.innerHTML = "";


    // Show latest rolls first

    [...lastRolls]
        .reverse()
        .forEach(roll => {

            const item =
                document.createElement("div");

            item.className = "history-item";


            item.innerText =
                `R${roll.round} • P${roll.player} → ${diceFaces[roll.value]}`;


            history.appendChild(item);

        });
}


// ==========================================
// FINISH GAME
// ==========================================

function finishGame() {

    gameOver = true;

    disableAllButtons();


    // Sort players by score

    const rankings =
        scores
            .map((score, index) => ({

                player: index + 1,

                score: score

            }))
            .sort((a, b) => b.score - a.score);


    const highestScore =
        rankings[0].score;


    const winners =
        rankings.filter(
            player => player.score === highestScore
        );


    const winnerBox =
        document.getElementById("winner");


    let winnerText = "";


    if (winners.length === 1) {

        winnerText = `
            <h2>🏆 Player ${winners[0].player} Wins!</h2>

            <p>
                Amazing! You dominated all ${TOTAL_ROUNDS} rounds.
            </p>
        `;

    } else {

        winnerText = `
            <h2>🤝 It's a Tie!</h2>

            <p>
                ${winners
                    .map(player => `Player ${player.player}`)
                    .join(" & ")}
                finished with ${highestScore} points.
            </p>
        `;
    }


    // Rankings

    let rankingHTML = `
        <div class="rankings">
    `;


    rankings.forEach((player, index) => {

        let medal = "";

        if (index === 0) medal = "🥇";

        else if (index === 1) medal = "🥈";

        else if (index === 2) medal = "🥉";

        else medal = "🏅";


        rankingHTML += `

            <div class="rank">

                <span>
                    ${medal} Player ${player.player}
                </span>

                <strong>
                    ${player.score} points
                </strong>

            </div>

        `;

    });


    rankingHTML += "</div>";


    winnerBox.innerHTML =
        winnerText + rankingHTML;


    winnerBox.style.display = "block";


    document.getElementById("turnDisplay").innerText =
        "🎉 Game Over!";
}


// ==========================================
// RESET GAME
// ==========================================

function resetGame() {

    numberOfPlayers = 0;

    currentPlayer = 0;

    currentRound = 1;

    scores = [];

    lastRolls = [];

    gameOver = false;

    rolling = false;


    document.getElementById("game").style.display =
        "none";


    document.getElementById("setup").style.display =
        "flex";


    document.getElementById("selectedPlayers").innerText =
        "No player count selected";


    document
        .getElementById("threeBtn")
        .classList.remove("selected");


    document
        .getElementById("fourBtn")
        .classList.remove("selected");


    document.getElementById("winner").style.display =
        "none";
}
