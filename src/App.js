import { useState } from 'react';
import './App.css';

// i am creating card array outSide the component , So its wont get recreated every time component refresh

const cardImages = [
  { "src": "/image/helmet-1.png"},
  { "src": "/image/potion-1.png"},
  { "src": "/image/ring-1.png"},
  { "src": "/image/scroll-1.png"},
  { "src": "/image/shield-1.png"},
  { "src": "/image/sword-1.png"}
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards - ( this function does - duplicate card , sort them in a random order , assign a index)
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicate each card then save them (total cards - 12) in new variable
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }));

      setCards(shuffledCards);
      setTurns(0);
  }

  console.log(cards, turns);


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <div className='card' key={card.id}>
            <div>
              <img className='front' src={card.src} alt='card front'/>
              <img className='back' src='/image/cover.png' alt='card back'/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
