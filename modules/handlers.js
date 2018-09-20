
var fs = require('fs');
var colors = require('colors');
var formidable = require('formidable');
var fileName = '';

// Create methods for handling requests
exports.welcome = function(request, response) {
    console.log("Start welcome request".green);
    fs.readFile('./templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.startStyle = function(request, response) {
    console.log('Loading style for start.html'.yellow);
       
	fs.readFile('./css/start.css', (err, css) => {
		response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
		response.write(css);
		response.end();
	});
}

exports.upload = function(request, response) {
    console.log("Start upload request.".gray);

    var form = new formidable.IncomingForm(); 
    form.uploadDir = "./";   
    
    form.parse(request, function(err, fields, files) { 
        fileName = files.upload.name;       
        fs.rename(files.upload.path, `${fileName}`, function() {
            fs.readFile('./templates/show.html', (err, html) => {
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});	
                response.write(html);
                response.end();
            });            
        });        
    });
}
exports.showStyle = function(request, response) {
    console.log('Loading style for show.html'.yellow);
       
	fs.readFile('./css/show.css', (err, css) => {
		response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
		response.write(css);
		response.end();
	});
}

exports.show = function(request, response) {
    fs.readFile(`${fileName}`, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("I do not know what to do.".red);
    response.write("404 :( ");
    response.end();
}

