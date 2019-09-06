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

const generateNumbers = () => {
	//Seed
	let firstName = 'Bojo';
	let input1 = document.getElementById('birthDate');
	let dateBirth = Date.parse(input1.value);
	let currentDate = new Date();

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
	var rngSeed = new RNG(letterToNumber(firstName) + dateBirth + today);

	var myArray = [];

	let randomNumber = rngSeed.nextRange(1, 51);

	let i = 0;
	while (i < 6) {
		if (myArray.indexOf(randomNumber) === -1) {
			myArray.push(randomNumber);
			randomNumber = rngSeed.nextRange(1, 51);
			i++;
		} else {
			console.log('nuc' + randomNumber);
			randomNumber = rngSeed.nextRange(1, 51);
		}
	}

	for (let i = 0; i < myArray.length; i++) {
		var item = document.createElement('li');
		item.classList.add('item');
		const container = document.getElementById('container');
		container.appendChild(item);
		item.textContent = myArray[i];
	}

	return container;
};

let displayButton = document.getElementById('displayButton');
displayButton.addEventListener('click', () => {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	generateNumbers();
});
