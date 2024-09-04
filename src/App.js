import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// i am creating card array outSide the component , So its wont get recreated every time component refresh

const cardImages = [
  { "src": "/image/helmet-1.png", matched: false},
  { "src": "/image/potion-1.png", matched: false},
  { "src": "/image/ring-1.png", matched: false},
  { "src": "/image/scroll-1.png", matched: false},
  { "src": "/image/shield-1.png", matched: false},
  { "src": "/image/sword-1.png", matched: false}
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // shuffle cards - ( this function does - duplicate card , sort them in a random order , assign a index)
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicate each card then save them (total cards - 12) in new variable
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }));
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0);
  }

  //handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const playAgain = () => {
    setGameWon(false);
    shuffleCards();
  }

  useEffect(() => {
    
    if(choiceOne && choiceTwo){
      setDisabled(true);

      if(choiceOne.src === choiceTwo.src){  // compare if and only if both choices have made
        setCards( prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        console.log('matched');

        resetTurn();
      } else {
        console.log('Not matched');
        setTimeout(() => resetTurn(), 1000); // wait a sec then find the resetTurn function
      }

    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameWon(true); // Show the popup when all cards are matched
    }
  }, [cards]);

  console.log(cards);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //start game automatically
  useEffect(() => {
    shuffleCards();
  },[]);


  return (
    <div className="App">
      <h1>Memory Quest</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>

      {gameWon && (
        <div className="won">
          <p>You Won !!!</p>
          <button onClick={playAgain} className="play-again-button">
            Play Again
          </button>
          <h5>{turns} Used</h5>
        </div>
      )}
    </div>
  );
}

export default App;
