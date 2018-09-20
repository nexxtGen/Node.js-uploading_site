var http = require ('http');
var colors = require('colors');
var handlers = require('./handlers'); // Import modułu

function start() {
    function onRequest(request, response) {
        console.log("Request was received.");
        console.log("Request: " + request.url + " recived.".blue);

        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

        switch (request.url) { //rozr i obsł zapytania
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/css/start.css':
				handlers.startStyle(request, response);
				break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
            case '/css/show.css':
                handlers.showStyle(request, response);
                break;
            default:
                handlers.error(request, response);
        }

    }
    http.createServer(onRequest).listen(9000);
    
    console.log("The Server is running... \nCheck: http://localhost:9000/ in your browser. ".green);
}

exports.start = start;
