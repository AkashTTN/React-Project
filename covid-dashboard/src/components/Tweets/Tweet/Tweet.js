import React from 'react';

import classes from './Tweet.module.css';

import like from '../../../assets/Images/like.png';
import share from '../../../assets/Images/share.png';

const Tweet = props => {

    let {
        username,
        name = '',
        profileImageUrl = '',
        content,
        linkToTweet,
        likes = '',
        shares = '',
        date } = props;

    return (
        <div className={classes.Tweet} >
            <header className={classes.FlexContainer} >
                {/* <img src={profileImageUrl} alt="profile-image" /> */}
                <div className={classes.TweetHeaderContent}>
                    <p className={classes.FontSize12}>{name}</p>
                    <a 
                        href={`https://twitter.com/${username}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={[classes.FontColorGrey, classes.FontSize12].join(' ')} 
                    >
                        {username}
                    </a>
                </div>
            </header>
            <p>{content}</p>
            <footer className={classes.FlexContainer} >
                <span><img src={like} alt="likes-icon" /> {likes}</span>
                <span className={classes.MarginLeft15}><img src={share} alt="shares-icon" /> {shares}</span>
                <p
                    className={[classes.FontColorGrey, classes.FontSize12, classes.MarginBottomZero, classes.MarginLeftAuto].join(' ')}
                >{date}</p>
            </footer>
        </div>
    );
}

export default Tweet;