import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";

const BOARDS = [{id: 0, title: "", owner: ""}]

const INITIAL_FORM_DATA = {
  title: "",
  owner:""
}

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(BOARDS[0]);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const API = "https://inspiration-board-api-bella-rediet-kira.onrender.com";

  const getData = () => {
    axios
    .get(`${API}/boards`)
    .then((result) => {
      setBoards(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const changeBoard = (id) => {
    for (const board of boards) {
      if (id === board.id) {
        setCurrentBoard(board);
        console.log("Board changed")

        // axios
        // .get(`${API}/cards`)
        // .then((result) => {
        //   const cardList = []
        //   for (const card of result.data) {

        //   }
        // })
      }
    };

    axios
    .get(`${API}/cards`)
    .then((result) => {
      const cardList = []
      for (const card of result.data) {
        if (card.board_id === id) {
          cardList.push(card)
          console.log("Cards changed")
        }
      }
      setCards(cardList);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const deleteBoard = (id) => {
    axios
    .delete(`${API}/boards/${id}`)
    .then((result) => {
      const newBoards = [];
      for (let board of boards){
        if (board.id !== id) {
          newBoards.push(board);
        }
      }
      setBoards(newBoards);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const increaseLikes = (id) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        const updatedCard = { ...card };
        updatedCard.likes_count++;
        
        axios
        .patch(`${API}/cards/${id}/likes_count`, { likes_count: updatedCard.likes_count})
        .then ((result) => {
          console.log(result.data);
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
        
        return updatedCard;
      } else {
        return { ...card }
      }
    });
    setCards(newCards);
  };

  const deleteCard = (id) => {
    axios
    .delete(`${API}/cards/${id}`)
    .then((result) => {
      const newCards = [];
      for (let card of cards){
        if (card.id !== id) {
          newCards.push(card);
        }
      }
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
            <CardList className="cardlist" cards={cards} increaseLikes={increaseLikes} deleteCard={deleteCard}/>
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
