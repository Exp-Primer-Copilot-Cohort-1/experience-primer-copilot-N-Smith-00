// create web server
// run: node comments.js
// test: curl -i http://localhost:8080/comments
// test: curl -i http://localhost:8080/comments/1
// test: curl -i -X POST -H 'Content-Type: application/json' -d '{"author": "John Smith", "text": "This is a comment"}' http://localhost:8080/comments
// test: curl -i -X PUT -H 'Content-Type: application/json' -d '{"author": "John Smith", "text": "This is a comment"}' http://localhost:8080/comments/1
// test: curl -i -X DELETE http://localhost:8080/comments/1
// test: curl -i -X DELETE http://localhost:8080/comments/2

// load modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// global variables
var DATA_FILE = 'comments.json';

// create web server
http.createServer(function (req, res) {
    // set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // parse url
    var url_parts = url.parse(req.url, true);

    // handle GET
    if (req.method == 'GET') {
        // handle GET /comments
        if (url_parts.pathname == '/comments') {
            // read comments from file
            fs.readFile(DATA_FILE, function (err, data) {
                // handle error
                if (err) {
                    console.error(err);
                    process.exit(1);
                }

                // send comments
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            });
        }
        // handle GET /comments/:id
        else if (url_parts.pathname.match(/^\/comments\/(\d+)$/)) {
            // get comment id
            var id = url_parts.pathname.replace(/^\/comments\/(\d+)$/, '$1');

            // read comments from file
            fs.readFile(DATA_FILE, function (err, data) {
                // handle error
                if (err) {
                    console.error(err);
                    process.exit(1);
                }

                // get comments
                var comments = JSON.parse(data);

                // find comment