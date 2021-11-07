const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const getRequests = require('./services/getRequests');

//const DataFramework = require('./models/dataFramework');

const cors = require('cors');

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));




app.get('/', async (req, res) => {

    //let dataFramework = await DataFramework.find();

    const githubData = await getRequests.getGitHubIssues({ owner: 'angular', repo: 'angular' });
    


    return res.status(200).json(githubData);

});


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})