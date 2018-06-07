/* eslint-env node, es6 */

const Letter = require('./letter.js');

function Word(word) {
  this.letters = word.split('').map(letter => new Letter(letter));
}

Word.prototype.toString = function() {
  return this.letters.join(' ');
};

Word.prototype.correct = function() {
  return this.letters.map(letter => letter.value).join('');
}

Word.prototype.guess = function(guess) {
  return this.letters.reduce((found, letter) => letter.check(guess) || found, false);
};

Word.prototype.won = function() {
  return !this.letters.map(letter => letter.guessed).includes(false);
};

module.exports = Word;
