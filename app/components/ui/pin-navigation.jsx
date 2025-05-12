'use client'
import { motion } from "framer-motion";
import { useState } from "react";
import { PinContainer } from "./3d-pin";
export default function Pin(){
    const [bgEffect, setBg] = useState({Sosiologi:false,Biologi:false,Geografi:false})
    const textbase = `Mari belajar tentang`
    const attributes=[
        {
            title:'Sosiologi',
            image:"/assets/sosiologi.png",
            href: "/article/stream/Sosiologi",
            text: `${textbase} sosiologi.`
        },{
            title:'Biologi',
            image: '/assets/biologi.png',
            href: "/article/stream/Biologi",
            text: `${textbase} biologi.`
        },{
            title:'Geografi',
            image:"/assets/geografi.png",
            href:"/article/stream/Geografi",
            text: `${textbase} Geografi.`
        }
    ]
    return(
    <div className=" mt-20 pt-32 pb-40  flex flex-1 flex-col justify-center items-center ">
        <div className="absolute flex flex-row justify-center items-center gap-4">
            {
                attributes?.map((item, index)=>(
                    <PinContainer 
                    key={index}
                    title={item.title}
                    href={item.href}>
                        <motion.div 
                        onHoverStart={()=>setBg(prev=>({...prev,[item.title]:true}))} 
                        onHoverEnd={()=>setBg(prev=>({...prev,[item.title]:false}))} 
                        className="flex flex-col p-4 tracking-tight text-white sm:basis-1/2 w-[20rem] h-[20rem] rounded-xl bg-transparent ">
                            <motion.h3 animate={bgEffect[item.title]?{color:'#004225'}:{color:'#ffffff'}} 
                            className="max-w-xs  !m-0 font-bold  text-xl  flex justify-center">
                                {item.title}
                            </motion.h3>
                            <div className="text-base !m-0 !p-0 font-normal flex justify-center ">
                            </div>
                            <motion.div  
                            animate={!bgEffect[item.title]?{scale:1,rotate:0}:{scale:[0.8,1.2] ,rotate:360}} 
                            transition={!bgEffect?{rotate:{duration:0.3,ease:'easeOut'}}:{rotate:{duration:0.7,ease:'linear'}}} 
                            className="flex flex-1 max-h-full justify-center  items-center ">
                                <motion.img            
                                    animate={
                                        bgEffect[item.title]?
                                        {scale:1.4,
                                        rotate:360, 
                                        translateY:70, 
                                        boxShadow:'0 0 0 4 black'}:
                                        {transition:
                                            {duration:0.3, 
                                            ease:'linear'}, 
                                        rotate:0,
                                        scale:1,
                                        translateY:0}}
                                    
                                    transition={
                                        bgEffect[item.title]?
                                        { rotate: 
                                            {duration:0.6,
                                            repeat:Infinity,
                                            ease:'linear'},
                                            duration:1.1}:
                                        {rotate:
                                            {duration: 8, 
                                            ease: "linear"}}} 
                                    className="object-contian object-center size-full w-52 h-52 rounded-full" 
                                    src={!bgEffect[item.title]?item.image:'/assets/portal.png'} alt="" />
                            </motion.div>
                        </motion.div>
                    </PinContainer>
                ))
            }
        </div>
    </div>    
    )
}