import React,{useState,useEffect} from 'react'
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style'
function App() {
  const alankey='e35b67979f1fcc9218bd7c515a1333662e956eca572e1d8b807a3e2338fdd0dc/stage'
  const [newsArticles,setNewsArticles]=useState([])
  const classes=useStyles()
  useEffect(()=>{
    alanBtn({
      key:alankey,
      onCommand:({command,articles})=>{
        if(command==='newHeadlines'){
          setNewsArticles(articles)
        }
      }
    })
  },[])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6NbsdCCCklEM49qTSoAuOcRwgTQ3YFPwabYp6J8wG&s" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles}></NewsCards>
    </div>
  );
}

export default App;
