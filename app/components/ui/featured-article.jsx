"use client"
import { useEffect, useState } from "react";
import {Card, Carousel} from './apple-cards-carousel'
export default function FeaturedArticle({category}){
    const [loading,setLoader] = useState(true)
    const [article, setArticle] = useState([]);
    useEffect(()=>{
        fetch('/api/article',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            request:'article',
            category:category
          })
        }).
        then(res=>res.json()).
        then(res=>{
          setArticle(res.article)
          console.log('in data',res.article)
        }
      ).
        finally(setLoader(false))
      },[])
      
    const cards = article?.map((card, index) =>  (
        <Card key={index} card={card} index={index} />
      ));
    return(
        <Carousel items={cards} />
    )
}