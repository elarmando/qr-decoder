
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
}

export class CountData {
  public count: number = 0;
  public col_index: number = 0;
  public color: number = 0;
}



