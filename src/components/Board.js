import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
    return (
        <div className="card">
            <h2>Test</h2>
        </div>
    );
};

Board.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
        })
    )
};

export default Board;