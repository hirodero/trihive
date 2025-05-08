'use client'
import FeaturedArticle from "../components/ui/featured-article";
import OtherArticle from "../components/ui/other-article";
import Heading from "../components/ui/heading";
import CreateArticle from "../components/ui/create-article";
export default function Category(){
  const word=
  {
    title:'Article',
    text:'Ayo baca artikel kami!.',
    subtext:'Mari explore artikel kami untuk mengasah ilmu dan tingkatkan literasi kamu!.'
  }
    return(
      <div id="main-wrapper" className=" flex flex-col  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed ">
          <Heading title={word.title} text={word.text} subtext={word.subtext}/>
        <div className="py-10">
          <div className="flex flex-col">
            <h2 className=" max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-neutral-200 font-sans">
              Featured Articles
            </h2>
            <span className="text-4xl text-white mx-auto ">
              Read, Learn, and Win the Games!
            </span>
            <FeaturedArticle/>
          </div>
          <div className="flex flex-col p-20">
            <div className="drop-shadow-2xl contrast-105 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed  drop-shadow-green-950 shadow-2xl shadow-green-600 rounded-2xl">
              <h2 className="text-5xl contrast-125 shadow-2xl self-end font-bold  bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed border-2 border-white text-white py-4 rounded-e-full pl-44 text-end pr-40 -ml-20 w-full font-sans">
                Other Articles
              </h2>
              <OtherArticle/>
            </div>
          </div>
          <div>
            <CreateArticle/>
          </div>
        </div>
      </div>
    )
}