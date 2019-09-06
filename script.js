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
let input1 = document.getElementById('birthDate');
var dateBirth = Date.parse(input1.value);
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

//lucky numbers change every day
var rng = new RNG(letterToNumber(firstName) + dateBirth + today);

var myArray = [];

let randomNumber = rng.nextRange(1, 51);
/*
myArray.push(randomNumber);
myArray.forEach(function(element) {
	let counter;
	if (myArray.indexOf(randomNumber) === -1 && counter < 5) {
		myArray.push(randomNumber);
		counter++;
	}
});
*/

let i = 0;
while (i < 10) {
	if (myArray.indexOf(randomNumber) === -1) {
		myArray.push(randomNumber);
		randomNumber = rng.nextRange(1, 51);
		i++;
	} else {
		console.log('nuc' + randomNumber);
		randomNumber = rng.nextRange(1, 51);
	}
}

//testing that
var numbersUnique = Array.from(new Set(myArray));

const generateNumbers = () => {
	for (let i = 0; i < myArray.length; i++) {
		var item = document.createElement('li');
		item.classList.add('item');
		const container = document.querySelector('#container');
		container.appendChild(item);
		item.textContent = myArray[i];
		//item.textContent = rng.nextRange(1, 51);
		//item.textContent = numbersUnique[i];
	}
};

let generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', () => {
	generateNumbers();
});
