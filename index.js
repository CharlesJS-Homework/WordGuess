/* eslint-env node, es6 */
/* eslint-disable no-console */

const Word = require('./word.js');
const fs = require('fs');
const keypress = require('keypress');

const startingGuessCount = 8;

const argv = process.argv;
const wordListPath = (argv.length >= 3) ? argv[2] : '/usr/share/dict/words';

let word;
let guessCount;
let guesses = [];

fs.readFile(wordListPath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(`Unable to read word list file at ${wordListPath}: ${err}`);
    console.log('Please provide a valid path to a list of words (UTF-8, newline-separated)');
    process.exit(1);
  }

  const wordList = data.split('\n');
  startGame(new Word(wordList[Math.floor(Math.random() * wordList.length)]));
});

function startGame(_word) {
  word = _word;
  guessCount = startingGuessCount;

  keypress(process.stdin);
  console.log('HANGMAN!');
  logStatus();

  process.stdin.on('keypress', keyPressed);
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function logStatus() {
  console.log(`${guessCount} guess${guessCount != 1 ? 'es' : ''} left!`);
  console.log(`${word.toString()}\n`);
}

function keyPressed(ch, key) {
  if (!key || !key.sequence || key.sequence.length != 1) {
    return;
  }

  const guess = key.sequence[0].toLowerCase();

  if (guesses.includes(guess)) {
    return;
  }

  guesses.push(guess);

  if (word.guess(guess)) {
    hit();
  } else {
    whiff();
  }
}

function hit() {
  logStatus();

  if (word.won()) {
    console.log('YOU ARE FREED! After that harrowing ordeal, you resolve never to be late');
    console.log('paying a parking ticket EVER AGAIN.');
    process.exit(0);
  }
}

function whiff() {
  guessCount--;

  if (guessCount > 0) {
    logStatus();
  } else {
    console.log('YOU HAVE BEEN HANGED. Your lifeless body involuntarily defecates itself');
    console.log("as access to your nervous system's automatic motor functions is cut off");
    console.log('by the snapping of your spinal cord by the force of the rope. One moment');
    console.log('before your brain shuts down forever, you reflect on the possibility that');
    console.log('replacing the criminal justice system with one based on the ability to');
    console.log('guess randomly-chosen words was not such a great idea.');
    console.log('\nBETTER LUCK NEXT TIME!');
    console.log(`\n(In case you're curious: it was ${word.correct()})`);

    process.exit(0);
  }
}