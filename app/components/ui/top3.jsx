"use client"
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from './animated-testimonials'
import { Loader2 } from "lucide-react";
export default function Top3(){
    const [loading,setLoader] = useState(true)
    const [user, setUser] = useState([]);
    useEffect(()=>{
        fetch('/api/user',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Request:'Top3'
            })
        }).
        then(res=>res.json()).
        then(res=>setUser(res.posts)).
        finally(setLoader(false))
      },[])
    return(
        <>
        {
            !loading?
            <AnimatedTestimonials testimonials={user}/>:<Loader2/>
        }
        </>
    )
}