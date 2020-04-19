import React from 'react';

import classes from './Article.module.css';

const Article = props => {

    let { description } = props;

    if(description) {
        // Strip text of any html tags
        description = description.replace(/(<([^>]+)>)/ig,"");
    } else {
        description = 'Description not available.';
    }

    return (
        <div className={classes.Article}>
            <div className={classes.ArticleBody}>
                <p>{props.title}</p>
                <p>PUBLISHED <span>{props.date}</span></p>
                <p>{description}</p>
                <a className={classes.ArticleUrl} href={props.url}>Read More</a>
            </div>
        </div>
    )
}

export default Article;