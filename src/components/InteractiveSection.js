import React from "react";
import PropTypes from "prop-types";
import { ALPHABET } from "../constants";
import wrongGuessOne from "../images/wrongguess1.png";
import wrongGuessTwo from "../images/wrongguess2.png";
import wrongGuessThree from "../images/wrongguess3.png";
import wrongGuessFour from "../images/wrongguess4.png";
import wrongGuessFive from "../images/wrongguess5.png";
import wrongGuessSix from "../images/wrongguess6.png";
import winnerImage from "../images/winnerwinner.gif";

const WRONG_GUESS_IMAGE_MAP = [
    {
        imageSrc: undefined,
        imageAlt: undefined
    },
    {
        imageSrc: wrongGuessOne,
        imageAlt: "wrong guess 1"
    },
    {
        imageSrc: wrongGuessTwo,
        imageAlt: "wrong guess 2"
    },
    {
        imageSrc: wrongGuessThree,
        imageAlt: "wrong guess 3"
    },
    {
        imageSrc: wrongGuessFour,
        imageAlt: "wrong guess 4"
    },
    {
        imageSrc: wrongGuessFive,
        imageAlt: "wrong guess 5"
    },
    {
        imageSrc: wrongGuessSix,
        imageAlt: "wrong guess 6"
    }
];

const Letter = ({ letter, ...props }) => (
    <button className="alphabet-button" {...props}>
        {letter}
    </button>
);

const InteractiveSection = ({ gameWon, wrongGuessCount, lettersGuessed, disableAllButtons, handleClick }) => {
    return (
        <section className="interactive_section">
            <img
                src={gameWon ? winnerImage : WRONG_GUESS_IMAGE_MAP[wrongGuessCount].imageSrc}
                alt={gameWon ? winnerImage : WRONG_GUESS_IMAGE_MAP[wrongGuessCount].imageAlt}
                width="300"
                height="300"
            />
            <div className="alphabet_section">
                <p>Click letters to guess!</p>
                {ALPHABET.map((letter) => (
                    <Letter
                        onClick={handleClick.bind(this, letter)}
                        key={letter}
                        disabled={lettersGuessed.indexOf(letter) !== -1 || disableAllButtons}
                        letter={letter}
                    />
                ))}
            </div>
        </section>
    );
};

InteractiveSection.propTypes = {
    gameWon: PropTypes.bool,
    wrongGuessCount: PropTypes.number,
    lettersGuessed: PropTypes.arrayOf(PropTypes.string),
    disableAllButtons: PropTypes.bool,
    handleClick: PropTypes.func
};

export default InteractiveSection;
