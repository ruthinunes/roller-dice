const dicesElement = document.querySelectorAll(".dice");
const rollButton = document.querySelector("#rollButton");
const clearButton = document.querySelector("#clearButton");
const historyHeader = document.querySelector('.history-header');
const historyListElement = document.querySelector("#historyList");

function rollDice() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  dicesElement.forEach(function (dice) {
    dice.classList.remove('active');
    animateDice(randomNumber, dice);
  });
};

function animateDice(randomNumber, dice) {
  if (dice.id === `dice-${randomNumber}`) {
    const dots = Array.from(dice.children);
    const audio = new Audio('roll.mp3');

    dots.forEach(function (dot) {
      dot.classList.add('hide');

      setTimeout(function () {
        dot.classList.remove('hide');
      }, 1000)
    });
    setTimeout(function () {
      dice.classList.add('active');
    });
    // audio.play();
    addToHistory(dice);
  };
};

function addToHistory(dice){
  const listItem = document.createElement("li");
  const diceCopy = dice.cloneNode(true);

  diceCopy.style.display = 'block';
  diceCopy.querySelectorAll("span").forEach(function(dot){
    dot.classList.remove('hide');
  });

  listItem.classList.add("history-item");

  setTimeout(function(){
  listItem.append(`You rolled a`);
  listItem.append(diceCopy);
  historyListElement.append(listItem);
  historyHeader.classList.add('switch-display');
  clearButton.classList.remove('hide');
  },1300);
  
  clearButton.addEventListener('click', clearHistory);
};

function clearHistory() {
  clearButton.classList.add('hide');
  historyHeader.classList.remove('switch-display');

  while (historyListElement.firstChild) {
    historyListElement.removeChild(historyListElement.firstChild);
  };
};

rollButton.addEventListener('click', rollDice);