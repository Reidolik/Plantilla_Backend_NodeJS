const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./components/auth/network')
const collaborator = require('./components/collaborator/network')
const perfil = require('./components/perfil/network')
const errors = require('../network/errors')
const https = require('https')
const fs = require('fs')

const config = require('../config')

const app = express()

app.use(bodyParser.json())

//cors
app.all('/*', function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "iva.com.gt"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,X-Client-Time,Authorization');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

//Router
app.use('/api/auth', auth)
app.use('/api/colaborador', collaborator)
app.use('/api/perfil', perfil)

//tiene que ir de ultimo
app.use(errors)

app.listen(config.api.port, () => {
	console.log(`Servidor alojado en http://localhost:${config.api.port}`)
})