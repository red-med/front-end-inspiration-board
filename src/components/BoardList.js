import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, changeBoard }) => {
    const getBoardListJSX = (boards) => {
        return boards.map((board) => {
            return (
                <Board
                    key={board.board_id}
                    id={board.board_id}
                    title={board.title}
                    owner={board.owner}
                    changeBoard={changeBoard}
                />
            );
        });
    };
    return <ol className="board-list">{getBoardListJSX(boards)}</ol>;
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            board_id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
        })
    ),
    changeBoard: PropTypes.func.isRequired
};

export default BoardList;