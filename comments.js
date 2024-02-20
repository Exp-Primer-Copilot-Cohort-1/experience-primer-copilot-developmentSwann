// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.status(201).end();
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
```
The code above is a simple web server that listens for GET and POST requests to the /comments path. When a GET request is made, the server reads the comments.json file and sends the contents as a JSON response. When a POST request is made, the server reads the comments.json file, appends the new comment to the array, and writes the updated array back to the file.

The server is created using the Express framework, which makes it easy to define routes and handle requests. The bodyParser middleware is used to parse the request body, so that the server can read the data sent in the POST request.

To run the server, save the code in a file named comments.js and run it using Node.js:

```bash
node comments.js
```

This will start the server on port 3000. You can then use a tool like cURL or Postman to make GET
