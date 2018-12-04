////paint app javascript

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var brush = new Image();
brush.src = "pntBrush.png";
var mouse = {x: 0, y: 0};

var gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);

///SETUP CANVAS
function setCanvas() {
	gradient.addColorStop(0, "#000000");
	gradient.addColorStop(.8, "#EC2027");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0, canvas.width, canvas.height);
};

window.onload = setCanvas();

////MOUSE EVENT LISTENERS
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener('mousedown', function(e) {
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

////PAINT FUNCTION
var onPaint = function() {
   ctx.drawImage(brush, mouse.x-50, mouse.y-50, 100, 100);
};

////////////////CLEAR CANVAS
var clear = document.getElementById('clearcanvas');

clear.addEventListener('click', function(e) {
	setCanvas();
});

//////////////SAVE IMAGE EVENT
var link = document.getElementById('savelink');

link.addEventListener('click', function(e) {
	link.href = canvas.toDataURL();
	link.download = 'myPainting.png';
}, false);