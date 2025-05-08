"use client";
import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import { cn } from "../utils/cn";
 
export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");
  const [boxShadow, setBoxShadow] = useState("0 0 0 4px gray");
  const [hover,setHover] = useState(false)
  const onMouseEnter = () => {
    setHover(true)
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
    setBoxShadow("0 0 0 16px #004225");
  };
  const onMouseLeave = () => {
    setHover(false)
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    setBoxShadow("0 0 0 1px gray");
  };  

  return (
    (<a
      className={cn(" relative group/pin cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

      href={href || "/"}>
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 ring-8">
        <motion.div
          style={{
            transform: transform,
            boxShadow: boxShadow
          }}

          className="absolute p-4 pb-8 px-6  flex justify-start items-start border-8 rounded-full border-lime-900  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-[url('https://images.unsplash.com/photo-1739288717689-1687e8133358?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGdyZWVuJTIwcGxhc21hfGVufDB8fDB8fHww')] bg-fixed bg-bottom bg-cover transition duration-700 overflow-hidden">
          <div className={cn(" relative ", className)}>{children}</div>
        </motion.div>
      </div>
      <PinPerspective title={title} href={href} hover={hover}/>
    </a>)
  );
};

export const PinPerspective = ({
  title,
  href,
  hover
}) => {
  return (
    (<motion.div 
      // animate={{opacity:[0,100]}}
      // transition={hover?{delay:1}:{delay:0}}
      // whileHover={{opacity:[0,100], transition:{delay:4}}}
      className="pointer-events-none translate-y-15 w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center pl-5 -translate-y-3 bg-gray-800 rounded-full contrast-150  py-0.5 px-4 ring-1 ring-white ">
            <span
              className="relative text-white text-xl font-semibold inline-block py-0.5">
              {title}
            </span>

            <span
              className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-teal-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
        </div>

        <motion.div
        animate={hover?{opacity:100}:{opacity:0}}
        transition={hover?{delay:0.7}:{delay:0}}
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                // z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-green-900 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                // z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-green-400 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                // z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-green-500 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
          </>
        </motion.div>

        <>
        <motion.div 
        animate={hover?{opacity:100}:{opacity:0}}
        transition={hover?{delay:0.7}:{delay:0}}
        >
          <motion.div
            className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-green-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div
            className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-green-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " />
          <motion.div
            className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-green-600 translate-y-[14px] w-[4px] h-[4px] rounded-full blur-[3px]" />
          <motion.div
            className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-green-300 translate-y-[14px] w-[2px] h-[2px] rounded-full " />
        </motion.div>
        </>
      </div>
    </motion.div>)
  );
};
