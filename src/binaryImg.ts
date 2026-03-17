export default class BinaryImg {
  public static create(data: ImageData): number[][] {
    let blockSize = 8;
    let newMatrix: number[][] = [];
    let grayImg = createGrayImg(data)
    let w = data.width;
    let h = data.height;

    for (let y = 0; y < h; y++) {
      let row: number[] = [];
      let row_range = calcBlockBound(y, blockSize, h);

      for (let x = 0; x < w; x++) {
        let col_range = calcBlockBound(x, blockSize, w);
        let avg = calcAvg(grayImg, w, h, col_range.start, col_range.end, row_range.start, row_range.end);
        let is_white = grayImg[y * w + x] > avg;
        let val = is_white ? 255 : 0;

        row.push(val);
      }
      newMatrix.push(row);
    }

    return newMatrix;
  }
}

function calcAvg(img: Uint8Array, w: number, h: number, col_start: number, col_end: number, row_start: number, row_end: number) {
  let size = ((col_end - col_start + 1) * (row_end - row_start + 1));
  var min = 255;
  var max = 0;


  for (let y = row_start; y <= row_end; y++) {
    for (let x = col_start; x <= col_end; x++) {
      var color = img[y * w + x];

      if (color < min)
        min = color;

      if (color > max)
        max = color;
    }
  }

  return (max - min) / 2.0;
}

function calcBlockBound(pos: number, blockSize: number, limit: number) {
  let halfSize = blockSize / 2;
  let col_start = pos - halfSize;

  if (col_start < 0)
    col_start = 0;

  let col_end = col_start + blockSize - 1;

  if (col_end >= limit) {
    col_end = limit - 1;
    col_start = limit - blockSize;
  }

  return {
    start: col_start,
    end: col_end
  }
}

function createGrayImg(data: ImageData) {
  var outArr = new Uint8Array(data.height * data.width)
  for (let y = 0; y < data.height; y++) {
    for (let x = 0; x < data.width; x++) {
      let pos = (y * data.width + x);
      let index = 4 * pos;
      let r = data.data[index];
      let g = data.data[index + 1];
      let b = data.data[index + 2];

      let luminosity = 0.299 * r + 0.587 * g + 0.114 * b;

      outArr[pos] = luminosity;
    }
  }

  return outArr;
}
