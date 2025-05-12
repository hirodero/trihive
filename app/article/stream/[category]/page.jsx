"use client";
import { useParams } from "next/navigation";
import FeaturedArticle from "../../../components/ui/featured-article";
import OtherArticle from "../../../components/ui/other-article";
import Pin from "../../../components/ui/pin-navigation";
export default function Stream(){
    const { category }= useParams()
    return(
        <>
            {
                category==='Sosiologi'||category==='Biologi'|| category==='Geografi'?(
                <div className="pt-28 flex flex-col lg:space-y-30 md:space-y-80 space-y-15 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed">
                    <div className="flex flex-row md:pr-55 md:py-30 justify-center">
                    <div className="md:pr-10 flex max-h-full items-center">
                        <img src={`/assets/${category?.toLowerCase()}.png`} alt="" 
                        className="md:ml-28 md:size-56 size-20 ml-14 object-fill rounded-full ring-4 ring-gray-300" />
                    </div>
                    <div className="p-10 pl-5 pr-20 space-y-2 flex flex-col text-white">
                        <span className="md:text-4xl text-xl font-semibold">Welcome to</span>
                        <span className="md:text-6xl text-2xl  font-bold">{category}</span>
                    </div>
                    </div>
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
                    <div className="flex flex-col text-white font-sans font-bold">
                    <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl  ">
                        Featured Articles
                    </h2>
                    <span className="md:text-4xl mx-auto lg:my-10 ">
                        Read, Learn, and Win the Games!
                    </span>
                    <FeaturedArticle category={category} />

                    </div>
                    <div className="flex flex-1 flex-col font-sans font-bold text-white">
                    <h2 className="mb-0 max-w-7xl mx-auto text-2xl md:text-5xl   ">
                        Other Articles
                    </h2>   
                    <OtherArticle category={category}/>
                    </div>
                </div>
    
                ):(

                <div className="flex flex-col text-white items-center justify-center h-screen lg:space-y-30 md:space-y-80 space-y-15 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed">
                    <div className="flex flex-col justify-center items-center rounded-2xl font-bold p-4 bg-lime-900">
                        <img src="https://cdn.fstoppers.com/styles/large/s3/wp-content/uploads/2012/08/toofar.jpg" alt="" />
                        <h1>Please go back to the right stream</h1>
                    </div>
                </div>
                )
            }  
        </>
    )
}