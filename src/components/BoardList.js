import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, changeBoard }) => {
    const getBoardListJSX = (boards) => {
        return boards.map((board) => {
            return (
                <Board
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    owner={board.owner}
                    changeBoard={changeBoard}
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
    ),
    changeBoard: PropTypes.func.isRequired
};

export default BoardList;