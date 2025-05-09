"use client";
import React, {useState,useEffect } from "react";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react'; 
import  Modal  from "./modal";
export function Feedback() {
    const [user,setUser] = useState([])
    const [feedback,setFeedback] = useState({isi:'',rating:0})
    const [modal, activateModal] = useState(false)    
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        async function getData(){
            const response = await fetch('/api/auth/me')
            if (response.statusText!=='No Content'){
                const data = await response.json()
                setUser(data)
            }
        }
        getData()
    },[])
    const toggleModal = () => {
        activateModal(prev=>{
            prev = !prev
            return prev
        });
    };
      const handleSubmit = async  ()=>{
        if (feedback.rating === 0 || feedback.isi.trim() === "") {
            toast.error("Semua field harus diisi ya!");
            return;
          }
          setLoading(true);
          const toastId = toast.loading("Mengirim feedback...");
        try{
        const response = await fetch('/api/feedback',{
            method:'POST',
            headers: {
                "Content-Type": "application/json", 
              },
            body:JSON.stringify({
                rating: feedback.rating,
                feedback: feedback.isi,
                userID: user?.sub,
                Email: user?.email,
                Username: user?.nickname
            })
        })
        if (response.ok) {
            toast.success("Feedback berhasil terkirim!", { id: toastId });
            setFeedback((prev)=>{
                const clone={...prev}
                clone.isi = ''
                clone.rating = 0
                return clone
            });

          } else {
            toast.error("Gagal mengirim feedback.", { id: toastId });
          }
        } 
        catch (err) {
          console.error("Submit error:", err);
          toast.error("Terjadi kesalahan saat mengirim.", { id: toastId });
        } finally {
          setLoading(false);
        }
    }
    const content = () => (
        <div className="flex flex-col h-full w-full mb-2">
            <h4 className=" items-start text-4xl text-white rounded-xl dark:text-neutral-100 font-bold text-center">
                Rate Us!
            </h4> 
            <div className="flex flex-row justify-center w-full">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} 
                    onClick={() => {
                        setFeedback((prev)=>{
                            const clone ={...prev}
                            clone.rating = clone.rating === star ? 0 : star
                            return clone
                        })}
                    }
                     className="size-24 gap-2">
                        <img   
                        src="/assets/star.png"
                        alt={`Star ${star}`}
                        className={`cursor-pointer transition hover:contrast-125 duration-300 ${
                            star <= feedback.rating
                            ? "filter-none"
                            : "filter saturate-100 invert sepia hue-rotate-[82deg] brightness-90 contrast-91"
                            }`}/>
                    </div>
                    ))
                }
            </div>    
            <div className="p-2 ">
                <textarea className="p-2 min-h-72 bg-neutral-100 min-w-full text-black border-4 border-neutral-500 rounded-md" 
                type="text" 
                placeholder="Bagaimana Pendapat Kamu Kawan?" 
                value={feedback.isi} 
                onChange={(e)=>{
                    setFeedback((prev)=>{
                        const clone ={...prev}
                        clone.isi=e.target.value
                        return clone
                    })}}/>
            </div>
            <div className="flex flex-1">
                <button className="-mt-10 ml-auto mr-5 px-8  rounded-md bg-green-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-500 " onClick={handleSubmit} >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={16} /> Mengirim...
                        </span>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>    
        </div>
    )
     
    return (
        <div className="flex items-center justify-center ">
            <button onClick={toggleModal} 
            className="bg-lime-500 py-2 px-8 rounded-xl font-bold border-3 border-green-800 hover:scale-105 transition duration-100 hover:bg-white hover:text-green-950 cursor-pointer hover:border-lime-500">
                Feedback
            </button>
            <Modal modal={modal} toggle={toggleModal} content={content()}/>
        </div>

    )
}