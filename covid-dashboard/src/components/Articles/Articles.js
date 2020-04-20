import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Article from './Article/Article';

import { getArticles } from '../../store/actions/index';

import classes from './Articles.module.css';

const Articles = props => {
    
    const fetchedArticles = props.articles;

    useEffect(() => {
        // Dispatch an action to fetch new hostorical data after every 1hr
        // If articles are already present/fetched, dont set the interval
        if (props.error) {
            props.onFetchArticles();
            const intervalId = setInterval(function () {
                props.onFetchArticles()
            }, 6000000)

            return () => clearInterval(intervalId);
        }

    }, [props.error]);

    let articles = <p>Loading...</p>;

    if (props.error) {
        articles = <p>Something went wrong</p>
    } else {
        if (fetchedArticles) {
            articles = fetchedArticles.map((article, index) => {

                let {
                    title,
                    description,
                    publishedAt,
                    url
                } = article;

                return (
                    <Article
                        key={index}
                        title={title}
                        description={description}
                        url={url}
                        date={new Date(publishedAt).toDateString()}
                    />
                );
            })
        }
    }

    return (
        <div className={classes.Articles}>
            <p>Articles</p>
            {articles}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        articles: state.news.articles,
        error: !state.status.articles
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(getArticles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);