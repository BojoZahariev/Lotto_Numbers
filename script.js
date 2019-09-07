class RNG {
	constructor(seed) {
		// LCG using GCC's constants
		this.m = 0x80000000; // 2**31;
		this.a = 1103515245;
		this.c = 12345;
		this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
	}
	nextInt() {
		this.state = (this.a * this.state + this.c) % this.m;
		return this.state;
	}
	nextFloat() {
		// returns in range [0,1]
		return this.nextInt() / (this.m - 1);
	}
	nextRange(start, end) {
		// returns in range (start, end): including start, excluding end
		// can't modulu nextInt because of weak randomness in lower bits
		let rangeSize = end - start;
		let randomUnder1 = this.nextInt() / this.m;
		return start + Math.floor(randomUnder1 * rangeSize);
	}
	choice(array) {
		return array[this.nextRange(0, array.length)];
	}
}



//Seed
const generateNumbers = (amount, range) => {
	const firstName = document.getElementById('firstName');
	const input2 = document.getElementById('birthDate');
	let dateBirth = Date.parse(input2.value);

	let currentDate = new Date();

	//get the number for the day from the date
	let todayNumber = currentDate.getDate() + currentDate.getMonth() + 1 + currentDate.getFullYear();
	console.log(todayNumber);

	const letterToNumber = (str) => {
		if (str === '') {
			str = 'BOJO'
		}
		str = str.toLowerCase();
		let sum = 0;
		for (let i = 0; i < str.length; i++) {
			sum += str.charCodeAt(i);
		}
		return sum;
	};

	//lucky numbers change every day
	let rngSeed = new RNG(letterToNumber(firstName.value) + Math.abs(dateBirth) + todayNumber);

	//Numbers storage
	const myArray = [];

	let randomNumber = rngSeed.nextRange(1, range);

	//Only unique numbers
	let i = 0;
	while (i < amount) {
		if (myArray.indexOf(randomNumber) === -1) {
			myArray.push(randomNumber);
			randomNumber = rngSeed.nextRange(1, range);
			i++;
		} else {
			randomNumber = rngSeed.nextRange(1, range);
		}
	}

	//Display the results
	for (let i = 0; i < myArray.length; i++) {
		let item = document.createElement('li');
		item.classList.add('item');
		const container = document.getElementById('container');
		container.appendChild(item);
		item.textContent = myArray[i];
	}


};

//set max date to today
const maxDateToday = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	let yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}

	today = yyyy + '-' + mm + '-' + dd;
	document.getElementById('birthDate').setAttribute("max", today);
}


//Display numbers button
let displayButton = document.getElementById('displayButton');
displayButton.addEventListener('click', () => {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	generateNumbers(6, 51);
});


//clear all
let clearButton = document.getElementById('clearInput');
clearButton.addEventListener('click', () => {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}

	firstName.value = '';
	document.getElementById('birthDate').value = '';
});

maxDateToday();
