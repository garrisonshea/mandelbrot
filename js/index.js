class Complex {
  constructor(real, imag) {
    //console.log(`Creating new instance with real: ${real}, imag: ${imag}`);
    this.re = real;
    this.im = imag;
  }

  //returns double
  abs() {
    return Math.hypot(this.re, this.im);
  }

  //times and plus should return new instance of Complex object
  plus(b) {
    let a = this;
    let real = a.re + b.re;
    let imag = a.im + b.im;
    return new Complex(real, imag);
  }

  times(b) {
    let a = this;
    let real = a.re * b.re - a.im * b.im;
    let imag = a.re * b.im + a.im * b.re;
    return new Complex(real, imag);
  }}


//mand returns [0, 255] to show if data falls in 
//Mandelbrot set
function mand(z0, max) {
  let z = z0;
  for (let t = 0; t < max; t++) {
    if (z.abs() > 2.0) {
      return t;
    }
    z = z.times(z).plus(z0);
  }
  return max;
}

function main(xc, yc, size) {
  console.log("Starting main()...");
  let n = 512;
  let max = 255;

  var canvas = document.getElementById('mandelbrot');
  var ctx = canvas.getContext('2d');

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x0 = xc - size / 2 + size * i / n;
      let y0 = yc - size / 2 + size * j / n;
      let z0 = new Complex(x0, y0);
      let gray = max - mand(z0, max);
      let color = "#" + gray.toString(16) + gray.toString(16) + gray.toString(16);
      ctx.fillStyle = color;
      ctx.fillRect(n - i, n - j, 1, 1);
    }
  }
  console.log("main() complete...");
}

main(-0.5, 0, 2.0);