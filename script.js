const playNow = document.getElementById('playNow');
const playNowLink = document.getElementById('playNowLink');
const firstName = document.getElementById('firstName');
const input2 = document.getElementById('birthDate');
var valid = false;
//RNG
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
	let dateBirth = Date.parse(input2.value);

	let currentDate = new Date();

	//get the number for the day from the date
	let todayNumber = currentDate.getDate() + currentDate.getMonth() + 1 + currentDate.getFullYear();

	const letterToNumber = (str) => {
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

	//prevents default
	if (firstName.value !== '' && input2.value !== '') {
		//Display the results
		for (let i = 0; i < myArray.length; i++) {
			let item = document.createElement('li');
			item.classList.add('item');
			const container = document.getElementById('container');
			container.appendChild(item);
			item.textContent = myArray[i];
			item.style.fontSize = '5px';
			if (amount <= 2) {
				item.classList.add('luckyStars');
			}
		}
		//valid entry
		valid = true;
	}
};

//set max date to today
const maxDateToday = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	let yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	today = yyyy + '-' + mm + '-' + dd;
	document.getElementById('birthDate').setAttribute('max', today);
};

//clear all inputs
let clearButton = document.getElementById('clearInput');
clearButton.addEventListener('click', () => {

	firstName.value = '';
	document.getElementById('birthDate').value = '';
});

maxDateToday();

//Lotto Button
let LButton = document.getElementById('LButton');
LButton.addEventListener('click', () => {
	clearNumbers();

	generateNumbers(6, 60);

	playNow.style.visibility = 'hidden';
	playNowLink.textContent = '';
	validation('https://www.national-lottery.co.uk/games/lotto?icid=-:mm:-:mdg:lo:dbg:pl:co');
});

//EURO MIL button
let EMButton = document.getElementById('EMButton');
EMButton.addEventListener('click', () => {
	clearNumbers();

	generateNumbers(5, 51);
	generateNumbers(2, 13);

	playNow.style.visibility = 'hidden';
	playNowLink.textContent = '';

	validation('https://www.national-lottery.co.uk/games/euromillions?icid=-:mm:-:mdg:em:dbg:pl:co');
});

//Set fo life button
let SFLButton = document.getElementById('SFLButton');
SFLButton.addEventListener('click', () => {
	clearNumbers();

	generateNumbers(5, 49);
	generateNumbers(1, 11);

	playNow.style.visibility = 'hidden';
	playNowLink.textContent = '';

	validation('https://www.national-lottery.co.uk/games/set-for-life?icid=-:mm:-:mdg:sfl:dbg:pl:co');
});

//Thunder Ball button
let TBButton = document.getElementById('TBButton');
TBButton.addEventListener('click', () => {
	clearNumbers();

	generateNumbers(5, 40);
	generateNumbers(1, 15);

	playNow.style.visibility = 'hidden';
	playNowLink.textContent = '';

	validation('https://www.national-lottery.co.uk/games/thunderball?icid=-:mm:-:mdg:tb:dbg:pl:co');
});

//Clear numbers
const clearNumbers = () => {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

//check if the inputs are filled
const validation = (link) => {
	//display link button only if there are numbers on display
	if (valid) {
		firstName.classList.remove('blink');
		input2.classList.remove('blink');
		setTimeout(function () {
			playNow.style.visibility = 'visible';
			playNowLink.href = link;
			playNowLink.textContent = 'Play';
		}, 2000);
		//highlight unfilled inputs
	} else {
		if (firstName.value === '') {
			firstName.classList.add('blink');
		} else {
			firstName.classList.remove('blink');
		}
		if (input2.value === '') {
			input2.classList.add('blink');
		} else {
			input2.classList.remove('blink');
		}

	}
}
