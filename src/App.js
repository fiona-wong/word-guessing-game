import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { ALPHABET } from "./constants";
import { getWordsApi } from "./api";

import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";

import wrongGuessOne from "./images/wrongguess1.png";
import wrongGuessTwo from "./images/wrongguess2.png";
import wrongGuessThree from "./images/wrongguess3.png";
import wrongGuessFour from "./images/wrongguess4.png";
import wrongGuessFive from "./images/wrongguess5.png";
import wrongGuessSix from "./images/wrongguess6.png";
import winnerImage from "./images/winnerwinner.gif";

import "./app.css";

const WINNING_TEXT = "YAY YOU WON! Play again?";

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const Letter = ({ letter, ...props }) => (
    <button className="alphabet-button" {...props}>
        {letter}
    </button>
);

const GuessWord = ({ letter, correctLettersGuessed }) => {
    const isNotInWord = correctLettersGuessed.indexOf(letter) === -1;
    let displayLetter = <span className="text-normal">{letter}</span>;
    if (isNotInWord) {
        displayLetter = <span className="letter-placeholder" />;
    }
    return displayLetter;
};

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

class App extends Component {
    state = {
        wordBank: [],
        currentWord: [],
        incorrectLettersGuessed: [],
        correctLettersGuessed: [],
        wrongGuessCount: 0,
        uniqueLetterCount: 0,
        disableAllButtons: false,
        showResetModal: false,
        gameOverText: "",
        isLoading: true
    };

    componentDidMount() {
        getWordsApi().then((wordList) => {
            this.setState(
                {
                    wordBank: wordList
                },
                () => {
                    this.getRandomWord();
                    this.setState({
                        isLoading: false
                    });
                }
            );
        });
    }

    getRandomWord = () => {
        const { wordBank } = this.state;
        // make word into an array of letters
        const randomWord = wordBank[getRandomInt(wordBank.length)].split("");
        const wordSet = new Set(randomWord);
        this.setState({
            currentWord: randomWord,
            uniqueLetterCount: wordSet.size
        });
    };

    handleClickLetter = (letter) => {
        const { currentWord } = this.state;

        if (currentWord.indexOf(letter) === -1) {
            const newIncorrectLettersGuessed = [...this.state.incorrectLettersGuessed, letter];
            this.setState(
                {
                    wrongGuessCount: this.state.wrongGuessCount + 1,
                    incorrectLettersGuessed: newIncorrectLettersGuessed
                },
                () => {
                    if (this.state.wrongGuessCount === 6) {
                        this.handleLoseGame();
                    }
                }
            );
        } else {
            const newCorrectLettersGuessed = [...this.state.correctLettersGuessed, letter];
            this.setState(
                {
                    correctLettersGuessed: newCorrectLettersGuessed
                },
                () => {
                    if (this.state.correctLettersGuessed.length === this.state.uniqueLetterCount) {
                        this.handleWinGame();
                    }
                }
            );
        }
    };

    handleWinGame = () => {
        this.setState(
            {
                gameOverText: WINNING_TEXT
            },
            () => {
                this.handleOpenModal();
            }
        );
    };

    handleLoseGame = () => {
        this.setState(
            {
                gameOverText: "Bummer, you lost! Play again?"
            },
            () => {
                this.handleOpenModal();
            }
        );
    };

    handleRetryGame = () => {
        location.reload();
    };

    handleCloseModal = () => {
        this.setState({
            showResetModal: false,
            disableAllButtons: true
        });
    };

    handleOpenModal = () => {
        this.setState({
            showResetModal: true
        });
    };

    render() {
        const {
            currentWord,
            correctLettersGuessed,
            wrongGuessCount,
            incorrectLettersGuessed,
            disableAllButtons,
            showResetModal,
            gameOverText,
            isLoading
        } = this.state;
        const lettersGuessed = [...correctLettersGuessed, ...incorrectLettersGuessed];
        const gameWon = gameOverText === WINNING_TEXT;
        let loadingSpinner = null;
        if (isLoading) {
            loadingSpinner = <LoadingSpinner />;
        }
        return (
            <main className="main-content">
                <h1>Guess the Word Game</h1>
                {loadingSpinner}
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
                                onClick={this.handleClickLetter.bind(this, letter)}
                                key={letter}
                                disabled={lettersGuessed.indexOf(letter) !== -1 || disableAllButtons}
                                letter={letter}
                            />
                        ))}
                    </div>
                </section>
                <section className="word-shown_section">
                    {currentWord.map((letter, index) => (
                        <GuessWord key={index} letter={letter} correctLettersGuessed={correctLettersGuessed} />
                    ))}
                </section>
                <section className="letters-guessed_section">
                    <h3>Wrong Letters Guessed:</h3>
                    {incorrectLettersGuessed.map((letter, index) => (
                        <span className="text-normal" key={index}>
                            {letter}
                        </span>
                    ))}
                </section>
                <section className="guesses-left_section">
                    <h3>Numbers of Guesses Left:</h3>
                    <span className="text-normal">{6 - wrongGuessCount}</span>
                </section>
                <Modal show={showResetModal}>
                    <div className="main-content main-content_modal">
                        <p className="text-normal">{gameOverText}</p>
                        <div>
                            <button className="modal-button modal-button_secondary" onClick={this.handleCloseModal}>
                                Close
                            </button>
                            <button className="modal-button modal-button_primary" onClick={this.handleRetryGame}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
                <button onClick={this.handleRetryGame} className="reset-button">
                    Play Again
                </button>
            </main>
        );
    }
}

export default hot(module)(App);
