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
}

export default Board;