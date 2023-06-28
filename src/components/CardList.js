import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = ({ cards, increaseLikes }) => {
    const getBoardListJSX = (cards) => {
        return cards.map((card) => {
            return (
                <Card
                    id={card.id}
                    message={card.message}
                    likes_count={card.likes_count}
                    date_created={card.date_created}
                    increaseLikes={increaseLikes}
                />
            );
        });
    };
    return <ul className="board-list">{getBoardListJSX(cards)}</ul>;
};

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number.isRequired,
            date_created: PropTypes.string.isRequired
        })
    ),
    increaseLikes: PropTypes.func.isRequired
};

export default CardList;