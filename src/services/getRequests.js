const axios = require('axios').default;
const getHelpers = require('../helpers/getHelpers');

exports.getGitHubIssues = async (library) => {

    const token = process.env.TOKEN;
    const options = {
        port: 443,
        method: 'GET',
        headers: {
            'User-Agent': 'request',
            authorization: token
        },
    };
    
    let stop = false;
    const allData = new Set();
    let url = getHelpers.buildUrlToRequest(library);

    let fullUrl = {
        url: url,
        pageParam: '&page=',
        page: 0,
        urlFrezzed: url,
    }
    
    while (!stop && fullUrl.page < 1) {

        await axios.get(fullUrl.url, options).then((data) => {

            stop = data.data.length > 0 ? false : true;
            
            for (let item of data.data.values()) {
                allData.add(item);
            }

        }).catch((error) => {
            stop = true;
            console.log(error);
        });
        
        fullUrl.page++;
        const newUrl = fullUrl.urlFrezzed.substring(0, fullUrl.url.length);
        fullUrl.url = `${newUrl}${fullUrl.pageParam}${fullUrl.page}`;
        
    }

    const finalRespose = getHelpers.buildFormatedData(allData, library);

    return finalRespose;
}