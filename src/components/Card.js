import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className="card">
            <h3>{props.message}</h3>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    date_created: PropTypes.string.isRequired
};

export default Card;