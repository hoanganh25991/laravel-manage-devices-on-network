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
	id: null,
	device_id: null
};

let recordReportMap = [];

for(let j = 1; j <= numDayInMonth - 10; j += 1){
	let date = new Date(year, month, j);
	for(let i = START_RECORD_TIME*60; i <= END_RECORD_TIME*60; i += 5 ){
		let currentSecond = Math.floor(date.getTime()/1000 + i*60);

		let record = Object.assign({}, recordReportSample);
		record['created_at'] = currentSecond;
		recordReportMap.push(record);
	}
}

// console.log(recordReportMap[6327]);
// console.log(recordReportMap);
// recordsX = records.forEach(record => {
// 	delete record.device;
// });
// recordReportMap = recordReportMap.concat(records);

// records.forEach(record => {
// 	delete record.user_id;
// 	delete record.device;
// 	record.id = null;
// 	recordReportMap.push(record);
// });

console.log(recordReportMap);

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

console.log('five minute date', fiveMinuteOfDate);

// let pSample = {count: 0};

let countDevices = fiveMinuteOfDate.group().reduce(
	//add
	function (p, v){
		if(v.user_id){
			if(p.userIds.indexOf(v.user_id) == -1)
				count++;

			p.userIds.push(v.user_id);
		}

		return p;
	},
	//remove
	function (p, v){
		if(v.user_id){
			let index = p.userIds.indexOf(v.user_id);
			//find out, remove one here ONLY
			//means that one device is OFF
			if(index != -1)
				p.userIds.splice(index, 1);

			//again check out, if NO v.user_id exist
			//means he TRULY OFF
			//no device is available
			//count--
			if(p.userIds.indexOf(v.user_id) == -1)
				count--;
		}

		return p;
	},
	//init
	function (){
		return {
			userIds: [],
			count: 0
		};
	}
	// function (p){console.log('kk,v', p); return p+1;},
	// function (p){return p-1;},
	// function (){return 0;}
	//
	// function (kk){console.log('kk,v', kk); return kk.count+1;},
	// function (kk){return kk.count-1;},
	// function (){return {count: 0};}

	// function (p){console.log('kk,v', p); return p.count+1;},
	// function (p){return p.count-1;},
	// function (){return pSample;}
);

//CAN NOT FILTER ON countDevice
//because HE ONLY THE FUNCTION STORED
//how to deal with other, not an real array

// countDevices.filter(row => {
// 	let tmp = row.values;
// 	//go through custom reduct, what we get on values
// 	//IS OBJECT {userIds: [], count: 0}
// 	//let values for heatmap draw
// 	row.values = tmp.count;
// 	row.tmp = tmp;
// 	return row;
// });

console.log(countDevices.top(10));

let countDeviceRange = [0, 1];

let heatColorMapping = function(d){
	// return d3.scale.linear().domain(countDeviceRange).range(["#F5F8FA", '#8CC665'])(d);
	return d3.scale.linear().domain(countDeviceRange).range(["white", '#8CC665'])(d);
};

heatColorMapping.domain = function(){
	return countDeviceRange;
};

monthlyReportChart
	.width(960)
	.height(544)
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
		console.log(d.value);
		return +d.value.count;
	})
	.title(function(d){
		let date = new Date(d.key[1] * (86400) * 1000);
		// console.log(date);
		// let actualDate = new Date(date.getTime() + d.key[0]*60*1000);
		// console.log(actualDate)
		// var dateTitle = date.getFullYear() + '-' + monthNames[date.getMonth()] + '-' + date.getDate();
		var dateTitle = date.toString();
		return " Date:   " + dateTitle + "\n" +
			"  Σ Devices:   " + d.value;
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