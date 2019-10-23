import request from 'request';
import _ from 'lodash';

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
            // count: 5
        };
        request.post({ url: 'https://getpocket.com/v3/get', qs: params }, (error, response, body) => {
            const pocket_data = JSON.parse(body)['list'];
            const all_tag = _.flatMap(pocket_data, (value, key) => {
                return _.keys(value.tags)
            });
            callback(_.uniq(all_tag))
        });
    }

    getArticles() {
    }
}

export default PocketFilter;
