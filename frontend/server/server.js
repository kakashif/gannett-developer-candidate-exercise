// Required Modules
const express    = require("express");
const morgan     = require("morgan");
const https      = require('https');
const request    = require('request');
const cors       = require('cors');
const app        = express();


const port = process.env.PORT || 3002;

app.use(morgan("dev"));
app.use(cors());
app.use(express.static("./"));
const router = module.exports = new express.Router();

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
app.use(express.static("../public"));
app.get("/", (req, res,next) => {
 res.redirect("/");
});

app.get("/profile", (req, res, next) => {
  request('https://peaceful-springs-7920.herokuapp.com/profile/', function (error, response, body) {
     console.log('error:', error);
     console.log('statusCode:', response && response.statusCode);
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.setHeader('content-type', 'application/json');
     res.send(body);
   });
});

app.get("/content/:profileId", (req, res, next) => {
  const profileId = req.params.profileId
  request('https://peaceful-springs-7920.herokuapp.com/content/' + profileId, function (error, response, body) {
     console.log('error:', error);
     console.log('statusCode:', response && response.statusCode);
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.setHeader('content-type', 'application/json');
     res.json(body);
   });
});
