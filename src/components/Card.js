import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className="card-item">
            <h3>{props.message}</h3>
            <div className="card-info">
                <p>{props.likes_count} 💕</p>
                <button id="card-info-button" onClick={() => {props.increaseLikes(props.id)}}>+1</button>
                <button id="card-info-button" onClick={() => {props.deleteCard(props.id)}}>Delete</button>
            </div>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    date_created: PropTypes.string.isRequired,
    board_id: PropTypes.number.isRequired,
    increaseLikes: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default Card;