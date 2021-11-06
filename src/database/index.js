const mongoose = require('mongoose');
const database = process.env.DATABASE_CONN;

mongoose.connect("mongodb://localhost/libQaulity", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error(err);
});

module.exports = mongoose;