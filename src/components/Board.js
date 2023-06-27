import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
    return (
        <li className="card">
            <button
            onClick={() => {props.changeBoard(props.id);}}>
                {props.title}
            </button>
        </li>
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