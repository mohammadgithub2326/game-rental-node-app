const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app =require('./App')

dotenv.config();


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async () => {
        server.close(() => {
            console.log('Server stopped');
        });

        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
            process.exit(0);
        } catch (err) {
            console.error('Error closing MongoDB connection:', err.message);
            process.exit(1);
        }
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});
