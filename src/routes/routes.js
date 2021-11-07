const express = require('express');
const router = express.Router();
const getRequests = require('../services/getRequests');

//const DataFramework = require('./models/dataFramework');

router.get('/', async (req, res) => {
    res.render('index', {itens: ''});
});

router.post('/', async (req, res) => {

    const { library } = req.body;
    //let dataFramework = await DataFramework.find();

    const githubData = await getRequests.getGitHubIssues(library.toLowerCase());

    res.render('index', { itens: githubData });
});


module.exports = router;