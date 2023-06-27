import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";


const BOARDS = [{id: 1,
                title: "Board 1",
                owner: "Kira",
                cards: [{id: 1,
                        message: "Test message1",
                        likes_count: 3,
                        date_created: "1/1/23"},
                        {id: 2,
                          message: "Test message1-2",
                          likes_count: 9,
                          date_created: "1/1/23"}]},
                {id: 2,
                title: "Board 2",
                owner: "Rediet",
                cards: [{id: 1,
                        message: "Test message2",
                        likes_count: 5,
                        date_created: "1/1/23"}]}
              ]

const CARDS = [{id: 1,
                message: "Test message",
                likes_count: 3,
                date_created: "1/1/23"}
              ]

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const [cards, setCards] = useState(currentBoard.cards);

  const changeBoard = (id) => {
    for (const board in boards) {
      if (id === board.id) {
        setCurrentBoard(board);
      }
    };
  };

  return (
    <div className="page">
      <div className="content">
        <header className="App-header">
          <h1>Inspiration Board</h1>
        </header>
        <section className="board-view">
          <div>
            <h2>Boards</h2>
            <BoardList boards={boards} changeBoard={changeBoard}/>
          </div>
          <div>
            <h2>Selected Board</h2>
            <p>{currentBoard.title}</p>
          </div>
          <div>
            <h2>Create A New Board</h2>
          </div>
        </section>
        <section className="card-view">
          <div>
            <h2>Cards For Pick-Me-Up-Quotes</h2>
            <CardList className="cardlist" cards={cards}/>
          </div>
          <div>
            <h2>Create a New Card</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
