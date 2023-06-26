import React from 'react';
import './App.css';
import { useState } from 'react';


const BOARDS = [{id: 1,
                title: "Board 1",
                owner: "Kira"},
                {id: 2,
                title: "Board 2",
                owner: "Rediet"}
              ]

const CARDS = [{id: 1,
                message: "Test message",
                likes_count: 3,
                date_created: "1/1/23"}
              ]

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(BOARDS[0]);
  const [cards, setCards] = useState(CARDS);
  const [currentCard, setCurrentCard] = useState(CARDS[0]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
    </div>
  );
}

export default App;
