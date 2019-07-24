var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');

function RNG(seed) {
	// LCG using GCC's constants
	this.m = 0x80000000; // 2**31;
	this.a = 1103515245;
	this.c = 12345;

	this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function() {
	this.state = (this.a * this.state + this.c) % this.m;
	return this.state;
};
RNG.prototype.nextFloat = function() {
	// returns in range [0,1]
	return this.nextInt() / (this.m - 1);
};
RNG.prototype.nextRange = function(start, end) {
	// returns in range (start, end): including start, excluding end
	// can't modulu nextInt because of weak randomness in lower bits
	var rangeSize = end - start;
	var randomUnder1 = this.nextInt() / this.m;
	return start + Math.floor(randomUnder1 * rangeSize);
};
RNG.prototype.choice = function(array) {
	return array[this.nextRange(0, array.length)];
};

//Seed
var firstName = 'Bojo';
var dateBirth = Date.parse('December 15, 1980');
var currentDate = new Date();

//get the number for the day
var today = currentDate.getDate() + currentDate.getMonth() + 1 + currentDate.getFullYear();

var letterToNumber = (str) => {
	str = str.toLowerCase();
	var sum = 0;
	for (let i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i);
	}
	return sum;
};

//lucky number changes every day
var rng = new RNG(letterToNumber(firstName) + dateBirth + today);

//Need work not working , unique numbers
var a = 0;
var myArray = [];
for (let i = 0; i < 6; i++) {
	let a = rng.nextRange(1, 51);
	myArray.push(a);
	for (let x = 0; x < myArray.length; x++) {
		if (myArray[x] === a) {
			myArray.splice(x, 1, rng.nextRange(1, 51));
		}
	}
}

console.log(myArray);

for (let i = 0; i < 6; i++) {
	var item = document.createElement('li');
	item.classList.add('item');
	const container = document.querySelector('#container');
	container.appendChild(item);
	item.textContent = rng.nextRange(1, 51);
}
