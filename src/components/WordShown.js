import React from "react";
import PropTypes from "prop-types";

const GuessWord = ({ letter, correctLettersGuessed }) => {
    const isNotInWord = correctLettersGuessed.indexOf(letter) === -1;
    let displayLetter = <span className="text-normal">{letter}</span>;
    if (isNotInWord) {
        displayLetter = <span className="letter-placeholder" />;
    }
    return displayLetter;
};

const WordShown = ({ currentWord, correctLettersGuessed }) => {
    return (
        <section className="word-shown_section">
            {currentWord.map((letter, index) => (
                <GuessWord key={index} letter={letter} correctLettersGuessed={correctLettersGuessed} />
            ))}
        </section>
    );
};

WordShown.propTypes = {
    currentWord: PropTypes.arrayOf(PropTypes.string),
    correctLettersGuessed: PropTypes.arrayOf(PropTypes.string)
};

export default WordShown;
