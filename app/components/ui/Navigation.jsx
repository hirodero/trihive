"use client"
import { useEffect, useState } from "react";
import { FloatingDock } from "./floating-dock"
import { MdOutlineArticle } from "react-icons/md";
import {
  IconHome,
  IconTerminal2,
} from "@tabler/icons-react";
import {ProfileModal} from './profile-modal'
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Scoreboard  from "./scoreboard-modal";
export default function Navigation(){
  const router = useRouter();
  const [user,setUser] = useState({data:[],logged:false,loading:true})
  useEffect(()=>{
    async function checkSession(){
      const result = await fetch('/api/auth/me')
      if(result.statusText!=='No Content'){
        const data = await result.json()
        setUser((prev)=>{
          const clone = {...prev}
          clone.data=data
          clone.logged=true
          clone.loading=false
          return clone
        });
      }
    }
    checkSession()
  },[])

    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="md:h-full md:w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/",
        },
     
        {
          title: "Trivia",
          icon: (
            <IconTerminal2 className="md:h-full md:w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/trivia",
        },
        {
          title: "Article",
          icon: (
            <MdOutlineArticle className="md:h-full md:w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/article",
        },

      ];

    return(
       <div className="flex flex-1 w-full place-content-between pt-8">
          {/* <div  className="flex flex-col pl-4 "> */}
            <div className="flex bg-cover bg-center flex-col px-10 rounded-full">
                <h1 className="md:text-2xl ml-2 mb-0 pb-0 font-mono font-bold text-white shadow-lime-500 drop-shadow-[0_1.2px_1.2px_rgba(0,255,0,0.8)]">
                  Trihive
                </h1>
                <small className="mt-0 pt-0 ml-2 font-semibold text-green-400 font-mono">
                  a Hive for Trivia
                </small>
            </div>
          {/* </div> */}
          <div className="flex absolute w-screen justify-center">
            <ul className="flex flex-row text-green-500 bg-transparent p-1 mb-4 shadow-xl font-semibold rounded-xl outline-double outline-green-500">
                <FloatingDock items={links}/>
                <Scoreboard/>
            </ul>
          </div>
          {
             user.logged?(
              user.loading?(
                <div className="flex justify-center items-center mt-8 mr-8">
                  <Loader2 className="animate-spin mr-10 size-10"/>
                </div>):
                (
                  <div className="pointer-events-auto z-0 h-0 ">
                    <ProfileModal/>
                  </div>)):(
                    <div className="flex z-50 justify-end mt-5 pr-10">
                      <button 
                      onClick={()=>window.location.href = '/api/auth/login'}
                      className="py-2 px-4 rounded-xl cursor-pointer bg-green-600 hover:bg-green-400 text-white font-semibold mr-4 " type="submit">
                        Login
                      </button>
                    </div>)
          }
        </div>
    );
}