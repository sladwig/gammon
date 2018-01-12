const moveDirection = function(currentPlayer) {
  return currentPlayer === "0" ? -1 : 1;
}

export default moveDirection;