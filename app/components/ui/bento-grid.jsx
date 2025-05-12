
'use client'
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
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
  title,
  description,
  header,
  navigation,
  navigationType
}) => {
  const router= useRouter()
  const navigate=(navigation,navigationType)=>{
    if(navigationType==='article'){
      router.push(`/article/detail/${navigation}`)
    }else if(navigationType==='trivia'){
      router.push(`/trivia/games/${navigation}`)
    }
  }
  return (
    (<div
    onClick={()=>navigate(navigation,navigationType)}
      className={cn(
        "row-span-1 cursor-pointer rounded-xl p-6 drop-shadow-xs drop-shadow-green-200 shadow-xs shadow-green-600 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-neutral-900 border border-neutral-800 justify-between flex flex-col space-y-4",
        className
      )}>
      
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
    </div>)
  );
};
