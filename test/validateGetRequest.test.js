const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const getHelpers = require('../src/helpers/getHelpers');

describe('Validate getHelpers methods', () => {

    afterEach(() => {
        sandbox.restore();
    });

    it('Validate treatMainTopics - Success', (done) => {
        const resp = getHelpers.treatMainTopics(dataToTreatMainTopics, repo);
        expect(resp).deep.eql({ repoName: 'vue', issues: 2, avgAge: 467, stdAge: 6 });
        done();
    });

    it('Validate treatMainTopics - Fail', (done) => {
        const resp = getHelpers.treatMainTopics([], undefined);
        expect(resp).deep.eql({ repoName: undefined, issues: 0, avgAge: 0, stdAge: 0 });
        done();
    });

    it('Validate buildFormatedData - Success', (done) => {

        sandbox.stub(getHelpers, 'treatMainTopics').returns(responseToTreatMainTopics);

        const resp = getHelpers.buildFormatedData([dataToBuilFormatedDate], repo);
        expect(resp).deep.eql({ repoName: 'vue', issues: 2, avgAge: 3, stdAge: 1 });
        done();
    });

    it('Validate buildFormatedData - Fail', (done) => {

        sandbox.stub(getHelpers, 'treatMainTopics').returns({ repoName: undefined, issues: 0, avgAge: 0, stdAge: 0 });
        const resp = getHelpers.buildFormatedData([dataToBuilFormatedDate], repo);
        expect(resp).deep.eql({ repoName: undefined, issues: 0, avgAge: 0, stdAge: 0 });
        done();
    });

    it('Validate generateAvg - Success', (done) => {
        
        const data = [5, 5, 5];
        const resp = getHelpers.generateAvg(data);
        expect(resp).be.eql(5);
        done();
    });

    it('Validate generateAvg - Fail', (done) => {
        
        const data = [5, 5, 5];
        const resp = getHelpers.generateAvg(data);
        expect(resp).not.eql(4);
        done();
    });

    it('Validate generateAmountOfDays - Success', (done) => {
        
        const data = {
            issueCreatedAt: '2020-09-08T16:44:23Z',
            currentDateTime: '2020-09-11T14:41:36Z',
        };
        const resp = getHelpers.generateAmountOfDays(data);
        expect(resp).be.eql(3);
        done();
    });

    it('Validate generateAmountOfDays - Fail', (done) => {
        
        const data = {
            issueCreatedAt: '2020-09-08T16:44:23Z',
            currentDateTime: '2020-09-11T14:41:36Z',
        };
        const resp = getHelpers.generateAmountOfDays(data);
        expect(resp).not.eql(6);
        done();
    });

    it('Validate generateStd - Success', (done) => {
        
        const allIssueTime = [5, 10 , 15, 20, 10];
        const avg = 12;
        const resp = getHelpers.generateStd(allIssueTime, avg);
        expect(resp).be.eql(6);
        done();
    });

    it('Validate generateStd - Fail', (done) => {
        
        const allIssueTime = [5, 10 , 15, 20, 10];
        const avg = 12;
        const resp = getHelpers.generateStd(allIssueTime, avg);
        expect(resp).not.eql(4);
        done();
    });

    it('Validate buildUrlToRequest - Success', (done) => {

        const resp = getHelpers.buildUrlToRequest(repo);
        expect(resp).be.eql('https://api.github.com/repos/vuejs/vue/issues?per_page=100');
        done();
    });

    it('Validate buildUrlToRequest - Fail', (done) => {

        const resp = getHelpers.buildUrlToRequest('facebook');
        expect(resp).be.eql(undefined);
        done();
    });

});

const dataToTreatMainTopics = [
    {
        issueId: 672931456,
        issueTitle: 'fix(compiler): support decode &nbsp; in the value of prop and attribute',
        issueState: 'open',
        issueCreatedAt: '2020-08-04T16:44:23Z',
        issueClosedAT: null,
        currentDateTime: '2021-11-07T21:25:06.431Z'
    },
    {
        issueId: 664554457,
        issueTitle: 'fix: v-model avoid triggering extra input event in firefox',
        issueState: 'open',
        issueCreatedAt: '2020-07-23T15:06:04Z',
        issueClosedAT: null,
        currentDateTime: '2021-11-07T21:25:06.431Z'
    }
];

const repo = 'vue';

const responseToTreatMainTopics = { repoName: 'vue', issues: 2, avgAge: 3, stdAge: 1 };

const dataToBuilFormatedDate = {
    url: 'https://api.github.com/repos/vuejs/vue/issues/11563',
    repository_url: 'https://api.github.com/repos/vuejs/vue',
    labels_url: 'https://api.github.com/repos/vuejs/vue/issues/11563/labels{/name}',
    comments_url: 'https://api.github.com/repos/vuejs/vue/issues/11563/comments',
    events_url: 'https://api.github.com/repos/vuejs/vue/issues/11563/events',
    html_url: 'https://github.com/vuejs/vue/pull/11563',
    id: 672931456,
    node_id: 'MDExOlB1bGxSZXF1ZXN0NDYyODgyMzcz',
    number: 11563,
    title: 'fix(compiler): support decode &nbsp; in the value of prop and attribute',
    user: {
        login: 'JuniorTour',
        id: 14243906,
        node_id: 'MDQ6VXNlcjE0MjQzOTA2',
        avatar_url: 'https://avatars.githubusercontent.com/u/14243906?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/JuniorTour',
        html_url: 'https://github.com/JuniorTour',
        followers_url: 'https://api.github.com/users/JuniorTour/followers',
        following_url: 'https://api.github.com/users/JuniorTour/following{/other_user}',
        gists_url: 'https://api.github.com/users/JuniorTour/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/JuniorTour/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/JuniorTour/subscriptions',
        organizations_url: 'https://api.github.com/users/JuniorTour/orgs',
        repos_url: 'https://api.github.com/users/JuniorTour/repos',
        events_url: 'https://api.github.com/users/JuniorTour/events{/privacy}',
        received_events_url: 'https://api.github.com/users/JuniorTour/received_events',
        type: 'User',
        site_admin: false
    },
    labels: [],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-08-04T16:44:23Z',
    updated_at: '2020-09-21T14:41:36Z',
    closed_at: null,
    author_association: 'NONE',
    active_lock_reason: null,
    pull_request: {
        url: 'https://api.github.com/repos/vuejs/vue/pulls/11563',
        html_url: 'https://github.com/vuejs/vue/pull/11563',
        diff_url: 'https://github.com/vuejs/vue/pull/11563.diff',
        patch_url: 'https://github.com/vuejs/vue/pull/11563.patch'
    },
    body: 'Fix #8895.\r\n' +
        '\r\n' +
        "After this commit, the `&nbsp;` value of attribute and props will be decoded into `' '`, like the other HTML entities.\r\n" +
        '\r\n' +
        '### Demo\r\n' +
        'Before Fix: \r\n' +
        '- https://codepen.io/avertes/pen/LYYpNRe\r\n' +
        '- https://jsfiddle.net/50wL7mdz/756973/\r\n' +
        '\r\n' +
        'After Fix: \r\n' +
        '- attribute value: https://jsfiddle.net/juniortour/nv041crt/\r\n' +
        '- prop value: https://jsfiddle.net/juniortour/tcgv03fa/13/\r\n' +
        '\r\n' +
        '<!--\r\n' +
        'Please make sure to read the Pull Request Guidelines:\r\n' +
        'https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#pull-request-guidelines\r\n' +
        '-->\r\n' +
        '\r\n' +
        '<!-- PULL REQUEST TEMPLATE -->\r\n' +
        '<!-- (Update "[ ]" to "[x]" to check a box) -->\r\n' +
        '\r\n' +
        '**What kind of change does this PR introduce?** (check at least one)\r\n' +
        '\r\n' +
        '- [x] Bugfix\r\n' +
        '- [ ] Feature\r\n' +
        '- [ ] Code style update\r\n' +
        '- [ ] Refactor\r\n' +
        '- [ ] Build-related changes\r\n' +
        '- [ ] Other, please describe:\r\n' +
        '\r\n' +
        '**Does this PR introduce a breaking change?** (check one)\r\n' +
        '\r\n' +
        '- [ ] Yes\r\n' +
        '- [x] No\r\n' +
        '\r\n' +
        'If yes, please describe the impact and migration path for existing applications:\r\n' +
        '\r\n' +
        '**The PR fulfills these requirements:**\r\n' +
        '\r\n' +
        "- [x] It's submitted to the `dev` branch for v2.x (or to a previous version branch), _not_ the `master` branch\r\n" +
        '- [x] When resolving a specific issue, it\'s referenced in the PR\'s title (e.g. `fix #xxx[,#xxx]`, where "xxx" is the issue number)\r\n' +
        '- [x] All tests are passing: https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#development-setup\r\n' +
        '- [x] New/updated tests are included\r\n' +
        '\r\n' +
        "If adding a **new feature**, the PR's description includes:\r\n" +
        "- [ ] A convincing reason for adding this feature (to avoid wasting your time, it's best to open a suggestion issue first and wait for approval before working on it)\r\n" +
        '\r\n' +
        '**Other information:**\r\n',
    reactions: {
        url: 'https://api.github.com/repos/vuejs/vue/issues/11563/reactions',
        total_count: 0,
        '+1': 0,
        '-1': 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0
    },
    timeline_url: 'https://api.github.com/repos/vuejs/vue/issues/11563/timeline',
    performed_via_github_app: null
};

