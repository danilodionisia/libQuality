const DataFramework = require('../models/dataFramework');

exports.getAllDataFromDb = async () => {

    const dataFramework = await DataFramework.find().sort('framework');

    const response = exports.formatResponseOfQuery(dataFramework);
    
    return response;

};

exports.formatResponseOfQuery = (data) => {

    const finalResponse = new Array();

    try {

        data.forEach((item) => {
            finalResponse.push({                
                originalId: item._id,
                framework: item.framework,
                issues: item.issues,
                avg: item.avg,
                std: item.std,
            });
        });

    } catch (err) {
        console.error(err);
    }

    return finalResponse;
};