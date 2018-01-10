let express, app, port, mongoose, Milonga, Tango, bodyParser, cors;
cors = require('cors');
express = require('express');
app = express();
port = process.env.PORT || 3434;
mongoose = require('mongoose');
Milonga = require('./api/models/milongaModel');
Tango = require('./api/models/tangoModel');
bodyParser = require('body-parser');
require('./common/checkExistingFiles'); //execute the file checking every x seconds


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/djtangodb');


let corOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials:true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corOption));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Add headers


let milongaRoutes = require('./api/routes/milongaRoutes'); //importing route
let tangoRoutes = require('./api/routes/tangoRoutes');
milongaRoutes(app); //register the route
tangoRoutes(app);//register tango route


app.listen(port);

console.log('CORS-enabled | dj-tango RESTful API server listening on port ' + port);



// app.use(function (req, res, next) {
//
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//
//   // Pass to next layer of middleware
//   next();
// });
/*app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/








