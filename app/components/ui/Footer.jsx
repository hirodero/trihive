'use client'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Feedback } from './feedback-modal'
import { useEffect, useState } from "react";
export default function Footer(){
    const [user,setUser] = useState({data:[],logged:false,loading:true})
    useEffect(()=>{
        async function getUser(){
            const response = await fetch('api/auth/me')
            if(response.statusText!=='No Content'){
                const data = await response.json()
                setUser((prev)=>{
                    const clone = {...prev}
                    clone.data=data
                    clone.logged=true
                    clone.loading=false
                    return clone
                })
            }
        }
        getUser();
    },[])
    return(
        <>
        <div className="flex flex-row bg-green w-full min-h-10 bg-green-900 gap-4 pr-8 pt-10 pb-10">
            <div className="flex flex-col w-full">
                <div className="flex flex-col ml-16 pt-10 text-white font-semibold rounded-xl">
                    <p className="text-white font-mono font-bold text-2xl">Ready for your</p>
                    <p className="text-lime-300 font-mono font-bold text-6xl">Next game?</p>
            
                    <div className="flex flex-row gap-2 justify-end mr-10 space-x-5">
                        {
                            user.data?.sub&&<Feedback/>
                        }
                        <form action="/">
                            <button className="" type="submit">
                                <FaLinkedin className="size-10"/>
                             </button>
                        </form>
                        <form action="/">
                            <button className="" type="submit">
                                <FaXTwitter className="size-10"/>
                            </button>
                        </form>
                    </div>
                    
                </div>
                <div className="flex flex-row">
                    <small className="ml-20 text-white font-semibold text-xl">www.trihive.com</small>
                    <hr className="w-full mt-auto font-bold"/>
                </div>
            </div>
    
        </div>
        </>
    );
}