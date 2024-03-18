import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getNews} from '../slices/newsSlice'

function Home() {
  const {newsArray,newsSuccess}=useSelector(state=>state.news);
  const dispatch=useDispatch();
  let articles=[];
  useEffect(()=>{
    dispatch(getNews({id:'india'}));
  },[])
  if(newsSuccess===true){
    articles=newsArray;
  }
  console.log(articles);
  return (
    <div>
        <div id="home-section" className="container">
          {
             (articles.length===0) ? 
             <>
            <h2>No Articles to read. To get Latest News please reload</h2>
             </> :
             <>
              {
                articles.map((data,index)=><div className='cards' key={index}>
                  

                </div>)
              }
             </>
          }
        </div>
    </div>
  )
}

export default Home
