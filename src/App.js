import React,{useState,useEffect} from 'react'
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style'
import wordsToNumbers from 'word-to-numbers'
function App() {
  const alankey='e35b67979f1fcc9218bd7c515a1333662e956eca572e1d8b807a3e2338fdd0dc/stage'
  const [newsArticles,setNewsArticles]=useState([])
  const [activeArticle,setActiveArticle]=useState(-1)
  const classes=useStyles()
  useEffect(()=>{
    alanBtn({
      key:alankey,
      onCommand:({command,articles,number})=>{
        if(command==='newHeadlines'){
          setNewsArticles(articles)
          setActiveArticle(-1)
        }else if (command==='highlight'){
          setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
        }else if (command==='open'){
          const parsedNumber=number.length>2?wordsToNumbers(number,{fuzzy:true}): number;
          const selectedArtilce=articles[parsedNumber-1]
          if(parsedNumber>20){
            alanBtn().playText('Please try that again.')
          }
          if(selectedArtilce){
          window.open(selectedArtilce?.url,'_blank')
          }
        }
      }
    })
  },[])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6NbsdCCCklEM49qTSoAuOcRwgTQ3YFPwabYp6J8wG&s" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}></NewsCards>
    </div>
  );
}

export default App;
