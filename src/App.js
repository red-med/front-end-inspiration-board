import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";
import NewBoardForm from './components/NewBoard';
import NewCardForm from './components/NewCard';

const BOARDS = [{id: 0, title: "", owner: ""}]
const CARDS = [{id:0, message: "", likes_count: 0, date_created:"01/01/2001"}]
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


function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(BOARDS[0]);
  const [currentCard, setCurrentCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isBoardSelected, setIsBoardSelected] = useState(false);

  const API = "http://127.0.0.1:5000";

  const getData = (newCardData) => {
    axios
    .get(`${API}/boards`)
    .then((result) => {
      setBoards(result.data);
      axios
        .get(`${API}/boards/${currentBoard.id}/cards`)
        .then((result) => {
          // const cardList = result.data.filter(
          //   (card) => card.board_id === currentBoard.id
          // );
          setCards(result["cards"]);
          console.log("Got Cards"); 
        })
        .catch((err) => {
          console.log(err);
        })
    
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

  const postCard = (newCardData) => {
    axios
      .post(`${API}/boards/${currentBoard.id}/cards`, newCardData)
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
      // const cardList = []
      // for (const card of result.data) {
      //   if (card.board_id === id) {
      //     cardList.push(card)
      if (Array.isArray(result.data)) {
          const cardList = result.data.filter((card) => card.board_id === id);
          setCards(cardList);
          console.log("Cards changed")
        // }
      // }
      // setCards(cardList);
    } else {
      console.log("Invalid response data format");
    }
    })
    .catch((err) => {
      console.log(err);
    });
    
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
      if (card.id === id) {
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
            <button onClick={() => {deleteBoard(currentBoard.id)}}>Delete board</button>
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
            <p>{currentCard.message} </p>
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
