export enum BoardValuesEnum {
  XSign = 'X',
  OSign = 'O',
  emptySign = '',
}

export type BoardValues = `${BoardValuesEnum}`;

export type WinningPattern = [number, number, number];
