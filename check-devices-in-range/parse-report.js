// let fs = require('fs');

// fs.readFile('nmap.log', parse);

// function parse(err, stdout){
// 	if (err) throw err;
// 	let os = require('os');
// 	// console.log(stdout.toString());
// 	report = stdout.toString();
// 	let arr = report.split(os.EOL);
// 	// console.log(arr[0]); //title
// 	let result = {};
// 	result.title = arr[0];

// 	let devices = [];

// 	// console.log(arr[0]);
// 	arr.shift();

// 	arr.forEach((val, index)=>{
// 		let i = Math.floor(index/3);
// 		let pos = index % 3;
// 		//create new device
// 		if(pos == 0)
// 			devices.push({});

// 		let device = devices[i];
// 		if(pos == 0)
// 			device.ip = val.replace('Nmap scan report for ', '');

// 		if(pos == 2){
// 			let arr = val.replace('MAC Address: ', '').split(' ');
// 			device.mac = arr[0];
// 			device.manufacturer = arr[1].replace('(', '').replace(')', '');
// 		}

// 	});

// 	//the last point is info of the computer run scan
// 	devices.pop();

// 	result.devices = devices;

// 	// console.log(devices);
// 	// console.log(result);
// 	return result;
// }

module.exports = function parse(stdout){
	let os = require('os');
	let arr = stdout.split(os.EOL);
	arr.shift();
	// console.log(arr[0]); //title
	let result = {};
	result.title = arr[0];

	let devices = [];

	// console.log(arr[0]);
	arr.shift();

	arr.forEach((val, index)=>{
		let i = Math.floor(index/3);
		let pos = index % 3;
		//create new device
		if(pos == 0)
			devices.push({});

		let device = devices[i];
		if(pos == 0)
			device.ip = val.replace('Nmap scan report for ', '');

		if(pos == 2){
			let arr = val.replace('MAC Address: ', '').split(' ');
			device.mac = arr[0];
			device.manufacturer = arr[1].replace('(', '').replace(')', '');
		}

	});

	//the last point is info of the computer run scan
	devices.pop();
	devices.pop();

	result.devices = devices;

	// console.log(devices);
	// console.log(result);
	return result;
}