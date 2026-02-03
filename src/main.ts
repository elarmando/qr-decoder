import BinaryImg from "./binaryImg";

window.onload = function () {
  Start();
}

function Start() {
  var inputImg = document.querySelector("#input-img") as HTMLInputElement;
  var canvas = document.querySelector("#canvas") as HTMLCanvasElement;;

  inputImg.addEventListener("change", () => {
    var file = inputImg.files[0];

    if (!file)
      return;

    OnImageChange(file, canvas);

  });

}

async function OnImageChange(file: File, canvas: HTMLCanvasElement) {
  var data = await getImgData(file, canvas);
  var binImg = BinaryImg.create(data);
  var extraCanvas = document.querySelector("#extra-canvas") as HTMLCanvasElement;

  drawBinImage(binImg, extraCanvas);
}

function drawBinImage(binImage: number[][], canvas: HTMLCanvasElement) {
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  var w = binImage[0].length;
  var h = binImage.length;

  canvas.width = w;
  canvas.height = h;

  console.log("width " + w + " height " + h);

  var imgData = ctx.createImageData(w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let isWhite = binImage[y][x];
      //let color = (isWhite) ? 255 : 0;
      let color = isWhite;
      let index = 4 * (y * w + x);

      imgData.data[index] = color;
      imgData.data[index + 1] = color;
      imgData.data[index + 2] = color;
      imgData.data[index + 3] = 255;

    }
  }

  ctx.putImageData(imgData, 0, 0);
}

function getImgData(file: any, canvas: HTMLCanvasElement): Promise<ImageData> {
  return new Promise<ImageData>((s, f) => {
    var reader = new FileReader();
    var img = new Image();
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);

      var result = ctx.getImageData(0, 0, img.width, img.height);

      s(result);
    }

    img.onerror = (e) => f(e);

    reader.onload = () => {
      img.src = reader.result as string;
    }

    reader.onerror = (e) => f(e);

    reader.readAsDataURL(file);
  });
}
