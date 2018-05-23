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
	res.render('temperatur', {
		'formel': ''
	});
});

app.post('/onTemperatur', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM temperaturFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('temperatur', {
				'formel': row.formel
			});
		}
	});
});

// const sql = 'CREATE TABLE temperaturFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)';
// const sql = `INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`
// db.run(`INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`);