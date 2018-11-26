function playerColor(player) {
  if ('' + player === '0') return 'black';
  if ('' + player === '1') return 'white';
  return '';
}
export default playerColor;
