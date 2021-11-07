const axios = require('axios').default;

exports.getGitHubIssues = async (data) => {
    const token = process.env.TOKEN;
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

    const finalRespose = exports.buildFormatedData(allData);

    return [...finalRespose];
}

exports.buildFormatedData = (data) => {

    const resumedData = new Set();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    for (const item of data.values()) {
        resumedData.add({
            issueId: item.id,
            issueTitle: item.title,
            issueState: item.state,
            issueCreatedAt: item.created_at,
            issueClosedAT: item.closed_at,
            currentDateTime: today.toISOString(),
        });
    }

    return resumedData;
};
