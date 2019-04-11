import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { transformFromApi } from "./utils/transformation";
import "./App.css";

class App extends Component {
    state = {
        wordBank: [],
        wordsGuessedSuccess: [],
        wordsGuessedFail: []
    };
    componentDidMount() {
        fetch(
            "https://cors-anywhere.herokuapp.com/http://app.linkedin-reach.io/words"
        )
            .then((wordsText) => wordsText.text())
            .then((wordsString) =>
                this.setState({ wordBank: wordsString.split("\n") })
            );
        // .then(
        //     (wordObject) =>
        //         console.log(wordObject) ||
        //         this.setState({ wordBank: wordObject })
        // );
    }

    render() {
        return (
            <div className="App">
                <h1> Hi there </h1>
                {this.state.wordBank}
            </div>
        );
    }
}

export default hot(module)(App);
