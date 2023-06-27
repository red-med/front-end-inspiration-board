import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
    return (
        <div className="card">
            <h3>{props.title}</h3>
        </div>
    );
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf (
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number.isRequired,
            date_created: PropTypes.string.isRequired
        })
    )
}

export default Board;