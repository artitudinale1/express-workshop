var express = require('express');
var app = express(); // inizialise server
var bodyParser = require('body-parser');
var fs = require('fs');
/*
app.get('/', function(req, res){
	console.log(req);
	res.send('Hello Node!')
});

app.get("/chocolate", function (req, res) {
    res.send("Mm chocolate :O");
});
*/
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-post', function (req, res) {
		fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		    // do something
		    //console.log(file);
		    var parsedFile = JSON.parse(file); //that parse the file into json
		    console.log(req.body.blogpost)
		    console.log(req.params.postId)
		    parsedFile[Date.now()] = req.body.blogpost;
		    
		   	
		   	fs.writeFile('data/posts.json',JSON.stringify(parsedFile), function (error) {
		    // do something
		    	 res.redirect('/');
			});
	});
});

app.get('/get-posts', function (req, res) {
	 res.sendFile(__dirname + '/data/posts.json') //that 's read file and parse to JSON
});

app.get('posts/:postId', function (req, res) {
	console.log(req.params.postId)
    res.send('post id: ', req.params.postId);
});


app.listen(3000, function(){
	console.log('server is ranning at 3000!')
});

