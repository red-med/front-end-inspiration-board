import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";
import NewBoardForm from './components/NewBoard';
import NewCardForm from './components/NewCard';

const BOARDS = [{board_id: 0, title: "", owner: ""}]
const CARDS = [{id:0, message: "", likes_count: 0, date_created:"01/01/2001"}]

function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isBoardSelected, setIsBoardSelected] = useState(false);

  const API = "https://inspiration-board-backend-5puf.onrender.com";

  const getData = (param="") => {
    axios
    .get(`${API}/boards`)
    .then((result) => {
      setBoards(result.data);
    })
    .then(()  => {
      axios
      .get(`${API}/boards/${currentBoard.board_id}/cards${param}`)
      .then((result) => {
        setCards(result["data"]["cards"]);
        console.log("Got Cards"); 
      })
    }
    )
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const postBoard = (newBoardData) => {
    console.log("we made to postboard");
    console.log(newBoardData);
    axios
      .post(`${API}/boards`, newBoardData)
      .then((result) => {
        console.log(result.data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postCard = (newCardData) => {
    axios
      .post(`${API}/boards/${currentBoard.board_id}/cards`, newCardData)
      .then((result) => {
        console.log(result.data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeBoard = (id) => {
    for (const board of boards) {
      if (id === board.board_id) {
        setCurrentBoard(board);
        setIsBoardSelected(true);
        console.log("Board changed")
      }
    };
    axios
    .get(`${API}/boards/${id}/cards`)
    .then((result) => {
      setCards(result["data"]["cards"]);
      console.log("Got Cards"); 
    })
    .catch((err) => {
      console.log(err);
    })
    
  };

  const deleteBoard = (id) => {
    axios
    .delete(`${API}/boards/${id}`)
    .then((result) => {
      getData();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const increaseLikes = (id) => {
    const newCards = cards.map((card) => {
      if (card.card_id === id) {
        const updatedCard = { ...card };
        updatedCard.likes_count++;
        
        axios
        .patch(`${API}/cards/${id}/likes_count`, {likes_count: updatedCard.likes_count})
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
        if (card.card_id !== id) {
          newCards.push(card);
        }
      }
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  };


  return (
    <div className="page">
      <div className="content">
        <header className="App-header">
          <h1>INSPIRATION BOARD</h1>
        </header>
        <section className="board-view">
          <div>
            <h2>BOARDS</h2>
            <BoardList boards={boards} changeBoard={changeBoard}/>
          </div>
          { currentBoard &&
            <div>
              <h2>SELECTED BOARD</h2>
              <p>{currentBoard.title} - {currentBoard.owner}</p>
              <button onClick={() => {deleteBoard(currentBoard.id)}}>Delete board</button>
            </div>
          }
          <div>
          <h2>CREATE A NEW BOARD</h2> 
          <NewBoardForm addBoard={postBoard} />       
          </div>
        </section>
        <section className="card-view">
          <div>
            {isBoardSelected && ( 
              <h2>CARDS FOR {currentBoard.title.toUpperCase()}</h2>
            )}
            {isBoardSelected && (
              <select className="drop-down" onChange={event => {getData(event.target.value)}}>
                <option value="?sort=by_id">Sort by id</option>
                <option value="?sort=alpha">Sort alphabetically</option>
                <option value="?sort=likes">Sort by likes</option>
              </select>
            )}
            {currentCard && 
              <p>{currentCard.message} </p>
            }
            <CardList className="cardlist" cards={cards} increaseLikes={increaseLikes} deleteCard={deleteCard}/>
          </div>
          <div>
              {isBoardSelected && ( 
                <div><h2>CREATE A NEW CARD</h2>
                <NewCardForm addCard={postCard} /> </div>
              )}
          </div>
        </section>
      </div>
    </div>
  );
}


export default App;
