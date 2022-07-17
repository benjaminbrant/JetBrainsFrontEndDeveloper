function count() {
	console.log("Now I will prove to you that I can count to any number you want.");

	let number = Number(input());
	let current = 0;

	while (current <= number) {
		console.log(current + " !");
		current += 1;
	}
}

function test() {
	console.log("Let's test your programming knowledge.");

	let answer = 3;
	let success = false;

	console.log("What colour is the sky?");
	console.log("1. Green");
	console.log("2. Purple");
	console.log("3. Blue");
	console.log("4. Red");

	while (success === false) {
		let response = input();
		if (+response !== 3) {
			console.log("Please, try again.");
		} else {
			end();
			console.log("Congratulations, have a nice day!");
			success = true;
		}
	}
}

function end() {
	console.log("Completed, have a nice day!");
}


greet('Aid', '2020')  // change it as you need
remind_name();
guess_age();
count();
test();