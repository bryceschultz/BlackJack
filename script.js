//Blackjack Game
//Bryce

//DOM Variables
let textArea = document.getElementById('text-area')
    playerCardsText = document.getElementById('player-text-area')
    dealerCardsText = document.getElementById('dealer-text-area')
    playerScoreText = document.getElementById('player-score-text-area')
    dealerScoreText = document.getElementById('dealer-score-text-area')
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button'),
    refreshButton = document.getElementById('refresh-page');

//Card Variables    
let values = ['Ace', 'King', 'Queen', 'Jack', "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"],
    suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'],
    cardValues = { Ace:11, King: 10, Queen: 10, Jack: 10, Ten: 10, Nine: 9, 
                Eight: 8, Seven: 7, Six: 6, Five: 5, Four: 4, 
                Three: 3, Two: 2
    };

    

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];



hitButton.style.display = 'none';
stayButton.style.display = 'none';
refreshButton.style.display = 'none';


newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  deck = shuffle(deck);
  console.log(deck);
  dealerCards = [getNextCard(),getNextCard()];
  dealerScore = [giveScore(dealerCards)];
  playerCards = [getNextCard(),getNextCard()];
  playerScore = [giveScore(playerCards)];
  dealerCardsHidden = [dealerCards[0]].toString();
  console.log(typeof(dealerCardsHidden));
  console.log(dealerCardsHidden);
  
  
  
  for (var i=0;i<dealerCardsHidden.length;i++) {
    var dealerCardHiddenWords = dealerCardsHidden.split(" ");
  }
  
  dealerScoreHidden = cardValues[dealerCardHiddenWords[0]];
  
  textArea.innerText = 'What\'s your next move?';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  refreshButton.style.display = 'inline';
  
  playerCardsText.innerText = 'Your Cards: ' + playerCards;
  playerScoreText.innerText = 'Your Score: ' + playerScore;
  dealerCardsText.innerText = 'Dealers First Card: '+ dealerCardsHidden;
  dealerScoreText.innerText = 'Dealers First Card Value: '+ dealerScoreHidden;
  
});

hitButton.addEventListener('click', function() {
  textArea.innerText = 'What\'s your next move?';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  refreshButton.style.display = 'inline';
  
  console.log(playerScore);
  console.log(typeof(playerScore));
  nextPlayerCard = getNextCard();
  playerCards.push(nextPlayerCard);
  console.log(typeof(nextPlayerCard));
  
  nextPlayerCardWord = []
  for (var i=0;i<nextPlayerCard.length;i++) {
  var words = nextPlayerCard.split(" ");
  }
  
  console.log(cardValues[words[0]]);
  
  
  if (nextPlayerCard === 11 && playerScore <= 10) { 
    nextPlayerCard = 11;
  } else if (nextPlayerCard === 11 && playerScore > 10) {
    nextPlayerCard = 1;
  }
  

  playerScore=Number(playerScore);
  playerScore += cardValues[words[0]];
  if (playerScore > dealerScore && playerScore <= 21) {
    textArea.innerText = 'Player Wins!';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    newGameButton.style.display = 'inline';
    
  } else if (playerScore > 21) {
    textArea.innerText = 'Dealer Wins!';
    gameOver = true;
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    newGameButton.style.display = 'inline';
  } else if (playerScore < dealerScore) {
    textArea.innerText = 'Player Must Hit';
  } else if (playerScore === dealerScore) {
    textArea.innerText = 'It\'s a tie!';
    gameOver = true;
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
stayButton.style.display = 'none';
  }
  
  playerCardsText.innerText = 'Your Cards: ' + playerCards;
  playerScoreText.innerText = 'Your Score: ' + playerScore;
  dealerCardsText.innerText = 'Dealers Cards: '+ dealerCards;
  dealerScoreText.innerText = 'Dealers Score: '+ dealerScore;
  
  
  if (playerScore === 21) {
    textArea.innerText = 'Player Wins!';
      gameOver = true;
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
  } else if (dealerScore === 21) {
    textArea.innerText = 'Dealer Wins!';
    gameOver = true;
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
});

stayButton.addEventListener('click', function() {
  textArea.innerText = 'What\'s your next move?';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  
  

  playerScore=Number(playerScore);
  
  if (playerScore === 21) {
    textArea.innerText = 'Player Wins!';
    newGameButton.style.display = 'inline';
  } else if (dealerScore === 21) {
    textArea.innerText = 'Dealer Wins!';
    newGameButton.style.display = 'inline';
  }
  
  if (playerScore > dealerScore && playerScore <= 21) {
    textArea.innerText = 'Player Wins!';
    gameOver = true;
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  } else if (playerScore < dealerScore && playerScore <=21 && dealerScore <= 21) {
    textArea.innerText = 'Dealer Wins!';
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  } else if (playerScore === dealerScore) {
    textArea.innerText = 'It\'s a Tie!';
    gameOver = true;
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    newGameButton.style.display = 'inline';
  } else if (dealerScore > 21 && playerScore <= 21) {
    textArea.innerText = 'Player Wins!';
    gameOver = true;
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  } 
  
  console.log(playerCards);
  playerCardsText.innerText = 'Your Cards: ' + playerCards;
  playerScoreText.innerText = 'Your Score: ' + playerScore;
  dealerCardsText.innerText = 'Dealers Cards: '+ dealerCards;
  dealerScoreText.innerText = 'Dealers Score: '+ dealerScore;
  
  
  
});

refreshButton.addEventListener('click', function() {
 refreshPage();
});

function refreshPage(){
    window.location.reload();
}


function getNextCard() {
  let nextCard = deck.shift();
  return nextCard;
}


function giveScore(cards, newScore) {
  console.log(newScore);
  if (isNaN(newScore)===true) {
    newScore = 0;
  }
  
  var firstWords = [];
  for (var i=0;i<cards.length;i++) {
  var words = cards[i].split(" ");
  firstWords.push(words[0]);
  }
  

  for (let idx = 0; idx < firstWords.length; idx++) {
    console.log(cardValues[firstWords[idx]]);
    newScore += cardValues[firstWords[idx]];
  }
  console.log(newScore);
  return newScore;
}


function createDeck() {
  let deck = [];
  for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
      deck.push(values[valueIdx] + ' of ' + suits[suitIdx]);
    }
  }
  return deck;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/*
function liveGame() {
  while (gameOver === false) {
    textArea.innerText = 'Dealer Cards: ' + dealerCards;
    textArea.innerText = 'Your Cards: ' + playerCards;
    
  }
}
*/
