
var fs = require('fs');
var formidable = require('formidable');


// Create methods for handling requests
exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę rządania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}


exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :( ");
    response.end();
}