import React from "react";
import PropTypes from "prop-types";

const WrongLettersShown = ({ incorrectLettersGuessed }) => {
    return (
        <section className="letters-guessed_section">
            <h3>Wrong Letters Guessed:</h3>
            {incorrectLettersGuessed.map((letter, index) => (
                <span className="text-normal" key={index}>
                    {letter}
                </span>
            ))}
        </section>
    );
};

WrongLettersShown.propTypes = {
    incorrectLettersGuessed: PropTypes.arrayOf(PropTypes.string)
};

export default WrongLettersShown;
