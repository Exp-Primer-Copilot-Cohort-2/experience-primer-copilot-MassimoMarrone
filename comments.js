//create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const port = 3000;
const commentsPath = './comments.json';

const server = http.createServer((req, res) => {
    //parse the url
    const parsedUrl = url.parse(req.url, true);
    //get the path name
    const pathname = parsedUrl.pathname;
    //get the method
    const method = req.method;
    //get the query
    const query = parsedUrl.query;
    //get the comment
    const comment = query.comment;

    //get the comments
    if (pathname === '/comments' && method === 'GET') {
        fs.readFile(commentsPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    }
    //add a comment
    else if (pathname === '/comments' && method === 'POST') {
        fs.readFile(commentsPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
                let comments;
                if (data.length === 0) {
                    comments = [];
                } else {
                    comments = JSON.parse(data);
                }
                comments.push(comment);
                fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Internal Server Error' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Comment added' }));
                    }
                });
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//create comments.json file
fs.writeFile