// moving is a helper object with all the necessities
// around moving stones around
// it considers the current player, but doesn't validate
// if a move is legal or not, for this you should use
// the functions provided by ./boarding.js
// it does however calculate all the positions correctly

const player = {
  isWhite(currentPlayer) {
    return currentPlayer === '1';
  },
  isBlack(currentPlayer) {
    return currentPlayer === '0';
  },
};

const moving = {
  direction(currentPlayer) {
    if (player.isBlack(currentPlayer)) {
      return -1;
    }
    if (player.isWhite(currentPlayer)) {
      return 1;
    }
    return 0;
  },

  counterDirection(currentPlayer) {
    return this.direction(currentPlayer) * -1;
  },

  from(currentPlayer, at, dice) {
    return this.sanitizeTo(this.counterDirection(currentPlayer) * dice + at);
  },

  sanitizeTo(to) {
    if (to < 0) {
      to = 0;
    }
    if (to > 25) {
      to = 25;
    }
    return to;
  },

  to(currentPlayer, at, dice) {
    return this.sanitizeTo(this.direction(currentPlayer) * dice + at);
  },

  // position of stone after moving out of bar
  out(currentPlayer, dice) {
    if (player.isBlack(currentPlayer)) {
      return this.to(currentPlayer, 25, dice);
    }
    if (player.isWhite(currentPlayer)) {
      return this.to(currentPlayer, 0, dice);
    }
    return 26; // maybe returning false is ok
  },

  distance(from, to) {
    return Math.abs(from - to);
  },
};

export { moving as default, player };
// {cameFrom, moveTo, moveDirection};
