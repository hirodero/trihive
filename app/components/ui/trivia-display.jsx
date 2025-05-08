'use client'
import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
export default function TriviaDisplay(){
    const [article,setArticle] = useState({Sosiologi:[],Biologi:[],Geografi:[]})
    useEffect(()=>{
        async function getData(){
            const response = await fetch('/api/article',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    request : 'trivia'
                })
            })
            if(response.ok){
                const data = await response.json();
                setArticle(prev=>{
                    const clone = {...prev}
                    clone.Sosiologi = data.article.filter(data=>data.ArticleCategory==='Sosiologi')
                    clone.Biologi = data.article.filter(data=>data.ArticleCategory==='Biologi')
                    clone.Geografi = data.article.filter(data=>data.ArticleCategory==='Geografi')
                    return clone;
                })
            }
        }
        getData()
    },[])
    return(
            <div className= 'flex flex-col items-center justify-center w-full px-20 '> 
                {['Sosiologi','Biologi','Geografi'].map((category,index)=>{
                    return(
                    <div key={category} className=" w-full items-center m-4 rounded-2xl gap-y-2 bg pb-6">                    
                        <h2 className="text-5xl shadow-2xl self-end font-bold contrast-125 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-2 border-white text-white py-4 rounded-e-full pl-44 text-end pr-40 -translate-x-24 w-full font-sans">
                            {category}
                        </h2>
                        <div className="flex items-center rounded-xl">
                            <BentoGrid className="max-w-screen min-w-full mx-auto p-10 gap-y-20">
                            {article[category].map((item, i) => (
                                    <BentoGridItem
                                    key={i}
                                    title={item.ArticleTitle}
                                    description={item.ArticleDescription}
                                    header={item.ArticleImage}
                                    navigationType={'trivia'}
                                    navigation={item.ArticleID}
                                    className={"col-span-1 min-h-100 scrollbar-hide overflow-auto"}/>
                                ))}
                            </BentoGrid>
                        </div>  
                    </div>
                )})}                     
            </div>
    )
}