# Word Guessing Game

This is a simple word guessing game, or more popularly known as hangman. Opted not to use the hangman graphic as I feel it is an insensitive image.
Premise is the same, 6 wrong guesses and you lose the game.

## Getting Started

To run the program locally, clone the repo and:

```
npm install
```

or

```
yarn add
```

Either package manager you choose should work and install all the dependencies

### Running tests

```
npm test
```

Runs jest test environment

### How To Use

```
npm start
```

or

```
yarn start
```

Go to localhost:3000 and you should see the game

### How To Deploy

install netlify cli or use web client
build production bundle using

```
npm build
```

then run

```
netlify deploy
```

deploy path is "build

check the draft and make sure everything is working, if all is well run

```
netlify deploy --prod
```

Live demo can be found here: https://guess-word-game.netlify.com/
