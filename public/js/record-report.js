//inject to debug
window.records = records;
//        let cRecords = records.map(record => {
//            record.created_at = new Date(record.created_at);
//
//            return record;
//        });
//        console.log(cRecords);



var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
	count: 0
};

let recordReportMap = [];

for(let j = 1; j <= numDayInMonth; j += 1){
	let date = new Date(year, month, j);
	for(let i = START_RECORD_TIME*60; i <= END_RECORD_TIME*60; i += 5 ){
		let currentSecond = Math.floor(date.getTime()/1000 + i*60);

		let record = Object.assign({}, recordReportSample);
		record['created_at'] = currentSecond;
		recordReportMap.push(record);
	}
}

// let recordTmp = {};
//
// records.forEach(record => {
// 	let date = new Date(record.created_at * 1000);
// 	let minute = date.getHours() * 60 + date.getMinutes();
// 	let recordPerDay = (END_RECORD_TIME*60 - START_RECORD_TIME*60) / 5 + 1;
// 	let order = (date.getDate() - 1) * recordPerDay + Math.floor((minute - START_RECORD_TIME*60) / 5);
//
// 	record.count = 1;
//
// 	recordTmp[order] = record;
// });
//
// console.log(recordTmp);
//
// recordReportMap.forEach((record, index) => {
// 	if(recordTmp[index])
// 		recordReportMap[index] = recordTmp[index];
// });
records.forEach(record=>{
	record.count = 1;
	recordReportMap.push(record);
});

console.log(recordReportMap[6327]);
	console.log(recordReportMap);

// console.log(recordReportMap);

// let dayReportSample =
//
// let recordReportMap = new Array(numDayInMonth);


let monthlyReportChart = dc.heatMap('#monthlyReportChart');

let ndx = crossfilter(recordReportMap);
window.ndx = ndx;

let fiveMinuteOfDate = ndx.dimension(d => {
	let date = Math.floor(d.created_at / (86400));
	let dateObj = new Date(d.created_at * 1000);
	let minute = dateObj.getHours() * 60 + dateObj.getMinutes();
	let fiveMinute = Math.floor(minute / 5);
	return [fiveMinute, date];
});

let countDevices = fiveMinuteOfDate.group().reduceSum(function(d){
	return d.count;
});

console.log(countDevices.top(10));

let countDeviceRange = [1, 5];

let startColor = '#cbb956';
let endColor = '#bf5329';

let heatColorMapping = function(d){
	// console.log(d);
	if(d > countDeviceRange[1])
		return endColor;
	if(d <= 0)
		return "white";
	// console.log(d3.scale.linear().domain(countDeviceRange).range([startColor, endColor])(d));
	return d3.scale.linear().domain(countDeviceRange).range([startColor, endColor])(d);
};

heatColorMapping.domain = function(){
	return countDeviceRange;
};

let width = 713;
let height = 200;

width = 960;
height = 500;

monthlyReportChart
	.width(width)
	.height(height)
	.xBorderRadius(0)
	.yBorderRadius(0)
	.dimension(fiveMinuteOfDate)
	.group(countDevices)
	//                          .xUnits(dc.units.ordinal)
	//                          .x(d3.scale.linear().domain([0, 1000]))
	.keyAccessor(function(d){
		return d.key[1];
	})
	.valueAccessor(function(d){
//                              console.log(d);
		return d.key[0];
	})
	.colorAccessor(function(d){
		return +d.value;
	})
	.title(function(d){
		// console.log(date);
		// let actualDate = new Date(date.getTime() + d.key[0]*60*1000);
		// console.log(actualDate)
		// var dateTitle = date.getFullYear() + '-' + monthNames[date.getMonth()] + '-' + date.getDate();
		return " Σ Devices: " + d.value;
	})
	//                          .colors(d3.scale.linear()
	//                                    .domain([1, 0])
	//                                    .range(['white', '#8CC665']))
	.colors(heatColorMapping)
	.calculateColorDomain()
	// .mouseZoomable(true)
	// .zoomScale([extent])
;

monthlyReportChart.colsLabel(function(d){//d = 16782
	var timestamp = d * (86400); // d * (24 * 60 * 60);
	var date = new Date(timestamp * 1000);
//                    return date.getFullYear() + '-' + monthNames[date.getMonth()] + '-' + date.getDate();
	return monthNames[date.getMonth()] + '-' + date.getDate();
});

monthlyReportChart.rowsLabel(function(d){//d = 16782
	let colLabel = '';
	if(d % 12 == 0)
		colLabel = d/12 + 'h';
	return colLabel;
});

monthlyReportChart.colsLabel(function(d){//d = 16782
	let date = new Date(d * 86400 * 1000);
	return date.getDate();
});

dc.renderAll();

// ndx can add [record, record, record];
// update record through web socket ᕕ( ᐛ )ᕗ
// ndx.add([r1, r2, r3,...]);
// dc.renderAll();
//handle graph by crossfilter & d3