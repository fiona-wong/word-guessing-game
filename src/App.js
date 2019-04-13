import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { ALPHABET } from "./constants";

import "./App.css";

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const Letter = ({ letter, ...props }) => (
    <button className="alphabet-button" {...props}>
        {letter}
    </button>
);

class App extends Component {
    state = {
        wordBank: [],
        currentWord: [],
        incorrectLettersGuessed: [],
        correctLettersGuessed: [],
        wrongGuessCount: 0,
        uniqueLetterCount: 0,
        disableAllButtons: false
    };

    componentDidMount() {
        const PROXY = "https://cors-anywhere.herokuapp.com";
        const URL = "http://app.linkedin-reach.io/words";
        fetch(`${PROXY}/${URL}`)
            .then((wordsText) => wordsText.text())
            .then((wordsString) => {
                const wordList = wordsString.split("\n");
                this.setState({
                    wordBank: wordList
                });
                this.getRandomWord();
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
                        this.handleEndOfGame("You LOSTTT :( Try again?");
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
                        this.handleEndOfGame("YAY!!! You won! Try again?");
                    }
                }
            );
        }
    };

    handleEndOfGame = (message) => {
        const shouldStartNewGame = confirm(message);
        if (shouldStartNewGame) {
            location.reload();
        } else {
            this.setState({
                disableAllButtons: true
            });
        }
    };

    render() {
        const {
            currentWord,
            correctLettersGuessed,
            wrongGuessCount,
            incorrectLettersGuessed,
            disableAllButtons
        } = this.state;
        const lettersGuessed = [...correctLettersGuessed, ...incorrectLettersGuessed];
        return (
            <main>
                <div className="App">
                    <h1>Hangman</h1>
                    <section className="alphabet_section">
                        {ALPHABET.map((letter) => (
                            <Letter
                                onClick={this.handleClickLetter.bind(this, letter)}
                                key={letter}
                                disabled={lettersGuessed.indexOf(letter) !== -1 || disableAllButtons}
                                letter={letter}
                            />
                        ))}
                    </section>
                    <section className="word-shown_section">
                        {currentWord.map((letter, index) =>
                            correctLettersGuessed.indexOf(letter) === -1 ? (
                                <div key={index} className="letter-placeholder" />
                            ) : (
                                <p key={index}>{letter}</p>
                            )
                        )}
                    </section>
                    <section className="letters-guessed_section">
                        Wrong Letters Guessed:
                        {incorrectLettersGuessed.map((letter, index) => (
                            <p key={index}>{letter}</p>
                        ))}
                    </section>
                    <section className="guesses-left_section">
                        Numbers of Guesses Left:
                        <p>{6 - wrongGuessCount}</p>
                    </section>
                </div>
            </main>
        );
    }
}

export default hot(module)(App);
