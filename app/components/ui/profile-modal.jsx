"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { GrScorecard } from "react-icons/gr";
import { Loader2 } from "lucide-react";
import  Modal  from "./modal";
export function ProfileModal() {
    const [user,setUser]=useState([])
    const [hover,setHover] = useState(false) 
    const [imgHover,setImg] = useState(false)
    const [modal, activateModal] = useState(false)    
    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState([])
  useEffect(()=>{
    async function getSession(){
        const response = await fetch('/api/auth/me')
        if(response!=='No Content'){
            const data = await response.json()
            setUser(data)
        }
    }
    getSession()
  },[])

      useEffect(()=>{
        async function getProfile(){
            const response = await fetch('/api/user',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify({
                    Request:'Score'
                })
            })
            if (response.statusText!=='No Content'){
                const data = await response.json();
                setProfile(()=>{
                    const clone = data.posts.filter(items=>{ 
                        return items.UserID===user?.sub
                    })
                return clone
                })
                setLoading(false)
            }
        }
        getProfile()
    },[user])
    
    const toggleModal = () => {
        setHover(false)
        activateModal(prev=>{
            prev = !prev
           
            return prev
        });
        if(!modal){
            fetch('/api/user',{
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    UserID:user?.sub
                })
            })
              .then(res => res.json())
              .then(res => setProfile(res.posts))
              .finally(() => setLoading(false));
        }
      };
      const content = () => (
        <> 
            <div className="flex flex-col mb-2">
                <img src={profile[0]?.UserPicture} referrerPolicy="no-referrer" className="rounded-full md:size-44 border-8 border-green-300" alt="Profile" />
            </div>
            <div className="flex justify-center">
                <span className="font-semibold text-2xl text-white mt-2">{profile[0]?.Username}</span>
            </div>
            <div className="flex w-full bg-emerald-900 text-white flex-col font-semibold font-sans self-start mt-4 rounded-xl border-4 pl-2 pt-5 p-10">
                <div className="flex w-full bg-green-900 text-white font-semibold font-sans self-start mt-4 rounded-xl border-4 p-2">
                    <SiGmail className="size-9" />
                    <span className="mt-1 ml-4 text-xl">
                        {profile[0]?.Email}
                    </span>
                </div>
                <div className="flex w-full bg-green-900 text-white font-semibold font-sans self-start mt-4 rounded-xl border-4 p-2">
                    <GrScorecard className="size-9"/>
                    <span className="mt-1 ml-4 text-xl">
                        { `${profile[0]?.UserScore} pts`}
                    </span>
                </div>
                
            </div>
            <div className="flex w-full pt-2 justify-center">
                <form action="/api/auth/logout">   
                    <button className="py-2 px-4 rounded-xl bg-red-600 hover:bg-green-400 text-white font-semibold mr-4 ml-auto" type="submit">
                        Logout
                    </button> 
                </form>
            </div>
          
        </>
      )
    return (
        <div className="flex w-90 flex-row items-center justify-center">
            {isLoading?(
                <Loader2 className="ml-auto mr-10 p-3 bg-yellow-50 text-white animate-spin"/>
            ):(
                <>
                <motion.div onClick={toggleModal} whileHover={{scale:1.05, translateX:-10,translateY:5}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} 
                className="flex">
                    <div className="flex flex-1 cursor-pointer justify-center items-center">
                        <motion.span initial={{ backgroundColor:'#66ff00'}} animate={hover?{translateX:10,zIndex:0,backgroundColor:'#7fff00', boxShadow:'0 0 0 3px #ceff00'}:{translateX:0,backgroundColor:'#648c11'}} transition={{duration:0.1, delay:0.3}} 
                        className="text-end translate-x-14 py-2 md:pl-4 pr-14 md:text-lg text-xs text-white font-semibold rounded-l-lg">
                         {profile[0]?.Username ?? "Guest"}
                        </motion.span>
                    </div>
                    <motion.div  whileHover={{rotate: 360,transition: {duration: 10, repeat:Infinity,ease: "linear" },}} 
                    className="cursor-pointer w-40 items-center h-28 md:px-6 text-white flex justify-center z-20 group/modal-btn ">
                        <motion.img 
                        animate={imgHover?{boxShadow:'0 0 0 7px #ceff00'}:{boxShadow:'0 0 0 3px #ceff00'}}
                        onMouseEnter={()=>setImg(true)}
                        onMouseLeave={()=>setImg(false)}
                        src={profile?profile[0]?.UserPicture:'/assets/defaultProfile.png'} 
                        className="rounded-full border-8 object-contain bg-white w-full h-full border-green-400 hover:border-teal-800 hover:border-b-teal-400 hover:border-t-teal-400 transition border-b-teal-500 border-t-teal-500 duration-200" alt='Loading..' />
                    </motion.div>
                </motion.div> 
                <Modal modal={modal} toggle={toggleModal} content={content()}/>
                </>
                )}            
        </div>
    );
}
