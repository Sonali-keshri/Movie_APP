import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchFromAPI } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";


const SearchResults = () => {

  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchIntialData = () => {
    setLoading(true)
    fetchFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev => prev + 1))
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res?.results] })
      } else {
        setData(res)
      }
      setPageNum((prev => prev + 1))
    })
  }
  useEffect(() => {
    fetchIntialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading ? (<Spinner initial={true} />) : (
        <ContentWrapper>
          {data?.results.length >= 0 ?(
            <>
            <div className="pageTitle">
              {`Search ${data.total_results > 1 ? "results":"result"} of '${query}'`}
            </div>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}
            >
              {data.results.map((item, indx)=>{
                if(item.media_type === "person") return;
                return(
                  <MovieCard key={indx} data={item} fromSearch={true}/>
                )
              })}
            </InfiniteScroll>
            </>
          ):
          (
            <span className="resultNotFound">
              Sorry, Results not founds
            </span>
          )}
        </ContentWrapper>
      )}

    </div>
  )
}

export default SearchResults