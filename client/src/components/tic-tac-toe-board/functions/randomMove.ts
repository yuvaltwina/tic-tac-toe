import { BoardValuesEnum } from '../../../types/BoardValues';

const { emptySign } = BoardValuesEnum;

function randomMove(arr: string[]) {
  const emptyIndices = arr.reduce((indices: number[], val, index) => {
    if (val === emptySign) {
      indices.push(index);
    }
    return indices;
  }, []);

  if (emptyIndices.length > 0) {
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    return randomIndex;
  }
  return 0;
}
export default randomMove;
