"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import  Modal  from "./modal";
export default function Scoreboard(){
    const [user,setUser] = useState([])
    const [modal,setModal] = useState(false)
    const [personal, setPersonal] = useState([])
    const [players, setPlayers] = useState([])
    const [loading,isLoading] = useState(true)
    useEffect(()=>{
        async function checkSession(){
            const response = await fetch('/api/auth/me')
            if (response.statusText!=='No Content'){
                const data = await response.json()
                setUser(data);
            }
        }
        checkSession()
    },[])
    useEffect(()=>{    
        async function getProfiles(){
            const response = await fetch('/api/user',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify({
                    Request:'Score'
                })
            })
            if (response.ok){
                const data = await response.json()
                setPlayers(data.posts)
                setPersonal(prev=>{
                    const clone = data.posts.filter(datas=>{
                        return datas.UserID===user?.sub
                    })
                    return clone    
                    }
                )
                isLoading(false)
            }
        }
        getProfiles()
    },[modal])
    const content=(
        <>
            <div className="p-8 space-y-7 w-full max-h-90 overflow-auto scrollbar-hide bg-green-900 rounded-t-2xl">
                {
                    !loading?(players.map((items,index)=>{
                        return(
                            <div key={index} className="flex items-center space-x-6 w-full py-1 bg-green-700 border-4 border-lime-400 rounded-full">
                                <span className="text-white flex text-xl pl-3 font-bold">
                                        {index+1}.
                                    </span>
                                <div className="w-15 h-15 flex items-center justify-center">
                                    <img src={items?.UserPicture} alt="" className="object-contain rounded-full scale-175 border-lime-400 border-4" />                            
                                </div>
                                <div className="text-white flex pr-5 gap-2 text-xl w-full font-bold">
                                    
                                    <span className="">
                                        {items?.Username}
                                    </span>
                                    
                                    <span className="ml-auto">
                                        {items?.UserScore} pts
                                    </span>
                                </div>
                            </div>
                        )
                    })):(
                        <Loader2 className="animate-spin"/>
                    )
                }
                
            </div>
            <div className="flex flex-1 w-full items-center px-5 rounded-b-2xl bg-green-950 " >
                <div className="w-15 h-15">
                    <img src={personal[0]?.UserPicture ?? '/assets/defaultProfile.png'} alt="" className="object-contain rounded-full translate-x-2 scale-150 border-lime-400 border-4" />                            
                </div>
                <div className="flex flex-row w-full py-5 px-6 ml-auto text-white pl-7 text-xl font-bold rounded-e-full items-center bg-neutral-950">
                    <div className="">
                        <span className="">
                            You: {personal[0]?.Username ?? 'Guest'} 
                        </span>
                    </div>
                    <div className="ml-auto">
                        <span className="ml-auto">
                             {personal[0]?.UserScore ?? 0} pts
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
    return(
        <div className="flex justify-center items-center">
            <button 
            onClick={()=>setModal(true)}
            className="rounded-full md:px-6 md:py-2 md:text-lg sm: text-xs py-0.5 ring-2  hover:bg-white hover:drop-shadow-2xl hover:ring-4 hover:font-bold hover:ring-lime-500 hover:text-green-900 transition duration-100 cursor-pointer ring-lime-200 bg-green-950 text-white">
                Scoreboard
            </button>
            <Modal toggle={()=>setModal(false)} modal={modal} content={content}/>
        </div>
    )
}