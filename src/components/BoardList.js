import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, changeBoard }) => {
    const getBoardListJSX = (boards) => {
        return boards.map((board) => {
            return (
                <Board
                    id={board.id}
                    title={board.title}
                    owner={board.owner}
                    cards={board.cards}
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
            cards: PropTypes.arrayOf (
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    message: PropTypes.string.isRequired,
                    likes_count: PropTypes.number.isRequired,
                    date_created: PropTypes.string.isRequired
                })
            )
        })
    ),
    changeBoard: PropTypes.func.isRequired
};

export default BoardList;