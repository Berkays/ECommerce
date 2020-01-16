import * as assert from 'assert';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export async function initDB() {
	try {
		let connection = null;
		if (process.env.FAKER == 'true') {
			console.log('Faker is active. Dropping existing tables.');
			const connectionOptions = await getConnectionOptions();
			Object.assign(connectionOptions, { dropSchema: true });
			Object.assign(connectionOptions, { entities: ['dist_gen/models/*.js'] });
			Object.assign(connectionOptions, { subscribers: ['dist_gen/subscribers/*.js'] });
			Object.assign(connectionOptions, { migrations: ['dist_gen/migrations/*.js'] });
			connection = await createConnection(connectionOptions);
		} else {
			connection = await createConnection();
		}
		assert.notStrictEqual(null, connection);
	} catch (err) {
		console.error('Cant connect to db');
		console.error(err);
	}
}

export async function closeDB() {
	const connection = getConnection();
	assert.equal(true, connection.isConnected);
	await connection.close();
}
