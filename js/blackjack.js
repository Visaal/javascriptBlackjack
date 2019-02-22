// Supporting functions
function getCardScore(cardValue) {
  // TODO: Handle logic for Ace being 1 or 10
  switch (cardValue) {
    case "Ace":
      return 11;
      break;
    case "King":
    case "Queen":
    case "Jack":
    case "ten":
      return 10;
      break;
    case "nine":
      return 9;
      break;
    case "eight":
      return 8;
      break;
    case "seven":
      return 7;
      break;
    case "six":
      return 6;
      break;
    case "five":
      return 5;
      break;
    case "four":
      return 4;
      break;
    case "three":
      return 3;
      break;
    case "two":
      return 2;
      break;
  }
}

function createDeck() {
  let deck = [];
  suits = ["clubs", "diamonds", "hearts", "spades"];
  cardValues = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    "ten",
    "nine",
    "eight",
    "seven",
    "six",
    "five",
    "four",
    "three",
    "two"
  ];

  for (i = 0; i < suits.length; i++) {
    for (n = 0; n < cardValues.length; n++) {
      deck.push({
        suit: suits[i],
        value: cardValues[n],
        score: getCardScore(cardValues[n])
      });
    }
  }
  return deck;
}

function getRandomCardIndex(cardDeck) {
  let randomCardIndex = Math.trunc(Math.random() * cardDeck.length);
  return randomCardIndex;
}

function shuffleDeck(cardDeck) {
  let shuffledDeck = [];
  while (cardDeck.length) {
    randomCardIndex = getRandomCardIndex(cardDeck);
    randomCard = cardDeck[randomCardIndex];
    shuffledDeck.push(randomCard);
    cardDeck.splice(randomCardIndex, 1);
  }
  return shuffledDeck;
}

function cardDetails(card) {
  cardText = card.value + " of " + card.suit;
  return cardText;
}

function dealCard(cardDeck) {
  return cardDeck.pop();
}

function setUpPlayers() {
  // structure: [["Player 1", [cards stored here]], ["Player 2", [cards stored here]]
  let players = [];
  players.push(["Player 1", []]);
  players.push(["Dealer", []]);
  return players;
}

function initialDeal(players, cardDeck) {
  for (i = 0; i < 2; i++) {
    players[0][1].push(dealCard(cardDeck));
    players[1][1].push(dealCard(cardDeck));
  }
  return players;
}

function displayDeal(players) {
  dealInfo = "";
  playerOneCards = players[0][1];
  playerText.innerHTML += "Player 1 has ";
  playerText.innerHTML += cardDetails(playerOneCards[0]);
  playerText.innerHTML += ", ";
  playerText.innerHTML += cardDetails(playerOneCards[1]);
  dealerCards = players[1][1];
  dealerText.innerHTML += "Dealer has ";
  dealerText.innerHTML += cardDetails(dealerCards[0]);
}

function calculateScore(playerCards) {
  total = 0;
  for (i = 0; i < playerCards.length; i++) {
    total += playerCards[i].score;
  }
  return total;
}

function determinePlayerOptions(playerScore) {
  if (playerScore == 21) {
    gameText.innerHTML += " > Player 1 has Blackjack";
    dealerTurn();
    return false;
  } else if (playerScore < 21) {
    hitMeButton.style.display = "inline";
    stickButton.style.display = "inline";
    return true;
  } else {
    gameText.innerHTML += " > Player 1 is Bust > Dealer WINS";
    return false;
  }
}

function dealerTurn() {
  // TODO: Better method of displaying dealer cards as recursive
  dealerCards = playersCards[1][1];
  dealerText.innerHTML += ", ";
  dealerText.innerHTML += cardDetails(dealerCards[1]);
  dealerScore = calculateScore(dealerCards);
  gameText.innerHTML += " > Dealer has " + dealerScore;
  if (dealerScore < 17) {
    newCard = dealCard(cards);
    dealerCards.push(newCard);
    dealerScore = calculateScore(dealerCards);
    dealerText.innerHTML += ", ";
    dealerText.innerHTML += cardDetails(newCard);
    gameText.innerHTML += " > Dealer now has " + dealerScore;
    dealerTurn(dealerCards);
  } else if (dealerScore > 17 && dealerScore < 22) {
    determineWinner();
    return;
  } else {
    gameText.innerHTML += " > Dealer is Bust > Player 1 WINS";
    return;
  }
}

function determineWinner() {
  if (playerScore > dealerScore) {
    gameText.innerHTML += " > Player 1 WINS";
  } else if (playerScore === dealerScore) {
    gameText.innerHTML += " > Game is a draw";
  } else {
    gameText.innerHTML += " > Dealer WINS";
  }
}

function clearText() {
  gameText.innerHTML = "";
  playerText.innerHTML = "";
  dealerText.innerHTML = "";
  hitMeButton.style.display = "none";
  stickButton.style.display = "none";
}

// Show all the in game commentry
let gameText = document.getElementById("gameText");
let playerText = document.getElementById("playerText");
let dealerText = document.getElementById("dealerText");

let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", function() {
  clearText();
  gameText.innerHTML = "New game has now started.";
  cards = createDeck();
  cards = shuffleDeck(cards);
  players = setUpPlayers();
  gameText.innerHTML += " > Dealing cards";
  playersCards = initialDeal(players, cards);
  displayDeal(playersCards);
  player1Cards = playersCards[0][1];
  playerScore = calculateScore(player1Cards);
  gameText.innerHTML += " > Player has " + playerScore;
  console.log(playerScore);
  determinePlayerOptions(playerScore);
});

let hitMeButton = document.getElementById("hitMeButton");
let stickButton = document.getElementById("stickButton");
hitMeButton.style.display = "none";
stickButton.style.display = "none";

hitMeButton.addEventListener("click", function() {
  newCard = dealCard(cards);
  player1Cards.push(newCard);
  playerScore = calculateScore(player1Cards);
  playerText.innerHTML += ", ";
  playerText.innerHTML += cardDetails(newCard);
  gameText.innerHTML += " > Player now has " + playerScore;
  determinePlayerOptions(playerScore);
});

stickButton.addEventListener("click", function() {
  dealerTurn();
});
