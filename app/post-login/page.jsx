'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation";
export default function Postlogin(){
    const router = useRouter()
    useEffect(()=>{
        try{
            async function saveUser(){
                const response = await fetch('/api/saveuser',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                if (!response.ok) return;
            }
            saveUser()
            router.push('/')
            
        }catch(e){
            console.log('error submiting')
            return;
        }
    },[])
    return(
      <div id="main-wrapper" className="flex flex-col bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed">
        <div className=" flex-col flex">
          <h2 className="transition duration-200 mt-10 text-white text-center z-10 max-w-7x py-4 px-28 rounded-full border-t-4 border-x-4 border-green-950 ring-8 ring-lime-700 text-xl md:text-5xl font-bold dark:text-neutral-200 font-sans">
            Redirecting...
          </h2>
        </div>
      </div>
    )
}