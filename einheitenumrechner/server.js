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
		'formel': '',
		'ergebnis': ''
	});
});

app.get('/flaechen', (req, res) => {
	res.render('flaechen', {
		'formel': '',
		'ergebnis': ''
	});
});

app.get('/volumen', (req, res) => {
	res.render('volumen', {
		'formel': '',
		'ergebnis': ''
	});
});

app.get('/masse', (req, res) => {
	res.render('masse', {
		'formel': '',
		'ergebnis': ''
	});
});
app.get('/zeit', (req, res) => {
	res.render('zeit', {
		'formel': '',
		'ergebnis': ''
	});
});

app.get('/temperatur', (req, res) => {
	res.render('temperatur', {
		'formel': '',
		'ergebnis': ''
	});
});

app.post('/onLaengen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	var rechenFormel;
	var calculation;
	var mal = "*";
	var ergebnis;
	
	const sql = `SELECT formel,rechenFormel FROM laengenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			rechenFormel = row.rechenFormel;
			calculation = number.concat(mal, rechenFormel);			
			ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('laengen', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});

app.post('/onTemperatur', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	var rechenFormel;
	var calculation;
	var ergebnis;
	
	const sql = `SELECT formel,rechenFormel FROM temperaturFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			rechenFormel = row.rechenFormel;
			calculation = number.concat(rechenFormel);			
			ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('temperatur', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});


app.post('/onZeit', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	var rechenFormel;
	var calculation;
	var mal = "*";
	var ergebnis;
	
	const sql = `SELECT formel,rechenFormel FROM zeitFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			rechenFormel = row.rechenFormel;
			calculation = number.concat(mal, rechenFormel);			
			ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('zeit', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});

app.post('/onFlaechen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	//var rechenFormel;
	//var calculation;
	//var mal = "*";
	var ergebnis;
	
	const sql = `SELECT formel FROM flaechenFormel WHERE von='${sel1}' AND nach='${sel2}'` // const sql = `SELECT formel,rechenFormel FROM flaechenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			//rechenFormel = row.rechenFormel;
			//calculation = number.concat(mal, rechenFormel);			
			//ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('flaechen', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});

app.post('/onVolumen', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	//var rechenFormel;
	//var calculation;
	//var mal = "*";
	var ergebnis;
	
	const sql = `SELECT formel FROM volumenFormel WHERE von='${sel1}' AND nach='${sel2}'` //const sql = `SELECT formel,rechenFormel FROM volumenFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			//rechenFormel = row.rechenFormel;
			//calculation = number.concat(mal, rechenFormel);			
			//ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('volumen', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});

app.post('/onMasse', (req, res) => {
	const sel1 = req.body.Temp1;
	const sel2 = req.body.Temp2;
	const number = req.body.number;
	//var rechenFormel;
	//var calculation;
	//var mal = "*";
	var ergebnis;
	
	const sql = `SELECT formel FROM masseFormel WHERE von='${sel1}' AND nach='${sel2}'`  //const sql = `SELECT formel,rechenFormel FROM masseFormel WHERE von='${sel1}' AND nach='${sel2}'`
	db.get(sql, (error, row) => {
		if (error) {
			console.log(error.message);
		}
		else {
			//rechenFormel = row.rechenFormel;
			//calculation = number.concat(mal, rechenFormel);			
			//ergebnis = eval(calculation.toString());
			console.log(ergebnis);
			res.render('masse', {
				'formel': row.formel,
				'ergebnis': ergebnis
			});
		}
	});
});

// db.run('CREATE TABLE temperaturFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL, rechenFormel TEXT NOT NULL)');
/* db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('C', 'C', 'x * 1', '* 1')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('C', 'F', 'x * 1.8 + 32', '* 1.8 + 32')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('C', 'K', 'x + 273.15', '+ 273.15')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('F', 'F', 'x * 1', '* 1')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('F', 'C', '(x - 32) / 1.8', '- 32 / 1.8')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('F', 'K', '(x + 459.67) / 1.8', '+ 459.67 / 1.8')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('K', 'K', 'x * 1', '* 1')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('K', 'C', 'x - 273.15', '- 273.15')`);
db.run(`INSERT INTO temperaturFormel (von, nach, formel, rechenFormel) VALUES ('K', 'F', 'x * 1.8 - 459.67', '* 1.8 - 459.67')`);
*/

// db.run('CREATE TABLE zeitFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL, rechenFormel TEXT NOT NULL)');
/* db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'ns', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'µs', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'ms', '10^-6', 'Math.pow(10, -6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 's', '10^-9', 'Math.pow(10, -9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'min', '10^-9 / 60', 'Math.pow(10, -9) / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'h', '10^-9 / 3600', 'Math.pow(10, -9) / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'd', '10^-9 / (24*3600)', 'Math.pow(10, -9) / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'w', '10^-9 / (7*24*3600)', 'Math.pow(10, -9) / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ns', 'j', '10^-9 / (365*7*24*3600)', 'Math.pow(10, -9) / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'ns', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'µs', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'ms', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 's', '10^-6', 'Math.pow(10, -6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'min', '10^-6 / 60', 'Math.pow(10, -6) / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'h', '10^-6 / 3600', 'Math.pow(10, -6) / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'd', '10^-6 / (24*3600)', 'Math.pow(10, -6) / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'w', '10^-6 / (7*24*3600)', 'Math.pow(10, -6) / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('µs', 'j', '10^-6 / (365*7*24*3600)', 'Math.pow(10, -6) / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'ns', '10^6', 'Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'µs', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'ms', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 's', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'min', '10^-3 / 60', 'Math.pow(10, -3) / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'h', '10^-3 / 3600', 'Math.pow(10, -3) / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'd', '10^-3 / (24*3600)', 'Math.pow(10, -3) / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'w', '10^-3 / (7*24*3600)', 'Math.pow(10, -3) / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('ms', 'j', '10^-3 / (365*7*24*3600)', 'Math.pow(10, -3) / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'ns', '10^9', 'Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'µs', '10^6', 'Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'ms', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 's', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'min', '1 / 60', '1 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'h', '1 / 3600', '1 / 3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'd', '1 / (24*3600)', '1 / (24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'w', '1 / (7*24*3600)', '1 / (7*24*3600)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('s', 'j', '1 / (365*7*24*3600)', '1 / (365*7*24*3600)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'ns', '60 * 10^9', '60 * Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'µs', '60 * 10^6', '60 * Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'ms', '60 * 10^3', '60 * Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 's', '60', '60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'min', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'h', '1 / 60', '1 / 60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'd', '1 / (24*60)', '1 / (24*60)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'w', '1 / (7*24*60)', '1 / (7*24*60)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('min', 'j', '1 / (365*24*60)', '1 / (365*24*60)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'ns', '3600 * 10^9', '3600 * Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'µs', '3600 * 10^6', '3600 * Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'ms', '3600 * 10^3', '3600 * Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 's', '3600', '3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'min', '60', '60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'h', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'd', '1 / 24', '1 / 24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'w', '1 / (7*24)', '1 / (7*24)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('h', 'j', '1 / (365*24)', '1 / (365*24)')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'ns', '24*3600*10^9', '24*3600*Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'µs', '24*3600*10^6', '24*3600*Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'ms', '24*3600*10^3', '24*3600*Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 's', '24*3600', '24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'min', '24*60', '24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'h', '24', '24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'd', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'w', '1 / 7', '1 / 7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('d', 'j', '1 / 365', '1 / 365')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'ns', '7*24*3600*10^9', '7*24*3600*Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'µs', '7*24*3600*10^6', '7*24*3600*Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'ms', '7*24*3600*10^3', '7*24*3600*Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 's', '7*24*3600', '7*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'min', '7*24*60', '7*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'h', '7*24', '7*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'd', '7', '7')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'w', '1', '1')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('w', 'j', '1 / 52,1429', '1 / 52.1429')`);

db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'ns', '365*24*3600*10^9', '365*24*3600*Math.pow(10, 9)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'µs', '365*24*3600*10^6', '365*24*3600*Math.pow(10, 6)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'ms', '365*24*3600*10^3', '365*24*3600*Math.pow(10, 3)')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 's', '365*24*3600', '365*24*3600')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'min', '365*24*60', '365*24*60')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'h', '365*24', '365*24')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'd', '365', '365')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'w', '52,1429', '52.1429')`);
db.run(`INSERT INTO zeitFormel(von, nach, formel, rechenFormel) VALUES ('j', 'j', '1', '1')`);
*/


// db.run('CREATE TABLE laengenFormel(von TEXT NOT NULL, nach TEXT NOT NULL, formel TEXT NOT NULL, rechenFormel TEXT NOT NULL)');
/* db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'nm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'µm', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'mm', '10^-6', 'Math.pow(10, -6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'cm', '10^-7', 'Math.pow(10, -7)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'in', '10^-7 / 2,54', 'Math.pow(10, -7) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'dm', '10^-8', 'Math.pow(10, -8)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'f', '10^-9 / 0,3048', 'Math.pow(10, -9) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'yd', '10^-9 / 0,9144', 'Math.pow(10, -9) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'm', '10^-9', 'Math.pow(10, -9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'km', '10^-12', 'Math.pow(10, -12)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'mi', '10^-9 / 1609,34', 'Math.pow(10, -9) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'smi', '10^-9 / 1852', 'Math.pow(10, -9) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'ae', '10^-18 / 149,598', 'Math.pow(10, -18) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('nm', 'lj', '10^-24 / 9,461', 'Math.pow(10, -24) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'nm', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'µm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'mm', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'cm', '10^-4', 'Math.pow(10, -4)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'in', '10^-4 / 2,54', 'Math.pow(10, -4) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'dm', '10^-5', 'Math.pow(10, -5)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'f', '10^-6 / 0,3048', 'Math.pow(10, -6) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'yd', '10^-6 / 0,9144', 'Math.pow(10, -6) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'm', '10^-6', 'Math.pow(10, -6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'km', '10^-9', 'Math.pow(10, -9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'mi', '10^-6 / 1609,34', 'Math.pow(10, -6) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'smi', '10^-6 / 1852', 'Math.pow(10, -6) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'ae', '10^-15 / 149,598', 'Math.pow(10, -15) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('µm', 'lj', '10^-21 / 9,461', 'Math.pow(10, -21) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'nm', '10^6', 'Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'µm', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'mm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'cm', '10^-1', 'Math.pow(10, -1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'in', '10^-1 / 2,54', 'Math.pow(10, -1) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'dm', '10^-2', 'Math.pow(10, -2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'f', '10^-3 / 0,3048', 'Math.pow(10, -3) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'yd', '10^-3 / 0,9144', 'Math.pow(10, -3) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'm', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'km', '10^-6', 'Math.pow(10, -6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'mi', '10^-3 / 1609,34', 'Math.pow(10, -3) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'smi', '10^-3 / 1852', 'Math.pow(10, -3) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'ae', '10^-12 / 149,598', 'Math.pow(10, -12) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mm', 'lj', '10^-18 / 9,461', 'Math.pow(10, -18) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'nm', '10^7', 'Math.pow(10, 7)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'µm', '10^4', 'Math.pow(10, 4)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'mm', '10^1', 'Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'cm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'in', '1 / 2,54', '1 / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'dm', '10^-1', 'Math.pow(10, -1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'f', '10-2 / 0,3048', 'Math.pow(10, -2) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'yd', '10^-2 / 0,9144', 'Math.pow(10, -2) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'm', '10^-2', 'Math.pow(10, -2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'km', '10^-5', 'Math.pow(10, -5)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'mi', '10^-2 / 1609,34', 'Math.pow(10, -2) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'smi', '10^-2 / 1852', 'Math.pow(10, -2) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'ae', '10^-11 / 149,598', 'Math.pow(10, -11) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('cm', 'lj', '10^-17 / 9,461', 'Math.pow(10, -17) / 9.461')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'nm', '2,54 * 10^7', '2.54 * Math.pow(10, 7)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'µm', '2,54 * 10^4', '2.54 * Math.pow(10, 4)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'mm', '2,54 * 10^1', '2.54 * Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'cm', '2,54', '2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'in', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'dm', '2,54 / 10^1', '2.54 / Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'f', '2,54 / 30,48', '2.54 / 30.48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'yd', '2,54 / 91,44', '2.54 / 91.44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'm', '2,54 / 100', '2.54 / 100')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'km', '2,54 / 10^5', '2.54 / Math.pow(10, 5)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'mi', '2,54 / 160934', '2.54 / 160934')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'smi', '2,54 / 185200', '2.54 / 185200')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'ae', '0,0254 / 149,598*10^9', '0.0254 / 149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('in', 'lj', '0,0254 / 9,461*10^15', '0.0254 / 9.461 * Math.pow(10, 15)')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'nm', '10^8', 'Math.pow(10, 8)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'µm', '10^5', 'Math.pow(10, 5)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'mm', '10^2', 'Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'cm', '10^1', 'Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'in', '10^1 / 2,54', 'Math.pow(10, 1) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'dm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'f', '10^-1 / 0,3048', 'Math.pow(10, -1) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'yd', '10^-1 / 0,9144', 'Math.pow(10, -1) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'm', '10^-1', 'Math.pow(10, -1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'km', '10^-4', 'Math.pow(10, -4)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'mi', '10^-1 / 1609,34', 'Math.pow(10, -1) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'smi', '10^-1 / 1852', 'Math.pow(10, -1) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'ae', '10^-10 / 149,598', 'Math.pow(10, -10) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('dm', 'lj', '10^-16 / 9,461', 'Math.pow(10, -16) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'nm', '0,3048 * 10^9', '0.3048 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'µm', '0,3048 * 10^6', '0.3048 * Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'mm', '0,3048 * 10^3', '0.3048 * Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'cm', '0,3048 * 10^2', '0.3048 * Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'in', '30,48 / 2,54', '30.48 / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'dm', '0,3048 * 10^1', '0.3048 * Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'f', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'yd', '0,3048 / 0,9144', '0.3048 / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'm', '0,3048', '0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'km', '0,3048 / 1000', '0.3048 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'mi', '0,3048 / 1609,34', '0.3048 / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'smi', '0,3048 / 1852', '0.3048 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'ae', '0,3048 / 149,598*10^9', '0.3048 / 149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('f', 'lj', '0,3048 / 9,461*10^15', '0.3048 / 9.461 * Math.pow(10, 15)')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'nm', '0,9144 * 10^9', '0.9144 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'µm', '0,9144 * 10^6', '0.9144 * Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'mm', '0,9144 * 10^3', '0.9144 * Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'cm', '0,9144 * 10^2', '0.9144 * Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'in', '91,44 / 2,54', '91.44 / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'dm', '0,9144 * 10^1', '0.9144 * Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'f', '0,9144 / 0,3048', '0.9144 / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'yd', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'm', '0,9144', '0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'km', '0,9144 / 1000', '0.9144 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'mi', '0,9144 / 1609,34', '0.9144 / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'smi', '0,9144 / 1852', '0.9144 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'ae', '0,9144 / 149,598*10^9', '0.9144 / 149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('yd', 'lj', '0,9144 / 9,461*10^15', '0.9144 / 9.461 * Math.pow(10, 15)')`);
*/

/* db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'nm', '10^9', 'Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'µm', '10^6', 'Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'mm', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'cm', '10^2', 'Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'in', '10^2 / 2,54', 'Math.pow(10, 2) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'dm', '10^1', 'Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'f', '1 / 0,3048', '1 / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'yd', '1 / 0,9144', '1 / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'm', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'km', '10^-3', 'Math.pow(10, -3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'mi', '1 / 1609,34', '1 / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'smi', '1 / 1852', '1 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'ae', '10^-9 / 149,598', 'Math.pow(10, -9) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('m', 'lj', '10^-15 / 9,461', 'Math.pow(10, -15) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'nm', '10^12', 'Math.pow(10, 12)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'µm', '10^9', 'Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'mm', '10^6', 'Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'cm', '10^5', 'Math.pow(10, 5)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'in', '10^5 / 2,54', 'Math.pow(10, 5) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'dm', '10^4', 'Math.pow(10, 4)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'f', '10^3 / 0,3048', 'Math.pow(10, 3) / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'yd', '10^3 / 0,9144', 'Math.pow(10, 3) / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'm', '10^3', 'Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'km', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'mi', '10^3 / 1609,34', 'Math.pow(10, 3) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'smi', '10^3 / 1852', 'Math.pow(10, 3) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'ae', '10^-6 / 149,598', 'Math.pow(10, -6) / 149.598')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('km', 'lj', '10^-12 / 9,461', 'Math.pow(10, -12) / 9.461')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'nm', '1609,34 * 10^9', '1609.34 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'µm', '1609,34 * 10^6', '1609.34 * Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'mm', '1609,34 * 10^3', '1609.34 * Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'cm', '1609,34 * 10^2', '1609.34 * Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'in', '1609,34 / 0,0254', '1609.34 / 0.0254')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'dm', '1609,34 * 10^1', '1609.34 * Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'f', '1609,34 / 0,3048', '1609.34 / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'yd', '1609,34 / 0,9144', '1609.34 / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'm', '1609,34', '1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'km', '1609,34 / 1000', '1609.34 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'mi', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'smi', '1609,34 / 1852', '1609.34 / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'ae', '1609,34 / 149,598*10^9', '1609.34 / 149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('mi', 'lj', '1609,34 / 9,461*10^15', '1609.34 / 9.461 * Math.pow(10, 15)')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'nm', '1852 * 10^9', '1852 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'µm', '1852 * 10^6', '1852 * Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'mm', '1852 * 10^3', '1852 * Math.pow(10, 3)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'cm', '1852 * 10^2', '1852 * Math.pow(10, 2)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'in', '1852 / 0,0254', '1852 / 0.0254')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'dm', '1852 * 10^1', '1852 * Math.pow(10, 1)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'f', '1852 / 0,3048', '1852 / 0.3048')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'yd', '1852 / 0,9144', '1852 / 0.9144')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'm', '1852', '1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'km', '1852 / 1000', '1852 / 1000')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'mi', '1852 / 1609,34', '1852 / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'smi', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'ae', '1852 / 149,598*10^9', '1852 / 149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('smi', 'lj', '1852 / 9,461*10^15', '1852 / 9.461 * Math.pow(10, 15)')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'nm', '149,598 * 10^18', '149.598 * Math.pow(10, 18)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'µm', '149,598 * 10^15', '149.598 * Math.pow(10, 15)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'mm', '149,598 * 10^12', '149.598 * Math.pow(10, 12)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'cm', '149,598 * 10^11', '149.598 * Math.pow(10, 11)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'in', '149,598 * 10^11 / 2,54', '149.598 * Math.pow(10, 11) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'dm', '149,598 * 10^10', '149.598 * Math.pow(10, 10)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'f', '149,598 * 10^11 / 30,48', '149.598 * Math.pow(10, 11) / 30.48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'yd', '149,598 * 10^11 / 91,44', '149.598 * Math.pow(10, 11) / 91.44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'm', '149,598 * 10^9', '149.598 * Math.pow(10, 9)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'km', '149,598 * 10^6', '149.598 * Math.pow(10, 6)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'mi', '149,598 * 10^9 / 1609,34', '149.598 * Math.pow(10, 9) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'smi', '149,598 * 10^9 / 1852', '149.598 * Math.pow(10, 9) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'ae', '1', '1')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('ae', 'lj', '(149,598*10^9) / (9,461*10^15)', '(149.598 * Math.pow(10, 9)) / (9.461 * Math.pow(10, 15))')`);


db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'nm', '9,461 * 10^24', '9.461 * Math.pow(10, 24)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'µm', '9,461 * 10^21', '9.461 * Math.pow(10, 21)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'mm', '9,461 * 10^18', '9.461 * Math.pow(10, 18)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'cm', '9,461 * 10^17', '9.461 * Math.pow(10, 17)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'in', '9,461 * 10^17 / 2,54', '9.461 * Math.pow(10, 17) / 2.54')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'dm', '9,461 * 10^16', '9.461 * Math.pow(10, 16)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'f', '9,461 * 10^17 / 30,48', '9.461 * Math.pow(10, 17) / 30.48')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'yd', '9,461 * 10^17 / 91,44', '9.461 * Math.pow(10, 17) / 91.44')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'm', '9,461 * 10^15', '9.461 * Math.pow(10, 15)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'km', '9,461 * 10^12', '9.461 * Math.pow(10, 12)')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'mi', '9,461 * 10^15 / 1609,34', '9.461 * Math.pow(10, 15) / 1609.34')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'smi', '9,461 * 10^15 / 1852', '9.461 * Math.pow(10, 15) / 1852')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'ae', '(9,461*10^15) / (149,598*10^9)', '(9.461 * Math.pow(10, 15)) / (149.598 * Math.pow(10, 9))')`);
db.run(`INSERT INTO laengenFormel(von, nach, formel, rechenFormel) VALUES ('lj', 'lj', '1', '1')`);
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









