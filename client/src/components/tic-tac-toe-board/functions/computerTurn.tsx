import { BoardValuesEnum } from '../../../types/BoardValues';

const { emptySign } = BoardValuesEnum;

function computerBestIndex(arr: string[]) {
  const emptyIndices = arr.reduce((indices, val, index) => {
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
  return null;
}
export default computerBestIndex;
