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
	res.render('zeit', {
		'formel': ''
	});
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

app.post('/onZeit', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM zeitFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('zeit', {
				'formel': row.formel
			});
		}
	});
});

// const sql = 'CREATE TABLE temperaturFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)';
// const sql = `INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`
// db.run(`INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`);

// db.run('CREATE TABLE zeitFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');
/* db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'ns', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'µs', 'x * 10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'ms', 'x * 10^-6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 's', 'x * 10^-9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'min', 'x * 10^-9 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'h', 'x * 10^-9 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'd', 'x * 10^-9 / 24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'w', 'x * 10^-9 / 7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'j', 'x * 10^-9 / 365*7*24*3600')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'ns', 'x * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'µs', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'ms', 'x * 10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 's', 'x * 10^-6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'min', 'x * 10^-6 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'h', 'x * 10^-6 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'd', 'x * 10^-6 / 24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'w', 'x * 10^-6 / 7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'j', 'x * 10^-6 / 365*7*24*3600')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'ns', 'x * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'µs', 'x * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'ms', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 's', 'x * 10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'min', 'x * 10^-3 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'h', 'x * 10^-3 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'd', 'x * 10^-3 / 24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'w', 'x * 10^-3 / 7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'j', 'x * 10^-3 / 365*7*24*3600')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'ns', 'x * 10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'µs', 'x * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'ms', 'x * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 's', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'min', 'x / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'h', 'x / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'd', 'x / 24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'w', 'x / 7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'j', 'x / 365*7*24*3600')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'ns', 'x * 60 * 10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'µs', 'x * 60 * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'ms', 'x * 60 * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 's', 'x * 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'min', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'h', 'x / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'd', 'x / 24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'w', 'x / 7*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'j', 'x / 365*24*60')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'ns', 'x * 3600 * 10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'µs', 'x * 3600 * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'ms', 'x * 3600 * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 's', 'x * 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'min', 'x * 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'h', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'd', 'x / 24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'w', 'x / 7*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'j', 'x / 365*24')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'ns', 'x * 24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'µs', 'x * 24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'ms', 'x * 24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 's', 'x * 24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'min', 'x * 24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'h', 'x * 24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'd', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'w', 'x / 7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'j', 'x / 365')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'ns', 'x * 7*24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'µs', 'x * 7*24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'ms', 'x * 7*24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 's', 'x * 7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'min', 'x * 7*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'h', 'x * 7*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'd', 'x * 7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'w', 'x * 1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'j', 'x / 52,1429')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'ns', 'x * 365*24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'µs', 'x * 365*24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'ms', 'x * 365*24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 's', 'x * 365*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'min', 'x * 365*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'h', 'x * 365*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'd', 'x * 365')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'w', 'x * 52,1429')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'j', 'x * 1')`);
*/







