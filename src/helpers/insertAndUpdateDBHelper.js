const DataFramework = require('../models/dataFramework');

exports.insertGetResponse = async (data) => {
    
    const dataToInsert = exports.prepareInsertGetRequest(data);
     
    DataFramework.create(dataToInsert).then((data) => {
        console.log(data);
        return true;
    }).catch((err) => {
        console.error(err);
        return false;
    });
};

exports.updateGetResponse = async (data, idToUpdate) => {
    
    const dataToUpdate = exports.prepareInsertGetRequest(data);
     
    const updateRepoData = DataFramework.findOneAndUpdate({ _id: idToUpdate }, dataToUpdate).
        then((data) => {
            console.log(data);
        }).catch((err) => {
            console.error(err);
        });    

};

exports.prepareInsertGetRequest = (data) => {
 
    let dataToInsert = new Object();

    try {
        [data].forEach((item) => {
            dataToInsert.framework = item.repoName;
            dataToInsert.issues = item.issues;
            dataToInsert.avg = item.avgAge;
            dataToInsert.std = item.stdAge;
        });
    } catch (err) {
        console.error(err);
    }

    return dataToInsert;  
}