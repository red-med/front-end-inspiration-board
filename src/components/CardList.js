import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = ({ cards, increaseLikes, deleteCard }) => {
    const getBoardListJSX = (cards) => {
        return cards.map((card) => {
            return (
                <Card
                    key={card.id}
                    id={card.id}
                    message={card.message}
                    likes_count={card.likes_count}
                    date_created={card.date_created}
                    board_id={card.board_id}
                    increaseLikes={increaseLikes}
                    deleteCard={deleteCard}
                />
            );
        });
    };
    return <ul className="card-list">{getBoardListJSX(cards)}</ul>;
};

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number.isRequired,
            date_created: PropTypes.string.isRequired,
            board_id: PropTypes.number.isRequired,
        })
    ),
    increaseLikes: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default CardList;