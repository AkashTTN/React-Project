import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getArticles } from '../../store/actions/index';

import Button from '../UI/Button/Button';

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
} from 'reactstrap';

import classes from './News.module.css';


const News = React.memo((props) => {

    console.log('NEWS MOUNTED');

    // const onFetchArticles = useCallback((props.onFetchArticles), [props.onFetchArticles]);

    // const onFetchArticles = useMemo(() => (props.onFetchArticles), [props.onFetchArticles]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const history = useHistory();

    useEffect(() => {
        // Dispatch an action to fetch new articles after every 1hr
        // If articles are already present/fetched, dont set the interval
        if (props.error) {
            props.onFetchArticles();
            const intervalId = setInterval(function () {
                props.onFetchArticles()
            }, 6000000)

            return () => clearInterval(intervalId);
        }

    }, [props.error]);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const onClickHandler = useCallback(() => {
        history.push('/help-links');
    }, [history]);

    let items = null;
    let slides = null;
    let carousel = null;

    if (props.articles) {
        items = props.articles;
        slides = items.map((item, index) => {
            return (

                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={index}
                >
                    <div style={{ display: "flex" }}>
                        <div className={classes.NewsImage}>
                            <img src={item.urlToImage} alt="article-image" />
                        </div>
                        <div className={classes.NewsData}>
                            <Button
                                btnType="Danger"
                                clicked={onClickHandler}
                            >
                                News &amp; Updates
                        </Button>
                            <p className={classes.NewsDataHeading} >{item.title}</p>
                            <p onClick={onClickHandler}>Read More <span><i className="fa fa-arrow-right" aria-hidden="true"></i></span></p>
                        </div>
                    </div>
                </CarouselItem>


            );
        });

        carousel = (
            <Carousel
                className={classes.News}
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
            </Carousel>
        )
    }

    return (
        <>
            {carousel}
        </>
    );

})

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(getArticles())
    };
}

const mapStateToProps = (state) => {

    if (state.status.articles) {
        return {
            // Only first 3 articles are used for the carousel
            articles: state.news.articles.slice(0, 3),
            error: !state.status.articles
        }
    } else {
        return {
            // Only first 3 articles are used for the carousel
            articles: state.news.articles,
            error: !state.status.articles
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(News);