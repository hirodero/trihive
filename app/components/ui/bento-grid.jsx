
'use client'
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  identifier,
  title,
  description,
  header,
  navigation,
  navigationType,
  enableDelete
}) => {
  const router= useRouter()
  const [loading, isLoading] = useState(false) 
  const [modal,setModal] = useState(false)
  function confirmDelete(){
    setModal(true)
  }
  async function deletion(){
    const toastId = toast.loading('Mohon tunggu...')
    isLoading(true)
    if(navigationType==='Artikel'){
      const response = await fetch('/api/deleteArticle',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          articleID:identifier
        })
      })
      // toast.success('Artikel berhasil dihapus')
      window.location.reload();
    }
    if (navigationType==='Trivia'){
      const response = await fetch('/api/deleteTrivia',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          articleID:identifier
        })
      })
      // toast.success('Trivia berhasil dihapus')
      window.location.reload();
    }
    toast.success(`${navigationType} berhasil dihapus`,{id:toastId})
    window.location.reload();
  }
  const navigate=(navigation,navigationType)=>{
    if(navigationType==='Artikel'){
      router.push(`/article/detail/${navigation}`)
    }else if(navigationType==='Trivia'){
      router.push(`/trivia/games/${navigation}`)
    }
  }
  return (
    (
      <div className={cn(
        "row-span-1 p-2 rounded-xl drop-shadow-xs drop-shadow-green-200 shadow-xs shadow-green-600   shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-neutral-900 border border-neutral-800  flex flex-col ",
        className
      )}>
        {enableDelete&&(
          <div className="">
              <MdDeleteForever 
              onClick={confirmDelete}
              className="hover:text-white cursor-pointer text-3xl text-red-900 "/>
          </div>
        )}
        <div
    onClick={()=>navigate(navigation,navigationType)}
    className="p-2 hover:shadow-xl group/bento cursor-pointer transition duration-200"
      >
      
      <div className="group-hover/bento:translate-x-2 pb-10 transition duration-200">
      <div className={`flex flex-1 items-center text-white h-[200px] rounded-xl overflow-hidden shadow-md relative`}>
        <img src={header} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <img src={header} alt={title} className="absolute inset-0 w-full h-full object-contain" />
      </div>


        <div
          className="font-sans font-bold text-white dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div
          className="font-sans font-normal text-white overflow-auto text-xs dark:text-neutral-300">
          {description}
        </div>
       
        
      </div>

      </div>
      <AnimatePresence>
        {
            modal&&(      
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.5}}
            className="flex justify-between p-15 items-center fixed inset-0 bg-black/80">
              {
                !loading?(
                  <>
                    <button 
                    onClick={deletion}
                    className="cursor-pointer p-2 px-4 bg-green-600 transition duration-75 hover:text-green-600 hover:bg-white text-white font-bold rounded-xl">
                      Lanjutkan
                    </button> 
                    <button 
                    onClick={()=>setModal(false)}
                    className="cursor-pointer p-2 px-4 bg-red-600 text-white hover:text-red-600 hover:bg-white font-bold rounded-xl">
                      Batalkan
                    </button> 
                  </>
                ):(
                  <div className="fixed flex justify-center items-center inset-0">
                    <Loader2 className="font-bold scale-200 animate-spin text-white"/>
                  </div>
                )
              }
              </motion.div>
            )
          }
      </AnimatePresence>
    </div>
    )
  );
};
