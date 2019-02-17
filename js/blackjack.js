let gameText = document.getElementById("gameText");

let newGameButton = document.getElementById("newGameButton");

newGameButton.addEventListener("click", function() {
  gameText.innerHTML = "New game has now started.";
});

let hitMeButton = document.getElementById("hitMeButton");
let stickButton = document.getElementById("stickButton");

hitMeButton.style.display = "none";
stickButton.style.display = "none";

let createDeckButton = document.getElementById("createDeckButton");

createDeckButton.addEventListener("click", function() {
  let cards = createDeck();
  gameText.innerHTML = cards;
});

function createDeck() {
  console.log("creating a new deck.");
  hitMeButton.style.display = "inline";
  stickButton.style.display = "inline";
  deck = [];
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
  console.log(deck);
  return deck;
}
