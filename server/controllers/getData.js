'use strict';
var storage = [];
var generate = function(subReddit){
    var http = require('http');
    var options = {
        host: 'www.reddit.com',
        path: '/r/'+subReddit+'/about.json'
    };
    var request = http.get(options, function(res){
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        var dataChunks = '';
        //res.setEncoding('utf8')
        res.on('data', function(chunk){
            dataChunks += chunk;
        }).on('end', function(){
/*            var body = Buffer.concat(dataChunks);*/
            //console.log("this is the body", JSON.parse(dataChunks));
            storage.push(JSON.parse(dataChunks));
        })
    });
}
setTimeout(function(){generate('worldnews')}, 10);