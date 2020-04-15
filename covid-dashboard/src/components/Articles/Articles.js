import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Article from './Article/Article';

import { getArticles } from '../../store/actions/index';

import classes from './Articles.module.css';

const Articles = props => {

    const [fetchedArticles, setFetchedArticles] = useState(props.articles);
    console.log(fetchedArticles);
    useEffect(() => {
        setFetchedArticles(props.articles);
    }, [props.articles]);

    useEffect(() => {
        // Dispatch an action to fetch new hostorical data after every 1hr
        // console.log('useEffect ran');
        props.onFetchArticles();
        const intervalId = setInterval(function () {
            console.log('setting interval');
            props.onFetchArticles()
        }, 6000000)

        return () => clearInterval(intervalId);

    }, [props.onFetchArticles]);

    let articles = <p>Loading...</p>;

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
                    date={publishedAt}
                />
            );
        })
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
        articles: state.news.articles
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(getArticles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);