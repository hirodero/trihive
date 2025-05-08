'use client'
import Heading from "../components/ui/heading";
import CreateArticle from "../components/ui/create-article";
import TriviaDisplay from "../components/ui/trivia-display";
export default function Game(){
  const words={ 
    title:'Trivia',
    text:'Ayo Mainkan Trivia kami!.',
    subtext:'Mainkan trivia untuk mengasah ilmu, meningkatkan score, lalu ambil tempatmu dalam leaderboard!.'
  } 
    return(
      <div id="main-wrapper" className="flex flex-col bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed">
        <Heading title={words.title} text={words.text} subtext={words.subtext}/>
        <div className=" flex-col flex">
          <h2 className="transition duration-200 mt-10 text-white text-center z-10 max-w-7x py-4 px-28 rounded-full border-t-4 border-x-4 border-green-950 ring-8 ring-lime-700 text-xl md:text-5xl font-bold dark:text-neutral-200 font-sans">
            Trivia Selection
          </h2>
          <TriviaDisplay/>
        </div>
        <div>
          <CreateArticle/>        
        </div>
      </div>
    )
}