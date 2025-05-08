'use client'
import { motion, AnimatePresence } from "framer-motion"
export default function Modal({modal,toggle,content}){
    return(
        <AnimatePresence>
            {
                modal&&(
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:0.3}}
                    exit={{
                        opacity:0,
                        transition:{duration:0.2}
                    }}
                    className="fixed inset-0 z-50 backdrop-blur-3xl flex justify-center items-center">
                        <motion.div 
                        initial={{opacity:0,
                            scale:0
                        }}
                        animate={{
                            opacity:1,
                            scale:1
                        }}
                        transition={{
                            duration:0.6,
                            type:'spring'
                        }}
                        className="p-3 pr-5 min-h-130 min-w-160 flex flex-col bg-green-950 ring-4 ring-lime-400  rounded-xl">
                            <motion.div onClick={toggle} initial={{background:'#ffffff',color:'#ff4500'}} whileHover={{color:'#ffffff ',scale:1.3, background:'#ff4500'}}  className="flex scale-125 cursor-pointer justify-center items-center ml-auto rounded-full py-0.5 px-2">
                                <motion.span 
                                className=" font-bold">
                                    &times;
                                </motion.span>
                            </motion.div> 
                            <div className="flex flex-1 flex-col  items-center">
                                {content}
                            </div>
                        </motion.div>
                    </motion.div>
                )   
            }
        </AnimatePresence>
    )
}