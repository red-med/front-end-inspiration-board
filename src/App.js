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
const INITIAL_FORM_DATA = {
  title: "",
  owner:""
}

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const [cards, setCards] = useState(currentBoard.cards);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const changeBoard = (id) => {
    for (const board of boards) {
      if (id === board.id) {
        setCurrentBoard(board);
        setCards(board.cards)
      }
    };
  };

  const increaseLikes = (id) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        const updatedCard = { ...card };
        updatedCard.likes_count++;
        return updatedCard;
      } else {
        return { ...card }
      }
    });
    setCards(newCards);
  };

  const updatePreview = (evt) => {
    const newFormData = {
      ...formData,
      [evt.target.name]: evt.target.value
    };

    setFormData(newFormData);
  }

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
            <form>
              <div>
              <label>Title</label>
              </div>
            <input type="text"
              id="title" 
              name="title" 
              value={formData.title}
              onChange={updatePreview}
            />
            <div>
            <label>Owner's Name</label>
            </div>
            <input type="text" 
              id="owner" 
              name="owner" 
              value={formData.owner}
              onChange={updatePreview}
            />
            <p>Preview:</p>
            <div id="preview">{formData.title} - {formData.owner}</div>
            <input type="submit" value="Submit"/>
            </form>
            
        
          </div>
        </section>
        <section className="card-view">
          <div>
            <h2>Cards For Pick-Me-Up-Quotes</h2>
            <CardList className="cardlist" cards={cards} increaseLikes={increaseLikes}/>
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
