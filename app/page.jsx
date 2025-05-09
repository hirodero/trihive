"use client";
import "./globals.css";
import { motion } from "framer-motion";
import  Pin from "./components/ui/pin-navigation";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import  Top3  from "./components/ui/top3";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OtherArticle from './components/ui/other-article'
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const container1 = useRef()
  const container2 = useRef()
  const leaderboardTitle = useRef()
  const introHeading= useRef()
  const introSubheading = useRef()
  const playbutton = useRef()
  const dice = useRef()
  const dice2 =useRef()
  const router = useRouter();
  const [active,setActive] = useState(0)
  const [user,setUser] = useState([])
  const [faq,setFaQ] = useState(
    Array(3).fill(0).map((items,index)=>{return ({key:index,question:'',answer:'',status:false})})
  )
  const subtext = `TriHive menyediakan berbagai macam kategori article dan permainan trivia yang dapat membantu kamu meningkatkan kecerdasan dan ketelitian!`
  const gameNav=()=>{
    user?.sid?
      router.push('/trivia'):
      window.location.href = '/api/auth/login'
  }

  useEffect(() => {
    async function checkSession(){
      const res = await fetch('/api/auth/me');
        if (res.statusText !== 'No Content') {
          const data = await res.json();
          setUser(data);
        } 
    };
    async function getFaQ(){
      const res = await fetch('/api/faq');
        if (res.statusText !== 'No Content') {
          const data = await res.json();
          setFaQ(prev=>{
            const clone = [...prev]
            data.faq.map((items,index)=>{
              clone[index].key=index
              clone[index].question=items.Question
              clone[index].answer=items.Answer
              clone[index].status=false
              return clone;
            })
            return clone
          });
        } 
    };
    checkSession();
    getFaQ();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetch('/api/saveuser', {
        method: 'POST',
      });
    }
  }, [user]);
  
  useEffect(() => {
    setTimeout(() => { 
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container1.current,
            start: 'bottom 100%',
            end: 'bottom 1%',
            scrub: 0.8,
            toggleActions: "play none none reverse",
          }
        });
  
        tl.to([dice.current, introHeading.current, introSubheading.current, dice2.current, playbutton.current], {
          y: -50,
          duration: 3,
          ease: "power2.out",
          stagger: 0.2, 
        })
        .to(container1.current, {
          y: -100,
          duration: 5,
          ease: "power2.inOut",
        }, "<0.5"); 
      },container1 );
      return () => ctx.revert(); 
    }, 1000);
  }, []);
  
  useEffect(() => {
    setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container2.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 1,
            toggleActions: "play none none reverse",
          }
        });
  
        tl.to(leaderboardTitle.current, {
          y: 55,
          duration: 2.5,
          ease: "power2.inOut",
        }).
        to(leaderboardTitle.current, {
          y: -30,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(container2.current, {
          opacity: 0,
          y:200,
          duration: 2.5,
          rotate:5,
          ease: "power2.inOut",
        }, "<+2");  
      }, container2);
  
      return () => ctx.revert();
    }, 1000);
  }, []);

  const word=[
    [{text: `Hey ${user?.nickname? user?.nickname:'kamu, ayo login dan'} mari bermain!!!`,className:'text-white'}],
    [{text: "Kamu bisa meningkatkan literasi dan bermain trivia hanya di",className:'text-white'}],
    [{text: "Trihive.", className:'text-green-500'}],
  ]
  
    
  return (
    <>
        <div className="flex flex-col  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed justify-center min-h-screen">
          <div className="flex flex-col ">
              <div 
              ref={container1}
              className="ml-10 bg-fixed bg-cover bg-no-repeat bg-center border-white p-10 rounded-2xl mr-16 flex flex-col mt-24 justify-center min-w-px flex-grow ">
                <div className="max-w-52 -mt-8 max-h-52 ml-auto mr-16">
                  <img 
                  ref={dice}
                  className="mt-10 -translate-y-8" src="https://th.bing.com/th/id/R.098cbe8203656ca7b615a26c4caf97f3?rik=HLlURnve67VyLg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdice-transparent-png%2fdice-transparent-png-9.png&ehk=r3zmnec4CYiAk2fljlA2L7dPox0X%2beqpEeqbEOGalbA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className="flex flex-col -mt-20 mx-24">
                  <div ref={introHeading}>
                    {
                      [0,1,2].map((item)=>(
                          <TypewriterEffectSmooth key={item} words={word[item]}/>
                      ))
                    }
                  </div>
                  <small ref={introSubheading} 
                  className="font-mono font-bold text-2xl text-yellow-500">
                      <TextGenerateEffect words={subtext}/>
                  </small>
                </div>
                
                <div className="max-w-52 max-h-52 mt-5 mr-auto">
                  <img
                  ref={dice2}
                  className="mt-4"
                  src="https://th.bing.com/th/id/R.098cbe8203656ca7b615a26c4caf97f3?rik=HLlURnve67VyLg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdice-transparent-png%2fdice-transparent-png-9.png&ehk=r3zmnec4CYiAk2fljlA2L7dPox0X%2beqpEeqbEOGalbA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>

                <motion.button 
                ref={playbutton}
                initial={{ opacity: 0 }}
                animate={{opacity: 1  }}
                transition={{ duration: 0.8,delay:0.8, ease: "easeInOut"}} 
                onClick={gameNav}
                className="-mt-20 cursor-pointer ml-auto mr-5 px-16 py-4 rounded-full bg-green-500 text-white text-xl font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-500">
                  <span>
                    {user?.sid ?'Mulai bermain!':'Login Dulu King!'}
                  </span>
                </motion.button>
          </div>
          </div>
          <div className="flex m-20 rounded-full flex-col py-0 px-10 ">
            <div
            ref={leaderboardTitle}
            className="flex pt-8 ">
              <h2 className="text-5xl shadow-2xl  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center self-end font-bold contrast-125 -translate-x-40 text-white border-y-2 py-4 rounded-e-full pl-44 text-end pr-40 w-full font-sans">
                Top 3 Players
              </h2>
            </div>
                <div
                ref={container2}
                id="Score-board" className="flex flex-row mt-10 mb-20 justify-center  items-center bg-none  border-gray-800 h-100 min-w-full">
                  <div 
                  // ref={leaderboard}
                  className="transition duration-300 flex flex-col shadow-2xl shadow-green-600 items-center  border-b-black  border-b-8 rounded-full px-40 -mr-3">    
                    <div className="flex shadow-green-800 transition flex-col group mt-10 hover:scale-110 hover:-translate-y-2 hover:translate-x-1 hover:brightness-105 hover:contrast-105 duration-700  shadow-2xl  bg-cover bg-no-repeat bg-center bg-fixed   border-b-emerald-950 rounded-full px-10 border-b-8">
                      <Top3/> 
                    </div>
                  </div>
              </div>

          </div>
          <div className="flex flex-col  justify-center p-20">
           <div className="pb-8 border-b-8 shadow-2xl shadow-green-500 border-b-neutral-400 rounded-full bg-[url('https://images.unsplash.com/photo-1634588120039-3a9c277449c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxncmVlbiUyMHBsYXNtYXxlbnwwfHwwfHx8MA%3D%3D')] bg-fixed bg-cover bg-left  flex flex-1 flex-col"> 
                <div>
                    <h2 className="text-5xl shadow-2xl self-end font-bold  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-2 border-white text-white py-4 rounded-e-full pl-44 text-end pr-40 -ml-20 w-full font-sans">
                      Streamlines
                    </h2>
                </div>
                <div className="w-full h-full shadow-2xl shadow-green-600 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-b-8 border-neutral-950 ring ring-lime-300 rounded-tl-4xl rounded-bl-full rounded-tr-full pb-20">
                  <Pin/>  
                </div>
            </div>

              <div className="drop-shadow-2xl pt-8 drop-shadow-green-950 shadow-2xl shadow-green-600 rounded-2xl">
                <h2 className="text-5xl shadow-2xl self-end font-bold  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-2 border-white text-white py-4 rounded-e-full pl-44 text-end pr-40 -ml-20 w-full font-sans">
                  Other Articles
                </h2>
                <OtherArticle/>
              </div>
          </div>
              <div className="flex flex-col">
                <div className="flex justify-center items-center bg-green-950">
                  <div className="bg-white text-white size-full rounded-r-full">.</div>
                  <span className="text-5xl px-10 py-10 font-bold font-mono text-white">FAQs</span>
                  <div className="bg-white text-white size-full rounded-l-full">.</div>
                </div>
            
                <div className="flex flex-col space-y-3 px-10 py-10 font-bold font-mono bg-emerald-700 text-white ">
                    {
                      faq.map((data,index)=>{
                        return(
                        <div
                        onClick={()=>{
                          setFaQ(prev=>{
                          const clone=[...prev]
                          clone[index] = { ...clone[index], status:!clone[index].status};
                          return clone
                        })
                        // setActive(index)
                      }}

                         key={data.key}
                         className="group"
                         >   
                          <div className=" flex cursor-pointer flex-row">
                          <span className="group-hover:text-neutral-400  font-semibold text-xl">{data.question}</span>
                            <button
                            className={`cursor-pointer ml-auto ${data.status?'text-green-900':'text-white'}`}>
                              <FaPlay className='mr-4 hover:text-green-500'/>
                            </button>
                          </div>
                          {
                            data.status?(<span className="pl-2 text-neutral-200 font-normal">{data.answer}</span>):(<></>)
                          }
                          <hr className="border-b-2 cursor-pointer group-hover:shadow-white group-hover:shadow-2xl group-hover:border-white border-neutral-400"/>
                        </div>
                        )
                      })
                    }
                </div>
              </div>
        </div>
    </>
  );
}
