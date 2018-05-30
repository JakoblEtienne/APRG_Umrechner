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
	res.render('laengen', {
		'formel': ''
	});
});

app.get('/flaechen', (req, res) => {
	res.render('flaechen', {
		'formel': ''
	});
});

app.get('/volumen', (req, res) => {
	res.render('volumen', {
		'formel': ''
	});
});

app.get('/masse', (req, res) => {
	res.render('masse', {
		'formel': ''
	});
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

app.post('/onLaengen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM laengenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('laengen', {
				'formel': row.formel
			});
		}
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

app.post('/onFlaechen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM flaechenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('flaechen', {
				'formel': row.formel
			});
		}
	});
});

app.post('/onVolumen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM volumenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('volumen', {
				'formel': row.formel
			});
		}
	});
});

app.post('/onMasse', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	
	const sql = `SELECT formel FROM masseFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			res.render('masse', {
				'formel': row.formel
			});
		}
	});
});

// const sql = 'CREATE TABLE temperaturFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)';
// const sql = `INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`
// db.run(`INSERT INTO temperaturFormel (von, nach, formel) VALUES ('C', 'C', 'x * 1')`);

// db.run('CREATE TABLE zeitFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');
/* db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'ns', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'µs', '10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'ms', '10^-6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 's', '10^-9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'min', '10^-9 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'h', '10^-9 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'd', '10^-9 / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'w', '10^-9 / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ns', 'j', '10^-9 / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'ns', '10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'µs', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'ms', '10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 's', '10^-6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'min', '10^-6 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'h', '10^-6 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'd', '10^-6 / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'w', '10^-6 / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('µs', 'j', '10^-6 / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'ns', '10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'µs', '10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'ms', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 's', '10^-3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'min', '10^-3 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'h', '10^-3 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'd', '10^-3 / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'w', '10^-3 / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('ms', 'j', '10^-3 / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'ns', '10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'µs', '10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'ms', '10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 's', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'min', '1 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'h', '1 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'd', '1 / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'w', '1 / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('s', 'j', '1 / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'ns', '60 * 10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'µs', '60 * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'ms', '60 * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 's', '60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'min', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'h', '1 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'd', '1 / (24*60)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'w', '1 / (7*24*60)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('min', 'j', '1 / (365*24*60)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'ns', '3600 * 10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'µs', '3600 * 10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'ms', '3600 * 10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 's', '3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'min', '60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'h', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'd', '1 / 24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'w', '1 / (7*24)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('h', 'j', '1 / (365*24)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'ns', '24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'µs', '24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'ms', '24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 's', '24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'min', '24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'h', '24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'd', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'w', '1 / 7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('d', 'j', '1 / 365')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'ns', '7*24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'µs', '7*24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'ms', '7*24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 's', '7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'min', '7*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'h', '7*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'd', '7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'w', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('w', 'j', '1 / 52,1429')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'ns', '365*24*3600*10^9')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'µs', '365*24*3600*10^6')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'ms', '365*24*3600*10^3')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 's', '365*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'min', '365*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'h', '365*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'd', '365')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'w', '52,1429')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel) VALUES ('j', 'j', '1')`);
*/


// db.run('CREATE TABLE laengenFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');
/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'nm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'µm', '10^-3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'mm', '10^-6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'cm', '10^-7')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'in', '10^-7 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'dm', '10^-8')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'f', '10^-9 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'yd', '10^-9 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'm', '10^-9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'km', '10^-12')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'mi', '10^-9 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'smi', '10^-9 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'ae', '10^-18 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('nm', 'lj', '10^-24 / 9,461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'nm', '10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'µm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'mm', '10^-3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'cm', '10^-4')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'in', '10^-4 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'dm', '10^-5')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'f', '10^-6 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'yd', '10^-6 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'm', '10^-6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'km', '10^-9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'mi', '10^-6 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'smi', '10^-6 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'ae', '10^-15 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('µm', 'lj', '10^-21 / 9,461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'nm', '10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'µm', '10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'mm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'cm', '10^-1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'in', '10^-1 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'dm', '10^-2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'f', '10^-3 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'yd', '10^-3 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'm', '10^-3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'km', '10^-6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'mi', '10^-3 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'smi', '10^-3 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'ae', '10^-12 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mm', 'lj', '10^-18 / 9,461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'nm', '10^7')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'µm', '10^4')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'mm', '10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'cm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'in', '1 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'dm', '10^-1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'f', '10-2 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'yd', '10^-2 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'm', '10^-2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'km', '10^-5')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'mi', '10^-2 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'smi', '10^-2 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'ae', '10^-11 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('cm', 'lj', '10^-17 / 9,461')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'nm', '2,54 * 10^7')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'µm', '2,54 * 10^4')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'mm', '2,54 * 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'cm', '2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'in', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'dm', '2,54 / 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'f', '2,54 / 30,48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'yd', '2,54 / 91,44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'm', '2,54 / 100')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'km', '2,54 / 10^5')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'mi', '2,54 / 160934')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'smi', '2,54 / 185200')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'ae', '0,0254 / 149,598*10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('in', 'lj', '0,0254 / 9,461*10^15')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'nm', '10^8')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'µm', '10^5')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'mm', '10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'cm', '10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'in', '10^1 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'dm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'f', '10^-1 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'yd', '10^-1 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'm', '10^-1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'km', '10^-4')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'mi', '10^-1 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'smi', '10^-1 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'ae', '10^-10 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('dm', 'lj', '10^-16 / 9,461')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'nm', '0,3048 * 10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'µm', '0,3048 * 10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'mm', '0,3048 * 10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'cm', '0,3048 * 10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'in', '30,48 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'dm', '0,3048 * 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'f', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'yd', '0,3048 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'm', '0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'km', '0,3048 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'mi', '0,3048 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'smi', '0,3048 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'ae', '0,3048 / 149,598*10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('f', 'lj', '0,3048 / 9,461*10^15')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'nm', '0,9144 * 10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'µm', '0,9144 * 10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'mm', '0,9144 * 10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'cm', '0,9144 * 10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'in', '91,44 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'dm', '0,9144 * 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'f', '0,9144 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'yd', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'm', '0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'km', '0,9144 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'mi', '0,9144 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'smi', '0,9144 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'ae', '0,9144 / 149,598*10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('yd', 'lj', '0,9144 / 9,461*10^15')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'nm', '10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'µm', '10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'mm', '10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'cm', '10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'in', '10^2 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'dm', '10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'f', '1 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'yd', '1 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'm', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'km', '10^-3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'mi', '1 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'smi', '1 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'ae', '10^-9 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('m', 'lj', '10^-15 / 9,461')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'nm', '10^12')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'µm', '10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'mm', '10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'cm', '10^5')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'in', '10^5 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'dm', '10^4')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'f', '10^3 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'yd', '10^3 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'm', '10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'km', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'mi', '10^3 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'smi', '10^3 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'ae', '10^-6 / 149,598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('km', 'lj', '10^-12 / 9,461')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'nm', '1609,34 * 10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'µm', '1609,34 * 10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'mm', '1609,34 * 10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'cm', '1609,34 * 10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'in', '1609,34 / 0,0254')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'dm', '1609,34 * 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'f', '1609,34 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'yd', '1609,34 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'm', '1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'km', '1609,34 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'mi', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'smi', '1609,34 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'ae', '1609,34 / 149,598*10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('mi', 'lj', '1609,34 / 9,461*10^15')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'nm', '1852 * 10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'µm', '1852 * 10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'mm', '1852 * 10^3')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'cm', '1852 * 10^2')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'in', '1852 / 0,0254')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'dm', '1852 * 10^1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'f', '1852 / 0,3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'yd', '1852 / 0,9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'm', '1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'km', '1852 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'mi', '1852 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'smi', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'ae', '1852 / 149,598*10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('smi', 'lj', '1852 / 9,461*10^15')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'nm', '149,598 * 10^18')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'µm', '149,598 * 10^15')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'mm', '149,598 * 10^12')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'cm', '149,598 * 10^11')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'in', '149,598 * 10^11 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'dm', '149,598 * 10^10')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'f', '149,598 * 10^11 / 30,48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'yd', '149,598 * 10^11 / 91,44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'm', '149,598 * 10^9')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'km', '149,598 * 10^6')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'mi', '149,598 * 10^9 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'smi', '149,598 * 10^9 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'ae', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('ae', 'lj', '(149,598*10^9) / (9,461*10^15)')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'nm', '9,461 * 10^24')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'µm', '9,461 * 10^21')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'mm', '9,461 * 10^18')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'cm', '9,461 * 10^17')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'in', '9,461 * 10^17 / 2,54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'dm', '9,461 * 10^16')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'f', '9,461 * 10^17 / 30,48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'yd', '9,461 * 10^17 / 91,44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'm', '9,461 * 10^15')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'km', '9,461 * 10^12')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'mi', '9,461 * 10^15 / 1609,34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'smi', '9,461 * 10^15 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'ae', '(9,461*10^15) / (149,598*10^9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel) VALUES ('lj', 'lj', '1')`);
*/


//db.run('CREATE TABLE flaechenFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');
/* db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'mm²', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'cm²', '10^-2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'dm²', '10^-4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'm²', '10^-6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'ar', '10^-6 / 4046,86')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'he', '10^-6 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'km²', '10^-6 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mm²', 'mi²', '10^-6 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'mm²', '10^2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'cm²', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'dm²', '10^-2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'm²', '10^-4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'ar', '10^-4 / 4046,86')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'he', '10^-4 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'km²', '10^-4 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('cm²', 'mi²', '10^-4 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'mm²', '10^4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'cm²', '10^2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'dm²', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'm²', '10^-2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'ar', '10^-2 / 4046,86')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'he', '10^-2 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'km²', '10^-2 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('dm²', 'mi²', '10^-2 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'mm²', '10^6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'cm²', '10^4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'dm²', '10^2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'm²', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'ar', '1 / 4046,86')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'he', '1 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'km²', '1 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('m²', 'mi²', '1 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'mm²', '4046,86 * 10^6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'cm²', '4046,86 * 10^4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'dm²', '4046,86 * 10^2')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'm²', '4046,86')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'ar', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'he', '4046,86 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'km²', '4046,86 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('ar', 'mi²', '4046,86 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'mm²', '10^10')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'cm²', '10^8')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'dm²', '10^6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'm²', '10^4')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'ar', '10000 / 4046,68')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'he', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'km²', '10000 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('he', 'mi²', '10000 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'mm²', '10^12')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'cm²', '10^10')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'dm²', '10^8')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'm²', '10^6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'ar', '1000000 / 4046,68')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'he', '1000000 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'km²', '1')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('km²', 'mi²', '1000000 / 2590000')`);
*/

/*db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'mm²', '2,59 * 10^12')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'cm²', '2,59 * 10^10')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'dm²', '2,59 * 10^8')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'm²', '2,59 * 10^6')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'ar', '2590000 / 4046,68')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'he', '2590000 / 10000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'km²', '2590000 / 1000000')`);
db.run(`INSERT INTO flaechenFormel(von, nach, formel) VALUES ('mi²', 'mi²', '1')`);
*/


//db.run('CREATE TABLE volumenFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');
/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'mm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'cm³', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'ml', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'dm³', '10^-6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'l', '10^-6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'm³', '10^-9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'km³', '10^-9 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mm³', 'mi³', '10^-9 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'mm³', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'cm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'ml', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'dm³', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'l', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'm³', '10^-6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'km³', '10^-6 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('cm³', 'mi³', '10^-6 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'mm³', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'cm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'ml', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'dm³', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'l', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'm³', '10^-6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'km³', '10^-6 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('ml', 'mi³', '10^-6 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'mm³', '10^6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'cm³', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'ml', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'dm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'l', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'm³', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'km³', '10^-3 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('dm³', 'mi³', '10^-3 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'mm³', '10^6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'cm³', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'ml', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'dm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'l', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'm³', '10^-3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'km³', '10^-3 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('l', 'mi³', '10^-3 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'mm³', '10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'cm³', '10^6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'ml', '10^6')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'dm³', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'l', '10^3')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'm³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'km³', '1 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('m³', 'mi³', '1 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'mm³', '10^18')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'cm³', '10^15')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'ml', '10^15')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'dm³', '10^12')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'l', '10^12')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'm³', '10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'km³', '1')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('km³', 'mi³', '10^9 / 2,59 * 10^9')`);
*/

/*db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'mm³', '2,59 * 10^18')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'cm³', '2,59 * 10^15')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'ml', '2,59 * 10^15')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'dm³', '2,59 * 10^12')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'l', '2,59 * 10^12')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'm³', '2,59 * 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'km³', '2,59 * 10^9 / 10^9')`);
db.run(`INSERT INTO volumenFormel(von, nach, formel) VALUES ('mi³', 'mi³', '1')`);
*/


//db.run('CREATE TABLE masseFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL)');

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'ng', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'µg', '10^-3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'mg', '10^-6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'g', '10^-9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'u', '10^-9 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'p', '10^-9 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 'kg', '10^-9 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 's', '10^-9 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('ng', 't', '10^-9 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'ng', '10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'µg', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'mg', '10^-3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'g', '10^-6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'u', '10^-6 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'p', '10^-6 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 'kg', '10^-6 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 's', '10^-6 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('µg', 't', '10^-6 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'ng', '10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'µg', '10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'mg', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'g', '10^-3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'u', '10^-3 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'p', '10^-3 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 'kg', '10^-3 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 's', '10^-3 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('mg', 't', '10^-3 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'ng', '10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'µg', '10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'mg', '10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'g', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'u', '1 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'p', '1 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 'kg', '1 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 's', '1 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('g', 't', '1 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'ng', '28,3495 * 10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'µg', '28,3495 * 10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'mg', '28,3495 * 10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'g', '28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'u', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'p', '28,3495 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 'kg', '28,3495 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 's', '28,3495 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('u', 't', '28,3495 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'ng', '453,592 * 10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'µg', '453,592 * 10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'mg', '453,592 * 10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'g', '453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'u', '453,592 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'p', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 'kg', '453,592 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 's', '453,592 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('p', 't', '453,592 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'ng', '10^12')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'µg', '10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'mg', '10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'g', '10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'u', '10^3 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'p', '10^3 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 'kg', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 's', '10^3 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('kg', 't', '10^3 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'ng', '6350,29 * 10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'µg', '6350,29 * 10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'mg', '6350,29 * 10^3')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'g', '6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'u', '6350,29 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'p', '6350,29 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 'kg', '6350,29 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 's', '1')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('s', 't', '6350,29 / 1000000')`);
*/

/*db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'ng', '10^15')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'µg', '10^12')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'mg', '10^9')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'g', '10^6')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'u', '10^6 / 28,3495')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'p', '10^6 / 453,592')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 'kg', '10^6 / 1000')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 's', '10^6 / 6350,29')`);
db.run(`INSERT INTO masseFormel(von, nach, formel) VALUES ('t', 't', '1')`);
*/









