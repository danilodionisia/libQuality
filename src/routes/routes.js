const express = require('express');
const router = express.Router();
const getRequests = require('../services/getRequests');
const queryDB = require('../helpers/queryDB');

router.get('/', async (req, res) => {
    const itens = await queryDB.getAllDataFromDb();    
    res.render('index', {itens: itens});
});

router.post('/', async (req, res) => {
    const { library } = req.body;
    const idToUpdate = req.body[library.toLowerCase()];
    
    await getRequests.getGitHubIssues(library.toLowerCase(), idToUpdate);
    
    res.redirect('/');
});


module.exports = router;