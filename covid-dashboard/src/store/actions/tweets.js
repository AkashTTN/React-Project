import * as actionTypes from './actionTypes';

const twitterUsers = ['who', 'realDonaldTrump', 'ndmaindia'];

const BASE_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

const RSS_URL = 'https://e1yr-twitfeed-v1.p.rapidapi.com/feed.api';

export const fetchedTweets = tweets => {
    return {
        type: actionTypes.GET_TWEETS,
        tweets
    };
}

// Fetched recent tweets as RSS feeds

export const getTweets = () => {

    return dispatch => {
        let tweets = [],
            promises = [];

        twitterUsers.forEach((user) => {
            promises.push(
                fetch(RSS_URL + `?id=${user}`, {
                    "headers": {
                        "x-rapidapi-host": "e1yr-twitfeed-v1.p.rapidapi.com",
                        "x-rapidapi-key": "44bebfaefcmsh937a5060407e37dp1d4cccjsn91de97bb5004"
                    }
                })
                    .then((res) => res.text())
                    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                    .then((data) => {

                        console.log('RSS Data', data);

                        const item = data.querySelectorAll("item")[0];

                        console.log('Recent Tweet', item);

                        const tweet = {
                            username: user,
                            content: item.querySelector('title').innerHTML,
                            date: new Date(item.querySelector('pubDate').innerHTML).toDateString().split(' ').slice(1, 3).join(' '),
                            linkToTweet: item.querySelector('link').innerHTML
                        };

                        console.log('tweet object', tweet);

                        tweets.push(tweet);

                    })
                    .catch(err => {
                        console.log(`${user}'s data could not be fetched.`);
                    })
            );
        })

        Promise.all(promises)
            .then(() => {
                dispatch(fetchedTweets(tweets));
            })
    }

}

// Method that makes call to twitter API

// export const getTweets = () => {
//     return dispatch => {

//         let tweets = [],
//             promises = [];

//         twitterUsers.forEach((user) => {
//             promises.push(
//                 fetch(BASE_URL + `?screen_name=${user}&count=1`)
//                     .then((res) => res.json()[0])
//                     .then((data) => {

//                         const tweet = {
//                             date: new Date(data['created_at']).toDateString().split(' ').slice(1, 3).join(' '),
//                             content: data['text'],
//                             likes: data['favorite_count'],
//                             shares: data['retweet_count'],
//                             name: data.user['name'],
//                             username: data.user['screen_name'],
//                             profileImageUrl: data.user['profile_image_url_https'],
//                             defaultProfileImage: data.user['default_profile_image']
//                         }

//                         console.log('Tweet', tweet);

//                         tweets.push(tweet);
//                     })
//                     .catch(err => {
//                         console.log(`${user}'s data could not be fetched.`);
//                     })
//             );
//         })

//         Promise.all(...promises)
//             .then(() => {
//                 dispatch(fetchedTweets(tweets));
//             })

//     }
// }