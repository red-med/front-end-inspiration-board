import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import BoardList from "./components/BoardList.js"
import CardList from "./components/CardList.js"
import axios from "axios";

const BOARDS = [{id: 0, title: "", owner: ""}]

const INITIAL_FORM_DATA = {
  id:"",
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


  return ();
}


export default App;
