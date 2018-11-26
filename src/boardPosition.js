// 0: out black
// 1-6: home black
// 7-18: field
// 19-24: home white
// 25: out white
// 26: bar
// start positions
// white: 1/2 12/5 17/3 19/5  [1]
// black: 6/5 8/3 13/5 24/2  [0]
const boardPosition = {
  start: [
    [],
    [1, 1],
    [],
    [],
    [],
    [],
    [0, 0, 0, 0, 0],
    [],
    [0, 0, 0],
    [],
    [],
    [],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [],
    [],
    [],
    [1, 1, 1],
    [],
    [1, 1, 1, 1, 1],
    [],
    [],
    [],
    [],
    [0, 0],
    [],
    [],
  ],
  empty: Array(27).fill([]),
};

export default boardPosition;
