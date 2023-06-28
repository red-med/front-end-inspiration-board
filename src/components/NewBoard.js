import { useState } from 'react';
import Proptypes from 'prop-types';

const INITIAL_FORM_DATA = {
    id:"",
    title: "",
    owner:""
}

const NewBoardForm = ({addBoard}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [showForm, setShowForm] = useState(true);
    const [currentBoard, setCurrentBoard] = useState(boards[0]);



    const changeBoard = (id) => {
        for (const board of boards) {
        if (id === board.id) {
            setCurrentBoard(board);
            setCards(board.cards)
        }
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("we're in handleSubmit");
        const newId = BOARDS[BOARDS.length - 1].id
        const newFormData = {
        ...formData, id: newId
        }
        BOARDS.push(newFormData);
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
            </section>
            <section className="card-view">
            <div>
                <h2>Cards For Pick-Me-Up-Quotes</h2>
                <CardList className="cardlist" cards={CARDS} increaseLikes={increaseLikes}/>
            </div>
            <div>
                <h2>Create a New Card</h2>
            </div>
            </section>
        </div>
        </div>
    );

};
NewBoardForm.protoTypes= {
    addBoard: Proptypes.func.isRequired
}
export default NewBoardForm
