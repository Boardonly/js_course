'use strict';

(function() {
	function generateList(numOfNum, numbersParent) {
		const items = [];

		for (let i = 0; i < numOfNum; i += 1) {
			const item = document.createElement('span');

			item.innerText = i + 1;

			numbersParent.appendChild(item);
			items.push(item);

			if (i < numOfNum - 1) {
				const coma = document.createElement('span');
				coma.innerText = ', ';
				numbersParent.appendChild(coma);
			}
		}

		return items;
	}

	const numOfNum = 10;
	const numbersParent = document.getElementById('numbers');
	const startBtn = document.getElementById('start');
	const pauseBtn = document.getElementById('pause');
	const stopBtn = document.getElementById('stop');
	const x1Btn = document.getElementById('1x');
	const x2Btn = document.getElementById('2x');
	const x3Btn = document.getElementById('3x');
	const count = document.getElementById('count');
	const items = generateList(numOfNum, numbersParent);
	let mms = 1000;
	let id;
	let seconds = 0;

	pauseBtn.disabled = true;
	stopBtn.disabled = true;

	startBtn.addEventListener('click', () => {
		startBtn.disabled = true;
		x1Btn.disabled = true;
		pauseBtn.disabled = false;
		stopBtn.disabled = false;

		id = setInterval(() => {
			const index = seconds % (numOfNum * 2);
			if (index < numOfNum) {
				items[index].style.background = 'green';
			} else if (items[numOfNum * 2 - index - 1]) {
				items[numOfNum * 2 - index - 1].style.background = 'black';
			}

			count.innerText = `${++seconds} seconds`;
		}, mms);
	});

	pauseBtn.addEventListener('click', () => {
		startBtn.disabled = false;
		pauseBtn.disabled = true;
		clearInterval(id);
	});

	stopBtn.addEventListener('click', () => {
		startBtn.disabled = false;
		pauseBtn.disabled = true;
		stopBtn.disabled = true;
		clearInterval(id);
		seconds = 0;
		count.innerText = '0 seconds';
	});

	
	x1Btn.addEventListener('click', () => {
			x1Btn.disabled = true;
			x2Btn.disabled = false;
			x3Btn.disabled = false;
			mms = 1000;
			clearInterval(id);
			speed ();
	});
	x2Btn.addEventListener('click', () => {
			x1Btn.disabled = false;
			x2Btn.disabled = true;
			x3Btn.disabled = false;
			mms = 1000/2;
			clearInterval(id);
			speed ();
	});
	x3Btn.addEventListener('click', () => {
			x1Btn.disabled = false;
			x2Btn.disabled = false;
			x3Btn.disabled = true;
			mms = 1000/3;
			clearInterval(id);
			speed ();
			
	});
	function speed () {
		id = setInterval(() => {
			const index = seconds % (numOfNum * 2);
			if (index < numOfNum) {
				items[index].style.background = 'green';
			} else if (items[numOfNum * 2 - index - 1]) {
				items[numOfNum * 2 - index - 1].style.background = 'black';
			}

			count.innerText = `${++seconds} seconds`;
		}, mms);
	};
}())