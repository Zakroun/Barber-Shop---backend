// config/db.js
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

        // 🔥 mongoose v7+ ما يحتاجش options useNewUrlParser/useUnifiedTopology
        cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = connectDB;