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
                var comment = comments.filter(function (comment) {
                    return comment.id == id;
                });
            });
        }
    }
}).listen(3000);