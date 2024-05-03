import React from 'react';
import '../styling/global.css';

function Header() {
  const date = new Date();
  const options = { 
    weekday: 'long', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  };
  const formattedDate = date.toLocaleString('en-US', options);

  return (
    <header className="App-Name">
      Weather
      <div className='App-date'>{formattedDate}</div>
    </header>
  );
}

export default Header;
