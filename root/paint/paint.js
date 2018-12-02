////paint app javascript

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
function setCanvas() {	
	gradient.addColorStop(0, "#000000");
	gradient.addColorStop(.8, "#EC2027");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0, canvas.width, canvas.height);
};

window.onload = setCanvas();

var brush = new Image();
brush.src = "pntBrush.png";
var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';

canvas.addEventListener('mousedown', function(e) {
   // ctx.drawImage(brush, mouse.x-50, mouse.y-50, 100, 100);
   // ctx.beginPath();
   // ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
   ctx.drawImage(brush, mouse.x-50, mouse.y-50, 100, 100);
   // ctx.lineTo(mouse.x, mouse.y);
   // ctx.stroke();
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

/////////////////TOUCH EVENTS
canvas.addEventListener('touchstart', function(e) {
	mouse = getTouchPos(canvas, e);
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent('mousedown', {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchend', function(e) {
	var mouseEvent = new MouseEvent('mouseup', {});
	canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchmove', function(e) {
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent('mousemove', {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);
}, false);

function getTouchPos(canvasDom, touchEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: touchEvent.touches[0].clientX - rect.left,
		y: touchEvent.touches[0].clientY -rect.top
	};
};

/////PREVENT CANVAS SCROLL DURING TOUCH EVENTS on mobile
function preventScroll(e) {
	e.preventDefault();
};

document.addEventListener('touchmove', preventScroll, {passive: false});

