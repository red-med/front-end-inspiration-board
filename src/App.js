import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";
import NewBoardForm from './components/NewBoard';

const BOARDS = [{id: 0, title: "", owner: ""}]
// const BOARDS = [{id: 1,
//     title: "Board 1",
//     owner: "Kira",
//     cards: [{id: 1,
//             message: "Test message1",
//             likes_count: 3,
//             date_created: "1/1/23"},
//             {id: 2,
//             message: "Test message1-2",
//             likes_count: 9,
//             date_created: "1/1/23"}]},
//     {id: 2,
//     title: "Board 2",
//     owner: "Rediet",
//     cards: [{id: 1,
//             message: "Test message2",
//             likes_count: 5,
//             date_created: "1/1/23"}]}
// ]

// const CARDS = [{id: 1,
//     message: "Test message",
//     likes_count: 3,
//     date_created: "1/1/23"}
// ]
const INITIAL_FORM_DATA = {
  id:0,
  title: "",
  owner:""
}

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(BOARDS[0]);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isBoardSelected, setIsBoardSelected] = useState(false);

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

  const changeBoard = (id) => {
    for (const board of boards) {
      if (id === board.board_id) {
        setCurrentBoard(board);
        setIsBoardSelected(true);
        console.log("Board changed")
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
        if (board.board_id !== id) {
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
          <div>
            <h2>SELECTED BOARD</h2>
            <p>{currentBoard.title} - {currentBoard.owner}</p>
          </div>
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
            <CardList className="cardlist" cards={cards} increaseLikes={increaseLikes} deleteCard={deleteCard}/>
          </div>
          <div>
            {isBoardSelected && ( 
              <h2>CREATE A NEW CARD</h2>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}


export default App;
