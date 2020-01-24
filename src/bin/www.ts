#!/usr/bin/env node
// tslint:disable: no-console

/**
 * Module dependencies.
 */

import 'reflect-metadata';
import debug from 'debug';
import * as http from 'http';
import { initApp } from '@src/app';
import { initDB, closeDB } from '@src/database/db';
import { loadUiFromDB } from '@src/utils/loadUiEntities';

debug('test:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

let server: http.Server = null;

/**
 * Run DB and Listen on provided port, on all network interfaces.
 */
initDB()
	.then(function() {
		loadUiFromDB().then(() => {
			const app = initApp();
			app.set('port', port);

			server = http.createServer(app);
			server.listen(port);
			server.on('error', onError);
			server.on('listening', onListening);
		});
	})
	.catch(function(err) {
		console.error(err);
		console.error('Server cannot start');
	});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
	const rawPort = parseInt(val, 10);

	if (isNaN(rawPort)) {
		// named pipe
		return val;
	}

	if (rawPort >= 0) {
		// port number
		return rawPort;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
	closeDB();

	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
