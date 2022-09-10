import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
   const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  

const updateNews = async ()=>{
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
  
  setLoading(true)
  let data = await fetch(url)
  let parsedData = await data.json()
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  
}
useEffect(()=>{
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  updateNews()
  // eslint-disable-next-line
}, [])

const handleNextClick = async ()=>{
//   console.log("next button is clicked")
//   if(!this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)){

  
//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9c6ae641d955417bafc8707977de6e65&page=${this.state.page+1}&pageSize=${props.pageSize}`
//   this.setState({loading: true})
//   let data = await fetch(url)
//   let parsedData = await data.json()
  
//   this.setState({
//     articles: parsedData.articles,
//     page: this.state.page + 1,
//     loading: false,
//   })
// }

setPage(page +1)
updateNews()
}
const handlePrevClick = async ()=>{
//   console.log("prev button is clicked")
//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9c6ae641d955417bafc8707977de6e65&page=${this.state.page -1 }&pageSize=${props.pageSize}`
//   this.setState({loading: true})
//   let data = await fetch(url)
//   let parsedData = await data.json()
  
//   this.setState({
//     articles: parsedData.articles,
//     page: this.state.page - 1,
//     loading: false,
//   })

setPage(page -1)
updateNews()
}

const fetchMoreData = async () => {
  
  
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
  setPage(page +1)
  let data = await fetch(url)
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  
}
 
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '70px'}}>News App - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        
        <div className="row">
        {articles.map((element)=>{

        return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem> 
            </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      
        </>
    )
          
  }

  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


export default News
