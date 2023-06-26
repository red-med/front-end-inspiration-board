import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards }) => {
    const getBoardListJSX = (boards) => {
        return boards.map((board) => {
            return (
                <Board
                    id={board.id}
                    title={board.title}
                    owner={board.owner}
                />
            );
        });
    };
    return <ul className="board-list">{getBoardListJSX(boards)}</ul>;
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
        })
    )
};

export default BoardList;