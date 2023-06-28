import { useState } from 'react';
import Proptypes from 'prop-types';
import React from 'react';

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
    id:"",
    title: "",
    owner:""
}

const NewBoardForm = ({addBoard}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [showForm, setShowForm] = useState(true);
    const [cards, setCards] = useState([]);

    const updatePreview = (evt) => {
        const newFormData = {
        ...formData,
        [evt.target.name]: evt.target.value
        };
    
        setFormData(newFormData);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("we're in handleSubmit");
        // const newId = BOARDS[BOARDS.length - 1].id
        // const newFormData = {
        // ...formData, id: newId
        // }
        // BOARDS.push(newFormData);
        addBoard(formData);
        setFormData(INITIAL_FORM_DATA);
    }
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
    
    const toggleForm = () => {
        setShowForm((prevState) => !prevState);
    };
    
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
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
            <div>
            <button className="new-board-form__toggle-btn" onClick={toggleForm}>
                {showForm ? "Hide New Board Form" : "Show New Board Form"}
                </button>
            </div>
        </div>
    );
};
NewBoardForm.protoTypes= {
    addBoard: Proptypes.func.isRequired
}
export default NewBoardForm
