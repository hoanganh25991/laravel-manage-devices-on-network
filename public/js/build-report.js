//try on minute
const START_RECORD_TIME = 6; //6h
const END_RECORD_TIME = 23; //23h

//build whole map for month, from 1->30
let today = new Date();
let year = today.getFullYear(), month = today.getMonth();

let firstDayOfMonth = new Date(year, month, 1);
let lastDayOfMonth  = new Date(year, month + 1, 0);
let numDayInMonth   = lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1;

let recordReportSample = {
	name: null,
	mac: null,
	ip: null,
	manufacturer: null,
	count: 1
};

let recordReportMap = [];

for(let j = 1; j <= numDayInMonth; j += 1){
	for(let i = START_RECORD_TIME*60; i <= END_RECORD_TIME*60; i += 5 ){
		recordReportMap.push(recordReportSample);
	}
}

console.log(recordReportMap);