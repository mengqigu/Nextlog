// A reader for nextcloud log file

var fs = require('fs'),
    readline = require('readline');

var fileName = process.argv[2];

var rd = readline.createInterface({
    input: fs.createReadStream(fileName),
    // output: process.stdout,
    console: false
});

var i = 0;
rd.on('line', function(line) {
    var output = JSON.parse(line);
    console.log("\x1b[32m", "=======================================Log entry #"
        + i + "====================================");
    console.log("\x1b[0m","");
    for (var key in output) {
        if (key != "message") {
            console.log(key + ": " + output[key]);
        } else {
            var msg = output["message"];
            console.log("\x1b[1m","");      // Start highlighting
            if (msg.startsWith("Exception: ")) {
                scan(JSON.parse(msg.substr(10)),"");
            } else {
                console.log("message: " + msg);
            }
            console.log("\x1b[0m","");      // End highlighting
        }
    }

    i ++;
});

function scan(obj, currK)
{
    var k;
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
                scan( obj[k], k);
            }
        }
    } else {
        console.log(currK + ": " + obj);
    };

};
