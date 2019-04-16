import React from "react";
import PropTypes from "prop-types";

const GuessesLeft = ({ wrongGuessCount }) => {
    return (
        <section className="guesses-left_section">
            <h3>Numbers of Guesses Left:</h3>
            <span className="text-normal">{6 - wrongGuessCount}</span>
        </section>
    );
};

GuessesLeft.propTypes = {
    wrongGuessCount: PropTypes.number
};

export default GuessesLeft;
