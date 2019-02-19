// Supporting functions
function getCardScore(cardValue) {
  switch (cardValue) {
    case "Ace":
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
    case "one":
      return 1;
      break;
  }
}

function createDeck() {
  console.log("creating a new deck.");
  hitMeButton.style.display = "inline";
  stickButton.style.display = "inline";
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
    "two",
    "one"
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

function printCard(card) {
  gameText.innerHTML = "Card dealt is the " + card.value + " of " + card.suit;
}

function dealCard(cardDeck) {
  return cardDeck.pop();
}

function setUpPlayers() {
  let players = {
    dealer: [],
    player1: []
  };
  return players;
}

function initialDeal(players, cardDeck) {
  for (i = 0; i < 2; i++) {
    players.player1.push(dealCard(cardDeck));
    players.dealer.push(dealCard(cardDeck));
  }
  return players;
}

function calculateScore(playerCards) {
  total = 0;
  for (i = 0; i < playerCards.length; i++) {
    total += playerCards[i].score;
  }
  return total;
}

// Show all the in game commentry
let gameText = document.getElementById("gameText");

let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", function() {
  cards = createDeck();
  cards = shuffleDeck(cards);
  gameText.innerHTML = "New game has now started.";
  players = setUpPlayers();
  gameText.innerHTML += "<p>Dealing cards</p>";
  playerCards = initialDeal(players, cards);
  dealerCards = playerCards.dealer;
  player1Cards = playerCards.player1;
  dealerScore = calculateScore(dealerCards);
  gameText.innerHTML += "<p>Dealer has " + dealerScore + "</p>";
  playerScore = calculateScore(player1Cards);
  gameText.innerHTML += "<p>Player has " + playerScore + "</p>";
  gameText.innerHTML += "<p>What would you like to do?</p>";
});

let shuffleCardsButton = document.getElementById("shuffleCardsButton");
shuffleCardsButton.addEventListener("click", function() {
  cards = shuffleDeck(cards);
});

let hitMeButton = document.getElementById("hitMeButton");
let stickButton = document.getElementById("stickButton");
hitMeButton.style.display = "none";
stickButton.style.display = "none";

hitMeButton.addEventListener("click", function() {
  newCard = dealCard(cards);
  players.player1.push(newCard);
  playerScore = calculateScore(player1Cards);
  gameText.innerHTML += "<p>Player now has " + playerScore + "</p>";
});

stickButton.addEventListener("click", function() {
  while (dealerScore < 18) {
    console.log(dealerCards);
    gameText.innerHTML += "<p>Dealer is taking a card</p>";
    newCard = dealCard(cards);
    players.dealer.push(newCard);
    dealerScore = calculateScore(dealerCards);
    gameText.innerHTML += "<p>Dealer now has " + dealerScore + "</p>";
  }
});
