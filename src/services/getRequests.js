const axios = require('axios').default;
const getHelpers = require('../helpers/getHelpers');
const insertDBHelper = require('../helpers/insertAndUpdateDBHelper');

exports.getGitHubIssues = async (library, idToUpdate) => {

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

    if (url) {

        let fullUrl = {
            url: url,
            pageParam: '&page=',
            page: 0,
            urlFrezzed: url,
        }
    
        while (!stop) {

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

        try {
            const finalRespose = getHelpers.buildFormatedData(allData, library);

            if (!idToUpdate) {
                await insertDBHelper.insertGetResponse(finalRespose);
            } else {
                await insertDBHelper.updateGetResponse(finalRespose, idToUpdate);
            }

        } catch (err) {
            console.error(err);
        }
    }
}