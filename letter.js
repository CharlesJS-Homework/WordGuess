/* eslint-env node, es6 */

function Letter(value) {
  this.value = value;
  this.guessed = false;
}

Letter.prototype.toString = function() {
  return this.guessed ? this.value : '_';
};

Letter.prototype.check = function(value) {
  if (value === this.value.normalize('NFD')[0].toLowerCase()) {
    this.guessed = true;
    return true;
  } else {
    return false;
  }
};

module.exports = Letter;
