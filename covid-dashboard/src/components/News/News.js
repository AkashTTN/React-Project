// import React, {useState} from 'react';
// import { connect } from 'react-redux';

// import Button from '../UI/Button/Button';

// import classes from './News.module.css';

// import {
//     Carousel,
//     CarouselItem,
//     CarouselControl,
//     CarouselIndicators,
//     CarouselCaption
// } from 'reactstrap';


// const News = (props) => {

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [animating, setAnimating] = useState(false);

//     const next = () => {
//         if (animating) return;
//         const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//         setActiveIndex(nextIndex);
//     }

//     const previous = () => {
//         if (animating) return;
//         const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//         setActiveIndex(nextIndex);
//     }

//     const goToIndex = (newIndex) => {
//         if (animating) return;
//         setActiveIndex(newIndex);
//     }

//     const slides = items.map((item) => {
//         return (
//             <CarouselItem
//                 onExiting={() => setAnimating(true)}
//                 onExited={() => setAnimating(false)}
//                 key={item.src}
//             >
//                 <img src={item.src} alt={item.altText} />
//                 <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
//             </CarouselItem>
//         );
//     });

//     onButtonClick = () => {
//         props.history.push('/help-links');
//     }

//     return (
//         <Carousel
//             className={classes.News}
//             activeIndex={activeIndex}
//             next={next}
//             previous={previous}
//         >
//             <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
//             {slides}
//             <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
//             <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
//         </Carousel>
//     );

//     // return (
//     //     <div className={classes.News}>
//     //         <Carousel />

//     //         <div className={classes.NewsImage}>
//     //         </div>
//     //         <div className={classes.NewsData}>
//     //             <Button
//     //                 btnType="Danger"
//     //                 clicked={onButtonClick}
//     //             >
//     //                 News &amp; Updates
//     //             </Button>
//     //             <p>Read More <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></p>
//     //         </div>
//     //     </div>
//     // )
// }

// const mapStateToProps = (state) => {
//     return {
//         news: state.news
//     };
// }

// export default connect(mapStateToProps)(News);