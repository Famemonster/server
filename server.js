const fs = require('fs');
const hbs = require('hbs');
const express = require('express');

const port = process.env.PORT || 80;
const app = express();

// app.use((req, res, next) => {
// 	res.render('maintenance');
// });

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	const now = new Date().toString();

	fs.appendFileSync('server.log', `${now}: ${req.method} ${req.url}\r\n`);
	next();	
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home', {
		title: 'Home Page',
		welcome: 'Welcome to our site'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects', {
		title: 'Projects Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: '404 not found'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});