'use client'
import { motion } from "framer-motion";
import Pin from "./pin-navigation";
export default function Heading({title,text,subtext}){
    return(
        <>
            <div id="heading-wrapper" className="flex-col  rounded-2xl w-full p-10 pt-2 font-semibold text-3xl text-white mt-32 flex flex-1">
              <div className="flex flex-col pointer-events-auto p-40 py-30 rounded-full contrast-125 bg-[url('https://images.unsplash.com/photo-1593781243220-51578354c57d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center bg-fixed shadow-2xl drop-shadow-2xl drop-shadow-green-900 shadow-lime-400">
                <div className="flex flex-row justify-end">
                  <motion.h1 
                  initial={{ x:1 , opacity: 0 }}
                  animate={{ x: 0, opacity: 1 ,width:'100vw' }}
                  transition={{ duration: 0.8,delay:1, ease: "easeInOut"}} className="text-7xl  overflow-hidden  text-white  font-bold ">
                    {title}
                  </motion.h1>
                </div>
                <motion.p 
                initial={{ x:1 , opacity: 0 }}
                animate={{ x: 0, opacity: 1  }}
                transition={{ duration: 0.8,delay:0.9, ease: "easeInOut"}} className="my-10 break-all font-mono text-lime-400 drop-shadow-xl drop-shadow-green-800 ml-3">
                  {text}
                  <br />
                  {subtext}
                </motion.p>
              </div>
            </div>
            <div className="pb-8 border-b-8 shadow-2xl  shadow-green-500 contrast-125 border-b-neutral-400 rounded-full bg-[url('https://images.unsplash.com/photo-1634588120039-3a9c277449c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxncmVlbiUyMHBsYXNtYXxlbnwwfHwwfHx8MA%3D%3D')] bg-fixed bg-cover bg-left  flex flex-1 flex-col"> 
              <h2 className="text-5xl shadow-2xl self-end font-bold contrast-125 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-2 border-white text-white py-4 rounded-e-full pl-44 text-end pr-40 -ml-20 w-full font-sans">
                Streamlines
              </h2>
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{opacity: 1  }}
              transition={{ duration: 0.8,delay:0.8, ease: "easeInOut"}} 
              className="w-full h-full shadow-2xl  shadow-green-600 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-b-8 border-neutral-950 ring ring-lime-300 rounded-tl-4xl rounded-bl-full rounded-tr-full pb-20">
                <Pin/>
              </motion.div>
            </div>                    
        </>
    )
}