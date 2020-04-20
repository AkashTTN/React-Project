import React from 'react';
import { connect, useSelector } from 'react-redux';

import Tweet from './Tweet/Tweet';

import classes from './Tweets.module.css';

const Tweets = React.memo((props) => {

    console.log('TWEETS RENDERED', props);

    const fetchedTweets = useSelector((state) => {
        return state.tweets.tweets;
    });

    let tweets = <p>Loading...</p>;

    if(props.error) {
        tweets = <p>Something went wrong</p>
    }

    if(fetchedTweets) {
        tweets = fetchedTweets.slice(0,2).map((tweet) => {
            return (
                <Tweet 
                    key={tweet.username}
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
            <p>Latest Tweets <span><i className="fa fa-twitter" aria-hidden="true"></i></span></p>
            {tweets}
        </div>
    )
})

const mapStateToProps = state => {
    return {
        error: !state.status.tweets
    };
}

export default connect(mapStateToProps)(Tweets);