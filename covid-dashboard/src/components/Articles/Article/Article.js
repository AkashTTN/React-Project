import React from 'react';

import classes from './Article.module.css';

const Article = props => {
    return (
        <div className={classes.Article}>
            <div className={classes.ArticleBody}>
                <p>{props.title}</p>
                <p>PUBLISHED <span>{props.date}</span></p>
                {props.description}
                <a className={classes.ArticleUrl} href={props.url}>Read More</a>
            </div>
        </div>
    )
}

export default Article;