"use client"
import { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from './bento-grid'
import { useAdmin } from '../../context/AdminContext'
export default function OtherArticle({category}){
    const {isAdmin} = useAdmin()
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
        then(res=>setArticle(res.article)).
        finally(setLoader(false))
      },[])
    return(
        <BentoGrid className="max-w-screen min-w-full mx-auto p-20 gap-y-20">
            {article?.map((item, i) => (
            <BentoGridItem
                key={i}
                identifier={item.ArticleID} 
                title={item.ArticleTitle}
                description={item.ArticleDescription}
                header={item.ArticleImage}   
                navigation={item.id}
                navigationType={'Artikel'}
                enableDelete={isAdmin}
                className={"col-span-1 min-h-100 scrollbar-hide overflow-auto"}/>
            ))}
            
        </BentoGrid>
    )
}