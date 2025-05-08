'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Detail(){
    const tl = gsap.timeline()
    const body = useRef()
    const img = useRef()
    const title = useRef()
    const content = useRef()
    const category = useRef()
    const button = useRef()
    const [data,setData] = useState([])
    const router = useRouter()
    const params= useSearchParams()
    const [loading, setLoading] = useState(false)

    const id = params.get('id')
    useEffect(()=>{
        if (id)
        {
            fetch('/api/article/requestArticle',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify({
                    id
                })
            }).
            then(res=>res.json()).
            then(res=>{
                setData(res.article[0])
                setLoading(true)
            })
        }
    },[id])
    useEffect(() => {
        if (!body.current || !title.current || !img.current || !button.current || !content.current || !category.current) {
          return;
        }
      
        gsap.set(body.current, { opacity: 0 });
        gsap.set(title.current, { opacity: 0, x: 400 });
        gsap.set(img.current, { opacity: 0, x: -300 });
        gsap.set(button.current, { backgroundColor: '#009900' });
        gsap.set(content.current, { opacity: 1, scale: 1 });
      }, []);
      
    const handleEnter=()=>{
        gsap.to(button.current, {scale:1.42, backgroundColor:'#32cd32'})
    }
    const handleLeave=()=>{
        gsap.to(button.current, {scale:1.4, backgroundColor:'#009900'})
    }
    useEffect(() => {
        if (!body.current || !title.current || !img.current || !button.current || !content.current || !category.current) {
            return;
          }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: content.current,
            start: "top 100%",
            end: "bottom 20%",
            scrub: true,
          }
        });
      
        const buttontl = gsap.timeline({
            scrollTrigger: {
                trigger: button.current,
                start: "top 95%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  gsap.to(button.current, {
                    y: -170,
                    scale: 1.05,
                    duration: 0.5,
                    onComplete: () => {
                      gsap.to(button.current, {
                        y: -179,
                        repeat: -1,
                        yoyo: true,
                        duration: 1,
                        ease: "sine.inOut"
                      });
                    }
                  });
                },
                onLeaveBack: () => {
                  gsap.killTweensOf(button.current);
                  gsap.to(button.current, {
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.inOut"
                  });
                }
              }
        })

        tl.to(title.current, { opacity: 1,y:-300, scale: 1, duration: 2, ease:'power2.inOut' }).
        to(img.current, { opacity: 1,y:-300, scale: 1, duration: 2, ease:'power2.inOut' }).
        to(category.current, { opacity: 1,y:-300, scale: 1, duration: 2, ease:'power2.inOut' }).
        to(content.current, { opacity: 1,y:-140,scale:0.9, duration: 4 }).
        to(content.current, { opacity: 1, y:-350, scale: 0.8, duration: 1  })
        ScrollTrigger.refresh();
      }, [loading]);
      
      useEffect(() => {
        if (
            loading &&
            body.current &&
            img.current &&
            title.current
        ) {
            gsap.to(body.current, { opacity: 1, duration: 1 });
            gsap.to(
                [img.current, title.current],
                { opacity: 1, x: 0, duration: 2, ease: "power2.out" },
                "+=0.2"
            );
        }
    }, [loading]);
    
    return(
        <div className="flex flex-col text-white min-h-screen p-10 bg-[url('/assets/space.png')] items-center">
        {
            id?(
                <>
                    <div className="w-full h-32 bg-none"/>
                    <div 
                    ref={body}
                    className="flex flex-col w-2/3 vh-screen rounded-2xl shadow-2xl bg-green-900">
                    <div className="flex flex-col p-10">
                        <div className="flex w-full pt-10 justify-center p-10">
                            <h1 
                            ref={title}
                            className="text-4xl font-bold break-all break-words">{data.ArticleTitle}</h1>
                        </div>
                        <div
                        ref={img}
                        className="flex w-full min-h-[400] h-[400] max-h-[400] bg-gradient-to-tr from-lime-200 to-green-800 rounded-xl justify-center">
                            <img 
                            src={data.ArticleImage}
                            alt="image"
                            className="h-full bg-gradient-to-tr object-contain rounded-2xl" />
                        </div>
                        
                        <h1
                        ref={category}
                         className="font-bold text-2xl">April 2025 - {data.ArticleCategory}</h1>
                        <div
                        ref={content}
                         className="pt-2">
                            <span className="text-2xl font-sans break-words">{data.ArticleContent}</span>
                        </div>
                    </div>
                        <div 
                        ref={button}
                        onClick={()=>router.push(`/trivia/games?id=${data.ArticleID}`)}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        className="flex justify-center rounded-2xl cursor-pointer w-full h-20">
                            <button
                             className="text-3xl cursor-pointer font-bold">
                                Mainkan Trivianya!
                            </button>
                        </div>
                    </div>
                </>
            ):(
                <div className="flex flex-col text-white items-center justify-center h-screen lg:space-y-30 md:space-y-80 space-y-15">
                    <div className="flex flex-col justify-center items-center rounded-2xl font-bold p-4 bg-lime-900">
                        <h1>
                            Article Not Found
                        </h1>
                        <h1>
                            404
                        </h1>
                    </div>
                </div>
            )
        }
        </div>
    )
}