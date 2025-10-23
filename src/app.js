import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
{
document.addEventListener('DOMContentLoaded', () => {

    const suits = ['heart', 'diamond', 'spade', 'club'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    const suitSymbols = {
        'heart': '♥',
        'diamond': '♦',
        'spade': '♠',
        'club': '♣'
    };

    const cardElement = document.getElementById('randomCard');
    const valueElement = document.getElementById('cardValue');
    const topSuitElement = document.getElementById('topSuit');
    const bottomSuitElement = document.getElementById('bottomSuit');
    
    const newCardBtn = document.getElementById('newCardBtn');
    const widthInput = document.getElementById('cardWidth');
    const heightInput = document.getElementById('cardHeight');

        function generateRandomCard() {
        // Obtener un  valor aleatorio
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        const suitSymbol = suitSymbols[randomSuit];

        // Actualizar
        valueElement.textContent = randomValue;
        topSuitElement.textContent = suitSymbol;
        bottomSuitElement.textContent = suitSymbol;

        cardElement.className = 'card'; 
        cardElement.classList.add(randomSuit); 
    }

    function applyCardSize() {
        const width = widthInput.value;
        const height = heightInput.value;
        if (width) {
            cardElement.style.width = `${width}px`;
        }
        if (height) {
            cardElement.style.height = `${height}px`;
        }
    }

    generateRandomCard();
    newCardBtn.addEventListener('click', generateRandomCard);
    // generar cambio de carta a los 10000 milisegundos
    setInterval(generateRandomCard, 10000); 

    widthInput.addEventListener('input', applyCardSize);
    heightInput.addEventListener('input', applyCardSize);

}); //write your code here
  console.log("Hello Rigo from the console!");
};
