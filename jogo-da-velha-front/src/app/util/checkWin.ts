export const checkWin = (moves:number[][]) => {
    for (let i = 0; i < 3; i++) {
      if (
        moves[i][0] === moves[i][1] &&
        moves[i][1] === moves[i][2] &&
        moves[i][0] !== 0
      ) {
        return moves[i][0];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        moves[0][i] === moves[1][i] &&
        moves[1][i] === moves[2][i] &&
        moves[0][i] !== 0
      ) {
        return moves[0][i];
      }
    }

    if (
      moves[0][0] === moves[1][1] &&
      moves[1][1] === moves[2][2] &&
      moves[0][0] !== 0
    ) {
      return moves[0][0];
    }

    if (
      moves[0][2] === moves[1][1] &&
      moves[1][1] === moves[2][0] &&
      moves[0][2] !== 0
    ) {
      return moves[0][2];
    }

    return null;
  };