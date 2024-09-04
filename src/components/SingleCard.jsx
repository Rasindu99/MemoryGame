import React from 'react';
import './SingleCard.css';

const SingleCard = ({card, handleChoice}) => {

  const handleClick = () => {
    handleChoice(card);
  }
  

  return (
    <div className='card'>
      <div>
        <img className='front' src={card.src} alt='card front' />
        <img 
          className='back' 
          src='/image/cover.png' 
          alt='card back' 
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
