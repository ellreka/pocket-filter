import request from 'request';

const getArticles = (consumer_key: string, access_token: string, params: {}, callback: (body: {}) => void) => {
    const options: { headers: {}; body: string; url: string } = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-Accept': 'application/json',
        },
        body: `consumer_key=${consumer_key}&access_token=${access_token}&detailType=complete&count=2`,
        url: 'https://getpocket.com/v3/get',
    };

    request.post(options, (error, response, body) => {
        const pocket_data = JSON.parse(body)['list'];
        const pocket_arr = Object.entries(pocket_data).map((val: any) => {
            return {
                item_id: val[1]['item_id'],
                title: val[1]['resolved_title'],
                url: val[1]['resolved_url'],
                tags: Object.keys(val[1]['tags'] || { _untagged_: undefined }),
                image: val[1]['image'] || { image: undefined },
                time_added: val[1]['time_added'],
                favorite: val[1]['favorite'],
                status: val[1]['status'],
            };
        });
        callback(pocket_arr);
    });
};

const pocketfilter = {
    getArticles: getArticles,
};

module.exports = pocketfilter;
