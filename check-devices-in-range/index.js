let exec = require('child_process').exec;
var request = require("request");

console.time('nmap -sn');
let c1 = exec('nmap -sn 192.168.1.0/24', parseResult);

//DEBUG
let repl = require('repl');

function parseResult(err, stdout) {
    if (err) throw err;

    console.timeEnd('nmap -sn');

    let result = require(`${__dirname}/parse-report`)(stdout.toString());

    // repl.start('>').context.result = result;
    // console.log(result.devices[0]);
    updateDb(result.devices);
}


function updateDb(result) {
    var options = {
        method: 'POST',
        url: 'http://localhost:8000/device/update',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        formData: {
            data: JSON.stringify(result)
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}