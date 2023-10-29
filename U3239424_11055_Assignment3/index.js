const canvas = document.getElementById('canvas');
// canvas
const ctx = canvas.getContext('2d');
// context
const canvasW = canvas.getBoundingClientRect().width;
const canvasH = canvas.getBoundingClientRect().height;
// canvas height and width

var circleSize = 10;
// sets the size that the city points will be
var myCircleArray = [];
// contains all the city points
var toggle = true;
// toggle to make sure the city points aren't constantly reset
var a = 1;
// this value increases if a mouse button is pressed to avoid these buttons from being held down

// Gets the mouse position
// From: https://www.codingbeautydev.com/blog/javascript-get-mouse-position
let mousePos = { x: undefined, y: undefined };
window.addEventListener('mousemove', (event) => {
	getMousePos(canvas, event);
});

// From: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	mousePos = {
		x: (evt.clientX - rect.left) * scaleX,
		y: (evt.clientY - rect.top) * scaleY
	};
	console.log(`(${mousePos.x}, ${mousePos.y})`);
	/*return {
	  x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
	  y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}*/
}

// main function
function draw() {
	ctx.clearRect(0, 0, canvasW, canvasH);

	// when the page is loaded the city points are created
	if (toggle == true) {
		addCities();
		toggle = false;
	}

	// checks if any mouse buttons have been pressed
	if (mouseIsPressed) {
		if (a == 1) {
			// this exists so that the user cant hold down the button and constantly call this function
			clickEvent();
		}
		a++;
	} else { a = 1; }

	// value to check if any points are currently active
	let anyActive = false;
	for (i = 0; i < myCircleArray.length; i++) {
		// loops through and draws the city points on the map
		myCircleArray[i].draw();
		if (myCircleArray[i].active == true) {
			// if a city is active, the function that sets the HTML text is called
			whileCityActive(i);
			anyActive = true;
			// this value is set to true as the loop has found an active point
		}
	}
	if (anyActive == false) {
		// if no active points are found in the previous loop the text is set to empty
		whileCityActive(7);
	}
}

// creates all the city point objects
function addCities() {
	myCircleArray[0] = new circleObj(80, 480);
	myCircleArray[1] = new circleObj(470, 490);
	myCircleArray[2] = new circleObj(570, 570);
	myCircleArray[3] = new circleObj(640, 520);
	myCircleArray[4] = new circleObj(670, 500);
	myCircleArray[5] = new circleObj(730, 350);
	myCircleArray[6] = new circleObj(590, 670);
}

function whileCityActive(city) {
	// gets the HTML elements
	let p1Head = document.getElementById('detailsHead');
	let p1 = document.getElementById('details');
	let p2Head = document.getElementById('detailsHead2');
	let p2 = document.getElementById('details2');

	// checks which city point is active and sets the text
	if (city == 0) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "6% of studios are based in Perth."
		p2Head.textContent = ""
		p2.textContent = ""
	} else if (city == 1) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "9% of studios are based in Adelaide."
		p2Head.textContent = "Full time employee Location"
		p2.textContent = "9% of full time employees are based in Adelaide."
	} else if (city == 2) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "33% of studios are based in Melbourne."
		p2Head.textContent = "Full time employee Location"
		p2.textContent = "39% of full time employees are based in Melbourne."
	} else if (city == 3) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "6% of studios are based in Canberra."
		p2Head.textContent = ""
		p2.textContent = ""
	} else if (city == 4) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "17% of studios are based in Sydney."
		p2Head.textContent = "Full time employee Location"
		p2.textContent = "23% of full time employees are based in Sydney."
	} else if (city == 5) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "20% of studios are based in Brisbane."
		p2Head.textContent = "Full time employee Location"
		p2.textContent = "21% of full time employees are based in Brisbane."
	} else if (city == 6) {
		p1Head.textContent = "Studio Location"
		p1.textContent = "2% of studios are based in Hobart."
		p2Head.textContent = ""
		p2.textContent = ""
	} else {
		p1Head.textContent = ""
		p1.textContent = ""
		p2Head.textContent = ""
		p2.textContent = ""
	}
}

function circleObj(x, y, radius, colour) {
	// x pos
	this.x = x;
	// y pos
	this.y = y;
	// circle size
	this.radius = circleSize;
	// circle colour
	this.colour = "limegreen";
	// whether the point is active or not
	this.active = false;

	// draws the shape
	this.draw = function () {
		ctx.strokeStyle = this.colour;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.fill();
	};
}

// when the user clicks, checks if they have clicked on a circle
function clickEvent() {
	// loops through each city point
	for (i = 0; i < myCircleArray.length; i++) {
		// checks if the point has been clicked on
		if (getDistance(myCircleArray[i].x, myCircleArray[i].y, mousePos.x, mousePos.y) < myCircleArray[i].radius) {
			// checks if the point is alread active or not
			if (myCircleArray[i].active == false) {
				// if it is not already active it becomes active
				myCircleArray[i].colour = 'red';
				myCircleArray[i].active = true;
				// loops through the city points again to check if another point is also active already
				for (b = 0; b < myCircleArray.length; b++) {
					// if there is another active point it is deactivated
					if (b != i) {
						myCircleArray[b].colour = 'limegreen';
						myCircleArray[b].active = false;
					}
				}
			} else {
				// if the point is active it is deactivated
				myCircleArray[i].colour = 'limegreen';
				myCircleArray[i].active = false;
			}
		}
	}
}

// gets distance between two points
// reference from: https://www.youtube.com/watch?v=XYzA_kPWyJ8
function getDistance(x1, y1, x2, y2) {
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// This is for the drop down menu / button
function difMenu() {
	document.getElementById("d").classList.toggle("show");
}

window.onclick = function (event) {
	if (!event.target.matches('.difs')) {
		var dropdowns = document.getElementsByClassName("dropContent");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}