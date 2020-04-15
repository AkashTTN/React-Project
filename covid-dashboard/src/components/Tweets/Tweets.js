import React from 'react';
import { connect, useSelector } from 'react-redux';
import classes from './Tweets.module.css';
import Tweet from './Tweet/Tweet';

const Tweets = () => {

    const fetchedTweets = useSelector((state) => {
        return state.tweets.tweets;
    });

    let tweets = <p>Loading...</p>;

    if(fetchedTweets) {
        tweets = fetchedTweets.map((tweet) => {
            return (
                <Tweet 
                    username={tweet.username}
                    content={tweet.content}
                    date={tweet.date}
                    linkToTweet={tweet.linkToTweet}
                />
            );
        })
    }

    return (
        <div className={classes.Tweets}>
            <p>Latest Tweets <span><i class="fa fa-twitter" aria-hidden="true"></i></span></p>
            {tweets}
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         tweets: state.tweets.tweets
//     };
// }

export default Tweets;