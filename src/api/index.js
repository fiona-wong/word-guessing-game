export const getWordsApi = () => {
    const PROXY = "https://cors-anywhere.herokuapp.com";
    const URL = "http://app.linkedin-reach.io/words";
    return fetch(`${PROXY}/${URL}`)
        .then((wordsText) => wordsText.text())
        .then((wordsString) => wordsString.split("\n"));
};
