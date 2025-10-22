document.addEventListener('DOMContentLoaded', () => {
    const drawCardButton = document.getElementById('drawCardButton');
    const playerHand = document.getElementById('playerHand');
    const playArea = document.getElementById('playArea');
    const deckElement = document.getElementById('deck');

    let deck = []; // El mazo del jugador
    let hand = []; // La mano del jugador

    // Función para cargar los datos desde la API de Scryfall y construir el mazo
    async function initializeDeck() {
        console.log("Contactando a la API de Scryfall...");
        
        //Busqueda de cartas formato estandar 
        const scryfallApiUrl = "https://api.scryfall.com/cards/search?q=f:standard+(r:c+OR+r:u)";

        try {
            // Carga los datos desde Scryfall
            const response = await fetch(scryfallApiUrl);
            const scryfallData = await response.json();
            
            // Los datos de las cartas están en scryfallData.data
            const cardPool = scryfallData.data;
            console.log(`Pool de ${cardPool.length} cartas de Estándar cargado.`);

            // 4. Construye el array del mazo con la información que necesitas
            const tempDeck = cardPool.map(card => {
                
                // Obtener la URL de la imagen
                let imageUrl = "https://cards.scryfall.io/normal/front/6/d/6da045f8-6278-4c84-9d39-025adf0789c1.jpg?1562404626"; // Imagen por defecto
                if (card.image_uris && card.image_uris.large) {
                    imageUrl = card.image_uris.large;
                } else if (card.card_faces && card.card_faces[0].image_uris && card.card_faces[0].image_uris.large) {
                    imageUrl = card.card_faces[0].image_uris.large;
                }

                return {
                    name: card.name,
                    manaCost: card.mana_cost,
                    type: card.type_line,
                    text: card.oracle_text,
                    imageUrl: imageUrl
                };
            });
            
            //Baraja las cartas y crea un mazo de 60 cartas (random)
            const shuffledPool = shuffleDeck(tempDeck);
            deck = shuffledPool.slice(0, 60); 

            console.log("Mazo de 60 cartas construido y barajado.");
            updateDeckDisplay();

        } catch (error) {
            console.error("Error al cargar cartas de Scryfall:", error);
            alert("No se pudieron cargar las cartas. Revisa la consola.");
        }
    }

    // barajar el mazo
    function shuffleDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Actualizar el mazo
    function updateDeckDisplay() {
        if (deck.length > 0) {
            deckElement.style.display = 'block';
        } else {
            deckElement.style.display = 'none';
        }
    }

    // Función para crear el elemento HTML de una carta   
    function createCardElement(cardData) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.backgroundImage = `url('${cardData.imageUrl}')`;
        cardDiv.setAttribute('aria-label', cardData.name); 
        return cardDiv;
    }

    // Función para robar una carta
    function drawCard() {
        if (deck.length === 0) {
            alert("El mazo está vacío!");
            return;
        }

        const drawnCardData = deck.pop(); // Saca la última carta del mazo
        hand.push(drawnCardData); // Añádela a la mano

        const cardElement = createCardElement(drawnCardData);
        playerHand.appendChild(cardElement);
        
        // Añadimos el evento para "jugar" la carta
        cardElement.addEventListener('click', () => playCard(cardElement, drawnCardData));

        updateDeckDisplay();
    }

    // Función para "jugar" una carta de la mano al campo de batalla
    function playCard(cardElement, cardData) {
        // Eliminar la carta de la mano
        playerHand.removeChild(cardElement);
        hand = hand.filter(card => card.imageUrl !== cardData.imageUrl); // Actualizar array

        // Mover la carta al campo de batalla
        const playedCardElement = createCardElement(cardData);
        playArea.appendChild(playedCardElement);

        playedCardElement.removeEventListener('click', () => playCard(cardElement, cardData));
    }


    // boton robar
    drawCardButton.addEventListener('click', drawCard);

    // Inicializar mazo al cargar la página
    initializeDeck();
});
