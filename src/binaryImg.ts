export default class BinaryImg {

  public static create(data: ImageData): boolean[][] {
    let newMatrix: boolean[][] = [];

    for (let y = 0; y < data.height; y++) {
      let row: boolean[] = [];

      for (let x = 0; x < data.width; x++) {
        let index = 4 * (y * data.width + x);
        let r = data.data[index];
        let g = data.data[index + 1];
        let b = data.data[index + 2];
        let luminosity = 0.299 * r + 0.587 * g + 0.114 * b;
        let isBlack = luminosity < 200;

        if (isBlack) {
          row.push(false);
        } else {
          row.push(true);
        }
      }

      newMatrix.push(row);
    }

    return newMatrix;
  }
}
