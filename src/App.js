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
  id:"",
  title: "",
  owner:""
}

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const [cards, setCards] = useState(currentBoard.cards);
  const [showForm, setShowForm] = useState(true);





}

export default App;
