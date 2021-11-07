const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})