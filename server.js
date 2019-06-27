require('./models/db');

const express = require('express');
const path = require('path');
const exphtml = require('express-handlebars');
const bodyparser = require('body-parser');
const apiController = require('./controllers/apicontroller');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('html',exphtml({ extname: 'html', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'html');

app.listen(3001, () => {
    console.log('Express server started at port : 3001');
});

app.use('/details', apiController);
