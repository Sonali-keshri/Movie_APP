import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";

import "./style.scss";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endPoint, title }) => {

    const carouselContatiner = useRef();
    const url = useSelector((state) => state.home.url)
    console.log("url", url)
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContatiner.current;

        const scrollAmount = dir == "left" ? container.scrollLeft - (container.offsetWidth + 20) :
            container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textblock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }

    return (
        <div className="carousel ">
            <ContentWrapper>
                {title && data && <div className="carouselTitle">{title}</div>}
               
                    <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                    <BsFillArrowRightCircleFill className="carouselRighttNav arrow " onClick={() => navigation("right")} />
              
                {!loading ?

                    (<div className="carouselItems" ref={carouselContatiner}>
                        {data && data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return (
                                <div className="carouselItem"
                                    onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                                    key={item.id}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.releasedate).format("MM d, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}

            </ContentWrapper>
        </div>
    )
}

export default Carousel