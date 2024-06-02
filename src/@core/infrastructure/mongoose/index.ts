import mongoose, { ConnectOptions, Connection } from 'mongoose';

// Interface for connection options
interface MyConnectionOptions extends ConnectOptions {
	// Add any custom options specific to your application
}

// Function to connect to the database
async function connectToDb(uri: string, options?: MyConnectionOptions): Promise<Connection> {
	try {
		const connection = await mongoose.connect(uri, options);
		console.log('Connected to MongoDB');
		return connection.connection;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err; // Re-throw the error for further handling
	}
}

// Example usage
(async () => {
	try {
		const connection = await connectToDb(process.env.MONGODB_URI as string);

		// Use the connection object here
		connection.on('open', () => console.log('Database connection opened'));
		connection.on('error', err => console.error('Database connection error:', err));
	} catch (err) {
		console.error('Error:', err);
	}
})();
