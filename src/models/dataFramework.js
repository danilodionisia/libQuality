const mongoose = require('../database');

const DataFrameworkSchema = new mongoose.Schema({

    framework: {
        type: String,
        required: true,
    },
    issues: {
        type: Number,
        required: true,
    },
    avg: {
        type: Number,
        required: true,
    },
    std: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const DataFramework = mongoose.model('DataFramework', DataFrameworkSchema);

module.exports = DataFramework;