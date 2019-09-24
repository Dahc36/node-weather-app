const path = require('path');

const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
require('dotenv').config();

const getTemp = require('./utils/getTemp');

// Setup express
const app = express();
const port = process.env.PORT;
// Setup paths
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index', {
		name: 'D. Hans',
		title: 'Weather app',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		name: 'D. Hans',
		title: 'About me',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'And I do appreciate you being round',
		name: 'D. Hans',
		title: 'Help!',
	});
});

app.get('/weather', (req, res) => {
	const { address } = req.query;

	getTemp(address)
		.then(response => {
			let {
				location,
				precipProbability,
				temperature,
				timezone,
			} = response;
			
			console.log(chalk.green(`Success! for ${address}`));
			res.send({
				address,
				forecast: `It is currently ${temperature}°C out. There is a ${precipProbability}% chance of rain.`,
				location,
				timezone,
				msg: 'The weather outside is weather',
			});
		})
		.catch(error => {
			console.log(chalk.red(error));
			console.log(error);
			if (!error.response) {
				if (error.message) {
					res.send({ error: error.message });
				} else {
					res.send({ error: 'Unkown error' });
				}
			} else if (!error.data) {
				res.send(error.response);
			} else {
				res.send(error.response.data);
			}
		});
});

app.get('/products', (req, res) => {
	const { search } = req.query;
	if (search) {
		return res.send({
			products: [],
		});
	}

	res.send({
		error: 'You must provide a search term',
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		message: 'Help article not found',
		name: 'D. Hans',
		title: 'Help 404',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		message: 'Page not found',
		name: 'D. Hans',
		title: '404',
	});
});

app.listen(port, _ => {
	console.log(`Server running on port ${port}...`);
});
