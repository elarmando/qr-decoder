
export default class PatternFinder {

  public countColorLine(imgData: ImageData, rowIndex: number): CountData[] {

    var data: CountData[] = [];
    let w = imgData.width;
    let current_color = -1;
    let current_count = 0;

    for (let i = 0; i < w; i++) {
      let color = imgData.data[(rowIndex * w + i) * 4];

      if (current_color === color) {
        current_count++;
      } else {
        if (current_color !== -1) {
          var countData = new CountData();
          countData.count = current_count;
          countData.color = color;
          countData.col_index = i - current_count;
          data.push(countData);
        }
        current_count = 1;;
        current_color = color;
      }
    }

    if (current_count > 0) {
      var countData = new CountData();
      countData.count = current_count;
      countData.color = current_color;
      countData.col_index = w - current_count;
      data.push(countData);
    }

    return data;
  }

  public lineContainsPattern(line: CountData[]): boolean {
    let pattern = [1, 1, 3, 1, 1];

    for (let i = 0; i < line.length; i++) {
      if (i + pattern.length - 1 < line.length) {
        let success = true;
        let mult = -1;

        for (let j = 0; j < pattern.length; j++) {
          if (success === false)
            break;

          let count = line[i + j].count;

          if (mult === -1)
            mult = count;

          if (mult * pattern[j] !== count)
            success = false;
        }

        if (success)
          return true;

      }
    }

    return false;
  }
}

export class CountData {
  public count: number = 0;
  public col_index: number = 0;
  public color: number = 0;

  constructor(count?: number, col_index?: number, color?: number) {
    this.count = count ? count : 0;
    this.col_index = col_index ? col_index : 0;
    this.color = color ? color : 0;
  }
}



