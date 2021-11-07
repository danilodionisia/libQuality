exports.buildFormatedData = (data, repo) => {

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
    
    return exports.treatMainTopics(resumedData, repo);
};

exports.treatMainTopics = (data, repo) => {
    
    let response = {
        repoName: repo,
        issues: 0,
        avgAge: 0,
        stdAge: 0,
    };

    const allIssueTime = new Array();

    [...data].forEach((item) => {
        
        if (item.issueState == 'open') {
            response.issues++;
        }
        
        const amountOfDays = exports.generateAmountOfDays(item);
        allIssueTime.push(amountOfDays);
        
    });
        
    response.avgAge = exports.generateAvg(allIssueTime);
    response.stdAge = exports.generateStd(allIssueTime, response.avgAge);

    return response;
};

exports.generateAvg = (data) => {
    
    const sumOfAllTimeIssues = data.reduce((a, b) => a + b, 0);
    const avgOfAllTimeIssues = (sumOfAllTimeIssues / data.length) || 0;

    return Math.ceil(avgOfAllTimeIssues);
};

exports.generateAmountOfDays = (data) => {

    const issueDate = new Date(data.issueCreatedAt);
    const currentDate = new Date(data.currentDateTime);
    let differenceOfDays = currentDate.getTime() - issueDate.getTime();
    differenceOfDays = differenceOfDays / (1000 * 3600 * 24);

    return Math.ceil(differenceOfDays);
};

exports.generateStd = (allIssueTime, avg) => {

    let finalAmount = 0;

    allIssueTime.forEach((day) => {
        let diffOfdayAndAvg = parseFloat(day) - parseFloat(avg);
        let powOfday = diffOfdayAndAvg * diffOfdayAndAvg;
        finalAmount += powOfday; 
    });

    let stdOfAmount = (parseFloat(finalAmount) / parseFloat(allIssueTime.length)) || 0;
    
    stdOfAmount = Math.ceil(Math.sqrt(stdOfAmount));

    return stdOfAmount;
};

exports.buildUrlToRequest = (libray) => {
    
    const dataOfUrl = {
        react: {
            owner: 'facebook',
            repo: 'react',
        },
        angular: {
            owner: 'angular',
            repo: 'angular',
        },
        vue: {
            owner: 'vuejs',
            repo: 'vue',
        },
    };

    let url = undefined;

    if (dataOfUrl[libray]) {
        url = `https://api.github.com/repos/${dataOfUrl[libray].owner}/${dataOfUrl[libray].repo}/issues?per_page=100`;
    }

    return url;
}
