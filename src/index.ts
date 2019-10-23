import request from 'request';

class PocketFilter {
    consumerKey: string;
    accessToken: string;

    constructor(consumerKey: string, accessToken: string) {
        this.consumerKey = consumerKey;
        this.accessToken = accessToken;
    }

    getAllTags(callback: (body: {}) => void) {
        const params = {
            consumer_key: this.consumerKey,
            access_token: this.accessToken,
            detailType: 'complete',
        };
        request.post({ url: 'https://getpocket.com/v3/get', qs: params }, (error, response, body) => {
            const pocket_data = JSON.parse(body)['list'];
            const all_tag = Object.keys(pocket_data).flatMap(value => {
                return pocket_data[value].tags ? Object.keys(pocket_data[value].tags) : undefined;
            });
            const tags_list = Array.from(new Set(all_tag)).filter(Boolean);
            callback(tags_list);
        });
    }

    getArticles() {
        // request.post()
    }
}

export default PocketFilter;
