(function () {

	var lotteryNumbers = [];
	var lotteryRangeFrom = 1;
	var lotteryRangeTo = 49;
	const standardLength = 6;

	document.getElementById('but-set-range').addEventListener('click', setUserDefinedRange);
	document.getElementById('but-start').addEventListener('click', createLotteryNumbers);

	function setUserDefinedRange() {
		lotteryRangeFrom = parseInt(document.getElementById('inp-range-from').value);
		lotteryRangeTo = parseInt(document.getElementById('inp-range-to').value);
	}

	function createLotteryNumbers() {
		generateLotteryNumbers()
		sortLotteryNumbers()
		addToDOM();
		lotteryNumbers = [];
	}

	function generateLotteryNumbers() {
		for (let i = 0; i < standardLength; i++) {
			lotteryNumbers.push(addUniqueNumber());
		}
	}

	function addUniqueNumber() {
		var tempNum = generateRandomNumber();
		if (lotteryNumbers.includes(tempNum)) {
			return addUniqueNumber();
		} else{
			return tempNum;
		}
	}

	function generateRandomNumber() {
		return Math.floor(Math.random() * (lotteryRangeTo - lotteryRangeFrom + 1)) + lotteryRangeFrom;
	}

	function sortLotteryNumbers() {
		lotteryNumbers.sort((first, second) => {
			return first - second;
		});
	}

	function addToDOM() {
		let table = document.getElementById('tb-current-numbers');
		let hasBody = table.childNodes.length != 0;
		let length = hasBody? table.childNodes[0].childNodes.length: 0;
		if (hasBody && length === 3) {
			table.childNodes[0].childNodes[length - 1].remove();
		}
		let row = table.insertRow(hasBody && table.childNodes[0]);
		lotteryNumbers.forEach((num) => {
			let cell = row.insertCell();
			cell.innerHTML = num;
		});
	}

})();