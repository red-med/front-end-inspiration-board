import { useState } from 'react';
import Proptypes from 'prop-types';
import React from 'react';

const INITIAL_FORM_DATA = {
    id:0,
    message: "",
    likes_count:0,
    date_created:"01/01/2011"
}

const NewCardForm = ({ addCard }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const updatePreview = (evt) => {
        const newFormData = {
        ...formData,
        [evt.target.name]: evt.target.value
        };
    
        setFormData(newFormData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("we're in handleSubmit");
        addCard(formData);

        setFormData(INITIAL_FORM_DATA);
    }

    return (
        <section className="card-form">
            <form onSubmit={handleSubmit}>
                    <div>
                    <label>Message</label>
                    </div>
                        <input type="text"
                            id="message" 
                            name="message" 
                            value={formData.message}
                            onChange={updatePreview}
                        />
                    <p>Preview:</p>
                    <div id="preview">{formData.message}</div>
                    <input className="submit-button" type="submit" value="Submit" onClick={handleSubmit}/>
                </form>
        </section>
    );
};
NewCardForm.protoTypes= {
    addCard: Proptypes.func.isRequired
}
export default NewCardForm
