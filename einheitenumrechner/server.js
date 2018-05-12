// Initialisierung von Sqlite3
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('umrechner.db', (error) => {
	if (error) {
		console.log(error.message);
	}
	else {
		console.log('connected to the database');
	}
});

// Initialisierung Express
const express = require ('express');
const app = express();
app.use(express.static(__dirname + '/css'));

// Initialisierung Body-Parser
const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Initialisierung Embedded Javascript (ejs)
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, function() {
	console.log('listening to port ' + port);
});

//Seiten-Links
app.get('/laengen', (req, res) => {
	res.render('laengen')
});
app.get('/flaechen', (req, res) => {
	res.render('flaechen')
});
app.get('/volumen', (req, res) => {
	res.render('volumen')
});
app.get('/masse', (req, res) => {
	res.render('masse')
});
app.get('/zeit', (req, res) => {
	res.render('zeit')
});
app.get('/temperatur', (req, res) => {
	res.render('temperatur')
});



