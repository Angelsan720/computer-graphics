// Create an UV pattern

/**
 * @author Rémi Mégret
 *
 * Create an UV pattern in the provided 2d context
 *
 * Parameters:
 *  ctx - CanvasRenderingContext2D
 */
function drawUVPattern(ctx) {
  var canvas = ctx.canvas;
  var w = canvas.width,
    h = canvas.height;
  var n = 8;
  for (var i = 0; i < n; i++)
    for (var j = 0; j < n; j++) {
      var x = w * i / n,
        y = h * j / n,
        sx = w / n,
        sy = h / n
      var u1 = i / (n - 1),
        v1 = 1 - j / (n - 1)
      var r = Math.round(255 * u1),
        g = Math.round(255 * v1),
        b = Math.round(Math.max(0, 255 * (1 - u1)))
      ctx.beginPath()
      ctx.rect(x, y, sx, sy)
      ctx.lineWidth = 3
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
      ctx.fill()
    }
  var N = 4 * n
  for (var i = 0; i < N; i++)
    for (var j = 0; j < N; j++) {
      var x = w * i / N,
        y = h * j / N,
        sx = w / N,
        sy = h / N
      ctx.beginPath()
      ctx.rect(x, y, sx, sy)
      ctx.lineWidth = 1
      ctx.strokeStyle = 'gray'
      ctx.stroke()
    }
  for (var i = 0; i < n; i++)
    for (var j = 0; j < n; j++) {
      var x = w * i / n,
        y = h * j / n,
        sx = w / n,
        sy = h / n
      var u1 = i / (n - 1),
        v1 = 1 - j / (n - 1)
      var r = Math.round(255 * u1),
        g = Math.round(255 * v1),
        b = Math.round(255 * (1 - u1 / 2 - v1 / 2))

      var jj = n - j
      var TT = String.fromCharCode(65 + i) + jj.toString()
      ctx.font = '28pt Calibri';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.fillText(TT, x + sx / 2, y + sy / 2);
    }
  for (var i = 0; i < n; i++)
    for (var j = 0; j < n; j++) {
      var x = w * i / n,
        y = h * j / n,
        sx = w / n,
        sy = h / n
      var u1 = i / (n - 1),
        v1 = 1 - j / (n - 1)
      var r = Math.round(255 * u1),
        g = Math.round(255 * v1),
        b = Math.round(255 * (1 - u1 / 2 - v1 / 2))
      ctx.beginPath()
      ctx.rect(x, y, sx, sy)
      ctx.lineWidth = 3
      ctx.strokeStyle = 'gray'; //'rgb('+(255-r)+','+(255-g)+','+(255-b)+')'
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
      ctx.stroke()
    }
  ctx.beginPath()
  ctx.rect(0, 0, w, h)
  ctx.lineWidth = 5
  ctx.strokeStyle = 'black'; //'rgb('+(255-r)+','+(255-g)+','+(255-b)+')'
  ctx.stroke()
}
