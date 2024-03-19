import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import Loading from './Loading'
import {getNews} from '../slices/newsSlice'
import { IoIosArrowForward } from "react-icons/io";
import { clearLoginStatus, userReload } from '../slices/userSlice'

function Home() {
  const {newsArray,newsSuccess,newsLoading}=useSelector(state=>state.news);
  const {userSuccess}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  let articles=[];
  useEffect(()=>{
    dispatch(getNews({id:'india'}));
    dispatch(userReload());
    if(userSuccess===false){
      localStorage.clear();
      dispatch(clearLoginStatus());
    }
  },[])
  if(newsSuccess===true){
    articles=newsArray;
  }
  return (
    <div id='outer-home'>
      <Header/>
      { (newsLoading===true) && <Loading/>}
      { (newsSuccess===true) && 
        <div id="home-section" className="container">
          
          {
             (articles.length===0) ? 
             <>
            <h2>No Articles to read. To get Latest News please reload</h2>
             </> :
             <>
              {
                articles.map((data,index)=><div className='cards' key={index}>
                  <div className="cards-image">
                    <img src={data.urlToImage} alt="news" />
                  </div>
                  <div className="cards-body">
                    <h5>{data.title}</h5>
                    <p>{data.description}</p>
                    <div className="cards-footer">
                      <Link className='text-decoration-none' to={data.url} target='_blank'>More Info <IoIosArrowForward /></Link>
                      <p>{data.publishedAt}</p>
                    </div>
                  </div>
                </div>)
              }
             </>
          }
        </div>
}
    </div>
  )
}

export default Home
