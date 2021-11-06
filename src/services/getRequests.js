const axios = require('axios').default;

exports.getGitHubIssues = async (data) => {
    
    const token = 'authorization: Bearer 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';
    const options = {
        port: 443,
        method: 'GET',
        headers: {
            'User-Agent': 'request',
            authorization: token
        },        
    };     
    const url = `https://api.github.com/repos/${data.owner}/${data.repo}/issues`;
    
    const allData = new Set();
    
    await axios.get(url, options).then((data) => {
        for (let item of data.data.values()) {
            allData.add(item);
        }
    }).catch((error) => {
        console.log(error);
    });

    return allData;
}
