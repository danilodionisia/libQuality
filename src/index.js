const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})