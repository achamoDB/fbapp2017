const root = ".";

var my_http = require("http"),
	path = require("path"),
	url = require("url"),
	filesys = require("fs");

function load_file(my_path,response){
  my_path = my_path == "/" ? "/index.html" : my_path;
  var full_path = path.join(root,my_path);
  console.log("full_path=", full_path);
  filesys.exists(full_path,function(exists){
    if(!exists){
      response.writeHeader(404, {"Content-Type": "text/plain"});  
      response.write("404 Not Found\n");  
      response.end();
    }
    else{
      filesys.readFile(full_path, "binary", function(err, file) {  
           if(err) {  
               response.writeHeader(500, {"Content-Type": "text/plain"});  
               response.write(err + "\n");  
               response.end();  
          
           }  
         else{
	  var contentType = "text/plain";
	  if (full_path.match(/\.css^/)) contentType = "text/css"; 
	  else if (full_path.match(/\.js^/)) contentType = "text/javascript"; 
          response.writeHeader(200, {"Content-Type": contentType});  
              response.write(file, "binary");  
              response.end();
        }
            
      });
    }
  });
};

function call_service(my_path, response) {
	console.log("service: " + my_path);
}

var port = process.env.PORT || 5000;

my_http.createServer(function(request,response){
	var my_path = url.parse(request.url).pathname;
	if (my_path.match(/^\/services\//))
		call_service(my_path,response);
	else
		load_file(my_path,response);
}).listen(port);

console.log("Server Running on " + port);     
