const moveDirection = function(currentPlayer) {
  let result = currentPlayer === "0" ? -1 : 1;
  console.log(result)
  return result
}

export default moveDirection;