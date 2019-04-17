import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { getWordsApi } from "./api";

import ConditionalComponent from "./components/ConditionalComponent";
import InteractiveSection from "./components/InteractiveSection";
import WordShown from "./components/WordShown";
import WrongLettersGuessed from "./components/WrongLettersGuessed";
import GuessesLeft from "./components/GuessesLeft";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";

import "./app.css";

const WINNING_TEXT = "YAY YOU WON! Play again?";

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
const isNotIncluded = (list, letter) => list.indexOf(letter) === -1;

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
        isLoading: true,
        showHintModal: false
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
            this.handleIncorrectGuess(letter);
        } else {
            this.handleCorrectGuess(letter);
        }
    };

    handleCorrectGuess = (letter) => {
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
    };

    handleIncorrectGuess = (letter) => {
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

    handleEndGame = () => {
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

    handleHintClick = () => {
        this.setState({
            showHintModal: true
        });
    };

    handleDismissModal = () => {
        this.setState({
            showHintModal: false
        });
    };

    handleShowHint = () => {
        const { correctLettersGuessed, currentWord } = this.state;
        const hintLetter = currentWord.find((letter) => correctLettersGuessed.indexOf(letter) === -1);
        this.handleCorrectGuess(hintLetter);
        this.setState({
            showHintModal: false
        });
    };

    render() {
        const {
            currentWord,
            correctLettersGuessed,
            wrongGuessCount,
            incorrectLettersGuessed,
            disableAllButtons,
            showHintModal,
            showResetModal,
            gameOverText,
            isLoading
        } = this.state;
        const lettersGuessed = [...correctLettersGuessed, ...incorrectLettersGuessed];
        const gameWon = gameOverText === WINNING_TEXT;

        return (
            <main className="main-content">
                <h1>Guess the Word Game</h1>
                <ConditionalComponent shouldRender={isLoading}>
                    <LoadingSpinner />
                </ConditionalComponent>
                <InteractiveSection
                    gameWon={gameWon}
                    handleClick={this.handleClickLetter}
                    lettersGuessed={lettersGuessed}
                    wrongGuessCount={wrongGuessCount}
                    disableAllButtons={disableAllButtons}
                />
                <WordShown currentWord={currentWord} correctLettersGuessed={correctLettersGuessed} />
                <WrongLettersGuessed incorrectLettersGuessed={incorrectLettersGuessed} />
                <GuessesLeft wrongGuessCount={wrongGuessCount} />
                <button className="hint-button" onClick={this.handleHintClick}>
                    Hint
                </button>
                <ConditionalComponent shouldRender={showHintModal}>
                    <Modal
                        modalText="Are you suuuuuuure you want a hint?"
                        handleSecondaryAction={this.handleDismissModal}
                        handlePrimaryAction={this.handleShowHint}
                    />
                </ConditionalComponent>
                <ConditionalComponent shouldRender={showResetModal}>
                    <Modal
                        modalText={gameOverText}
                        handleSecondaryAction={this.handleEndGame}
                        handlePrimaryAction={this.handleRetryGame}
                    />
                </ConditionalComponent>
                <button onClick={this.handleRetryGame} className="reset-button">
                    Play Again
                </button>
            </main>
        );
    }
}

export default hot(module)(App);
