import React, { useState, useEffect } from 'react';
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



const News = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const history = useHistory();

    useEffect(() => {
        props.onFetchArticles();
    }, [props.onFetchArticles]);

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

    const onClickHandler = () => {
        history.push('/help-links');
    }

    let items = null;
    let slides = null;
    let carousel = null;

    if (props.articles) {
        items = props.articles.slice(0, 3);
        slides = items.map((item, index) => {
            return (
                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={index}
                >
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
                <CarouselIndicators className={classes.Indicators} items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
            </Carousel>
        )
    }

    return (
        <>
            {carousel}
        </>
    );

    // return (
    //     <div className={classes.News}>
    //         <Carousel />

    //         <div className={classes.NewsImage}>
    //         </div>
    //         <div className={classes.NewsData}>
    //             <Button
    //                 btnType="Danger"
    //                 clicked={onButtonClick}
    //             >
    //                 News &amp; Updates
    //             </Button>
    //             <p>Read More <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></p>
    //         </div>
    //     </div>
    // )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(getArticles())
    };
}

const mapStateToProps = (state) => {
    return {
        articles: state.news.articles
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);