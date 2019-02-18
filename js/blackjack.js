// Supporting functions
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
        value: cardValues[n]
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

// Show all the in game commentry
let gameText = document.getElementById("gameText");

let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", function() {
  cards = createDeck();
  cards = shuffleDeck(cards);
  gameText.innerHTML = "New game has now started.";
});

let shuffleCardsButton = document.getElementById("shuffleCardsButton");
shuffleCardsButton.addEventListener("click", function() {
  cards = shuffleDeck(cards);
});

let hitMeButton = document.getElementById("hitMeButton");
let stickButton = document.getElementById("stickButton");
hitMeButton.style.display = "none";
stickButton.style.display = "none";
