const express = require('express');
require('./db/config');
const User = require('./db/users');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

//register api is here 

app.post("/register", async (req, resp) => {
      let user = new User(req.body);
      let result = await user.save();
      resp.send(result)

});

//login api is here
app.post("/Login", async (req, resp) => {


      if (req.body.email && req.body.password) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                  resp.send(user)
            } else {
                  resp.send({ result: 'No user found here' })
            }
      } else {
            resp.send({ result: 'either email or password is missing' })
      }


})

const http = require("http");
var fs = require('fs');

// app.listen(5000)


const host = '0.0.0.0';
const port = 8080;


const requestListener = function (req, res) {

  fs.readFile('/cloudclusters/mern/demo.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
};





const server = http.createServer(requestListener);
server.listen(port, host, () => {

    console.log(`Server is running on http://${host}:${port}`);
});
