'use client'
import { motion } from "framer-motion";
import { useState, useEffect, useRef} from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import  Loaders  from '../../../components/ui/loadingmodal'
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import gsap from "gsap";
import toast from "react-hot-toast";
export default function Trivia(){
    const [user, setUser] = useState([])
    const { id } = useParams()
    const pic = useRef()
    const [profile,setProfile] = useState([])
    const router = useRouter()
    const [modalActivation,setModal] = useState(false);
    const [continueModal,setContinueModal] = useState(false);
    const [skipModal, setSkipModal] = useState(false);
    const [exit,setExitModal] = useState(false);
    const [trivia,setTriviaData] = useState([])
    const [loading,isLoading] = useState(false)
    const [answerSubmission,setSubmit] = useState(false)
    const [hoverOption,setHover] = useState(null)
    const [activateAnswer,setActive] = useState(null)
    const [currentQuestionIndex,setQuestionIndex] = useState(0)
    const [correct,correctCounter] = useState(0)
    const [percentage,setPercentage] = useState(0)
    const [correctAnswer,setCorrect] = useState(false)
    const [saveAnswer, setAnswer] = useState('')
    const white = '#ffffff'
    const hoverImpactBase = {scale:0.85, boxShadow:'0 0 0 4px #DCDCDC'}
    const hoverBase = {scale:1.2, boxShadow:'0 0 0 4px #39FF14'}
    const clickBase = {scale:1.05, zIndex:10, marginRight:2}
    const clickBackground = {backgroundColor:'#32cd32'}
    const transitionBase = {duration: 0.7, backgroundColor: { duration: 0.1 }}
    const whileTapBase = { scale:1.15, transition: { duration: 0.2 }}
    const initialBase = { scale:1, zIndex:0, marginRight:0, x:0, y:0}
    const animateSpanInitialBase = {scale:0.7, boxShadow:'0 0 0 0'}
    const animateSpanBase = { scale:1.1, background:'#50C878', color:'#ffffff', boxShadow:'0 0 0 4px #50C878'}
    const ids=['A','B','C','D']
    const [onExit,setExit] = useState(false)
    const [number,setNumber] = useState(1)
    const [finished,setFinished] = useState(false)
    const backToPage=()=>{
        router.push('/article')
    }
    const questions = trivia[currentQuestionIndex]?.TriviaQuestion
    
    useEffect(()=>{
        async function getSession(){
            const response = await fetch('/api/auth/me')
            if (response.statusText!=='No Content'){
                const data = await response.json();
                setUser(data)
            }
            else{
                 window.location.href = '/api/auth/login?returnTo=/post-login';
            }
        }
        getSession()
        async function getTrivia(){
            const response = await fetch('/api/fetchTrivia',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    ArticleID:id
                })
            })
            if(response.ok){
                const data = await response.json()
                setTriviaData(data.trivia)
            }
        }
        getTrivia()
    },[])

    useEffect(()=>{
        async function getProfile(){
            const response = await fetch('/api/user',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify({
                    Request:'Score'
                })
            })
            if (response.statusText!=='No Content'){
                const data = await response.json();
                setProfile(()=>{
                    const clone = data.posts.filter(items=>{ 
                        return items.UserID===user?.sub
                    })
                return clone
                })
            }
        }
        getProfile()
    },[user])

    function updateScore(finalScore){
        if (finalScore!==0){
            fetch('/api/updateScore',{
                method:'POST',
                headers:{
                    'Content-type':'applicaion/json'
                },
                body:JSON.stringify({
                    userID: profile[0]?.UserID,
                    score: finalScore
                })
            })
        }
    }
    const toggleContinue=()=>{
        if(saveAnswer){
            document.body.style.overflow='hidden'
            setContinueModal(true)
            setModal(true)
        }else{
            toast.error('Pilih jawaban dulu sebelum submit!')
        }
    }
    const toggleSkip=()=>{
        document.body.style.overflow='hidden'
        setSkipModal(true)
        setModal(true)
    }
    function toggleFinish(finalscore){
        setFinished(true)
        setTimeout(() => {
            updateScore(finalscore)
        }, 500);
        setTimeout(() => {
            gsap.timeline().
            set(pic.current,{opacity:0,x:310, y:-40, scale:1.9}).
            to(pic.current, { opacity:100, scale: 1.5, duration: 1.5,rotate:360, ease: "power2.out" }).
            to(pic.current, { scale: 1, x: 0, y:0, duration: 1, ease: "power3.out" });
          }, 50);
    }

    const rightBar=()=>{
        switch(correct){
            case 1:
                setPercentage((1/5)*128.9)
                break
            case 2:
                setPercentage((2/5)*128.9)
                break
            case 3:
                setPercentage((3/5)*128.9)
                break
            case 4:
                setPercentage((4/5)*128.9)
                break
            case 5:
                setPercentage(128.9)
                break
            default:
                setPercentage(9)
        }
    }
    function toggleActive(key){
        if(activateAnswer===key){
            setAnswer('')
            return setActive(null);
        }
        else{
            setAnswer(key)
            setActive(key)
        }
    }

    useEffect(()=>{
        finished&&rightBar()
    },[finished])

    useEffect(()=>{
        trivia&&isLoading(true)
    },[trivia])
    const answers=[
        trivia[currentQuestionIndex]?.TriviaOptionA,
        trivia[currentQuestionIndex]?.TriviaOptionB,
        trivia[currentQuestionIndex]?.TriviaOptionC,
        trivia[currentQuestionIndex]?.TriviaOptionD
    ]
    function closeModal(e){
        if(continueModal===true && e==='continue'){
            if(saveAnswer===trivia[currentQuestionIndex]?.TriviaAnswer){
                correctCounter(prev=>prev+1)
                setAnswer('')
                setActive(null)
                setSubmit(true)
                setCorrect(true)
                setTimeout(() => {
                   setExit(true) 
                },1200);
                setTimeout(()=>{
                    setCorrect(false)
                    setSubmit(false)
                    setExit(false)
                },1800)
            }
            if(saveAnswer!==trivia[currentQuestionIndex]?.TriviaAnswer){
                setActive(null)
                setSubmit(true)
                setTimeout(() => {
                    setExit(true) 
                },1200);
                setTimeout(()=>{
                    setSubmit(false)
                    setExit(false)
                },1800)
            }
            setQuestionIndex(currentQuestionIndex+1)
        }
        if(skipModal===true &&e==='continue'){
            setQuestionIndex(currentQuestionIndex+1)
            setSubmit(false)
        }
        setActive(null)
        setExitModal(true);
        setModal(false)
        setNumber(number+1)
        setTimeout(()=>{
            if (number === 5) {
                const isCorrect = continueModal && saveAnswer === trivia[currentQuestionIndex]?.TriviaAnswer;
                const finalCorrect = isCorrect ? correct + 1 : correct;
                const finalScore = finalCorrect * 20;
                toggleFinish(finalScore); 
              }
            setContinueModal(false);
            setSkipModal(false);
            setExitModal(false);
        },3)
    }
    const backgroundColors = {
        A: '#414141',
        B: '#002147',
        C: '#264348',
        D: '#8b4513'
      };
    const offset=[
        [{},{x:-30,y:-10},{x:140,y:-10},{x:-70,y:10}],
        [{x:30,y:-10},{},{x:80,y:10},{x:-140,y:-10}],
        [{x:140,y:10},{x:-70,y:-10},{},{x:-30,y:10}],
        [{x:80,y:-10},{x:-140,y:10},{x:30,y:10},{}]
    ]
    const options = ids?.map((id,i)=>{
        const currentHoverIndex = ids.indexOf(hoverOption)
        const otherHovered = hoverOption && hoverOption !== id
        const impactedFromOtherHover = otherHovered?hoverImpactBase:{}
        const selfStyle = offset[i][currentHoverIndex];
        const choosenAnswer = activateAnswer === id &&
        {...clickBackground,...(((hoverOption!==id)&!otherHovered)&&clickBase)}
        return(
            {
                key:id,
                answer:answers[i],
                initial:{
                    backgroundColor:backgroundColors[id],
                    ...initialBase},
                animate:{
                    ...impactedFromOtherHover,
                    ...selfStyle,
                    ...choosenAnswer
                },
                transition:transitionBase,
                whileHover:hoverBase,
                whileTap:whileTapBase,
                animateSpan:hoverOption===id?
                animateSpanBase:animateSpanInitialBase
            }
        )})
    return (
    <div 
    className="flex overflow-hidden flex-1 pt-8 h-screen bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed  justify-center items-center transition">
        {!loading&&(
            <Loaders/>
        )}
        {id && trivia.length!==0?(
            user.sid?(
                <>
                    <motion.div 
                    animate={
                    finished?
                    {scale:[1.2,1]}:
                    {scale:1}} 
                    transition={{
                        duration:1,
                        type:'spring'
                    }} 
                    className="bg-neutral-800 pb-3 ring-4 ring-neutral-950 w-2/3 h-[550] rounded-xl">
                    {
                        finished?(
                        <motion.div 
                            animate={{opacity:[0,100]}} 
                            transition={{duration:1}} 
                            className="p-10 space-y-4 bg-emerald-950 rounded-2xl flex flex-1 flex-col items-center w-full h-full">
                            <motion.div 
                            initial={{opacity:0}}
                            animate={{opacity:100}}
                            transition={{
                                duration:1, 
                                delay:1.9
                            }}
                            className="bg-green-950 ring-4 ring-green-800 rounded-2xl p-4 w-full">
                                <h1 className="text-xl text-white font-bold pb-2 ">
                                    Solving accuracy
                                </h1>
                                <div className="bg-red-500 w-full ring-4 ring-green-200 h-10 rounded-full">
                                    <motion.div 
                                        initial={{opacity:0}} 
                                        animate={{
                                            opacity:100,
                                            width:`${percentage}svh`
                                        }} 
                                        transition={{
                                            duration:3,
                                            delay:2,
                                            ...correct===0&&
                                            {opacity:{delay:2}},
                                            ease:'easeOut'
                                        }} 
                                        className="flex justify-end rounded-full bg-gradient-to-r -z-10 from-green-700 via-green-600 to-lime-400 w-0 h-10">
                                        <motion.div 
                                            initial={{opacity:0}} 
                                            animate={{opacity:100}} 
                                            transition={{
                                                duration:1,
                                                delay:2
                                            }} 
                                            className={`p-2 pr-4 ${correct===0?'pl-6':'pl-20'} bg-gradient-to-r from-transparent to-white text-green-900 font-bold text-lg rounded-e-full`}>
                                            <motion.span 
                                                initial={{opacity:0}} 
                                                animate={{opacity:100}} 
                                                transition={{delay:4}}>
                                                {correct*20+'%'}
                                            </motion.span>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{
                                    backgroundColor:'transparent',
                                    boxShadow:'0 0 0 0px'
                                }}
                                animate={{
                                    backgroundColor:'#052e16',
                                    boxShadow:'0 0 0 4px #166534'
                                }}
                                transition={{
                                    duration:1,
                                    delay:1.9
                                }}
                                className="flex  rounded-2xl p-4 w-full h-full">
                                <div className="flex w-full items-center">
                                    <div className="flex z-10 items-center justify-center h-full w-[400px] rounded-2xl">
                                        <img
                                        ref={pic}
                                        src={profile[0]?.UserPicture} 
                                        className="size-fit rounded-full w-full max-h-[250] max-w-[250] object-contain border-8 border-teal-800 ring-green-400 ring-8"  
                                        alt="Loading" />
                                    </div>
                                    <div className="flex pl-2 items-center h-full w-full">
                                        <motion.div
                                            initial={{
                                                opacity:0, 
                                                x:-120
                                            }}
                                            animate={{
                                                opacity:100,
                                                x:0
                                            }}
                                            transition={{
                                                duration:1, 
                                                delay:1.8}}
                                            className="flex flex-col pl-16 bg-gray-950 rounded-xl w-full p-10 justify-center items-end -translate-x-12">
                                            <span className="text-xl font-bold text-white">
                                                {profile[0]?.Username}
                                            </span>
                                            <span className="text-4xl font-bold text-white">
                                                Score Gained: {correct*20}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                id="footer"
                                initial={{opacity:0}}
                                animate={{
                                    opacity:100
                                }}
                                transition={{
                                    duration:1, 
                                    delay:1.9
                                }}
                                className="flex w-full h-20 bg-green-950 ring-4 ring-green-800 mx-4 mb-1 font-semibold text-white text-xl rounded-xl items-center justify-center">
                                <div className=" flex transition py-1 duration-75">
                                    <motion.button 
                                    id="back-button"
                                    whileHover={{
                                        scale:1.2, 
                                        backgroundColor:'#00ff80',
                                        color:'#006734'}} 
                                    whileTap={{
                                        scale:[1.1,1.2],
                                        backgroundColor:'#32cd32'}} 
                                    onClick={backToPage} 
                                    className="p-2 cursor-pointer px-12 bg-green-600 ring-2 ring-green-800 rounded-2xl">
                                        <span>
                                            Back
                                        </span>
                                    </motion.button>
                                </div> 
                            </motion.div>
                        </motion.div>
                    ):(
                        <div className="flex flex-1 flex-col h-full">
                        <div id="question-box" className="flex flex-1 flex-col min-h-[180] max-h-[180] mx-4 mt-8 bg-neutral-400 rounded-xl ring-2 ring-gray-200 p-3">
                            <div id="title">
                                <span className="font-bold text-white text-xl">
                                    Soal nomor {currentQuestionIndex+1}
                                </span>
                            </div>
                            <div id="question" className="break-all overflow-y-auto">
                                <span className="font-semibold text-neutral-100 text-base">
                                    {questions}
                                </span>
                            </div>
                        </div>

                        <div id="answers" className="grid grid-cols-2 rounded-xl m-4 row-span-2 min-h-[220] max-h-[220] ">
                            {options?.map((options)=>{
                                return(
                                    <motion.div 
                                    key={options.key} 
                                    initial={options.initial}
                                    animate={options.animate}
                                    transition={options.transition}
                                    whileHover={options.whileHover}
                                    whileTap={options.whileTap}
                                    onClick={()=>toggleActive(options.key)}
                                    onMouseEnter={()=>setHover(options.key)}   
                                    onMouseLeave={()=>setHover(null)} 
                                    className="flex cursor-pointer group rounded-xl p-2 z-20 border-2 border-gray-300">
                                        <div className="flex flex-col h-full items-center justify-center">
                                            <motion.span 
                                            initial={{background:white}}
                                            animate={options.animateSpan} 
                                            className="ml-1 p-4 px-6 rounded-full bg-white">{options.key}</motion.span>
                                        </div>
                                        <div 
                                        className={`flex flex-col justify-center items-baseline overflow-auto overflow-x-hidden max-w-92 max-h-22 flex-1 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 `} >   
                                                {options.answer?
                                                (
                                                    <span className="group-hover:translate-x-5 group-hover:mr-7 mr-2 mt-2 transition duration-150 pb-2 break-all text-gray-300 text-base font-semibold">
                                                        {options.answer}
                                                    </span>)
                                                :( 
                                                    <span>
                                                        <Loader2 className="group-hover:translate-x-5 group-hover:mr-7 transition duration-150 animate-spin"/>
                                                    </span>
                                                )}             
                                        </div>
                                    </motion.div>
                                )
                            })} 
                        </div>
                        <div id="footer" className="flex flex-1 bg-neutral-950 ring-4 ring-emerald-800 mx-4 mb-1 font-semibold text-white text-xl rounded-xl items-center justify-center">
                            <div className="absolute flex transition duration-75">
                                <motion.button 
                                id="continue"
                                whileHover={{
                                    scale:1.05, 
                                    backgroundColor:'#ffffff',
                                    color:'#006734'
                                }} 
                                whileTap={{
                                    scale:1.1,
                                    backgroundColor:'#32cd32'
                                }} 
                                transition={{type:'spring',duration:0.3}}
                                onClick={()=>toggleContinue()} 
                                className="p-3 cursor-pointer px-12 bg-green-600 ring-2 ring-green-800 rounded-2xl">
                                    <span>
                                        SUBMIT
                                    </span>
                                </motion.button>
                            </div>
                            <div className="flex ml-auto hover:scale-110 active:scale-95 transition duration-75">
                                <motion.button 
                                id='skipbutton'
                                whileHover={{
                                    scale:1.05,  
                                    backgroundColor:'#ffffff', 
                                    color:'#670000'
                                }} 
                                whileTap={{scale:1.1,backgroundColor:'#ff4500'}} 
                                onClick={()=>toggleSkip()} 
                                className="p-2 cursor-pointer px-8 bg-red-600 text-lg rounded-2xl mr-5">
                                    <span>
                                        SKIP
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    )
                }
                </motion.div>
                {
                    modalActivation&&
                    (
                        <motion.div 
                            animate={!exit?{opacity:[0,100]}:{opacity:0}} 
                            className="absolute flex backdrop-blur-3xl z-20 inset-0 w-screen h-screen overflow-hidden justify-center items-center">
                            <div className="flex flex-col justify-center items-center h-[200] w-[650] bg-white rounded-xl ring-4 ring-gray-300">
                                <span className="mb-10 text-gray-500 text-2xl font-semibold">
                                    {continueModal&&
                                    'Udah yakin mau disubmit dan lanjut ke soal berikut?'
                                    }
                                    {skipModal&&
                                    'Yakin nih mau diskip aja soalnya?'
                                    }
                                </span>
                                <div className="space-x-9 font-bold text-white">
                                    <motion.button 
                                    id="continue"
                                    whileHover={{scale:1.1}} 
                                    transition={{duration:0.1}} 
                                    onClick={(e)=>closeModal(e.target.id)} 
                                    className="bg-green-600 rounded-xl cursor-pointer py-2 px-12">
                                        Continue
                                    </motion.button>
                                    <motion.button 
                                    id='back'
                                    whileHover={{scale:1.1}} 
                                    transition={{duration:0.1}} 
                                    onClick={(e)=>closeModal(e.target.id)} 
                                    className="bg-red-600 rounded-xl cursor-pointer py-2 px-12">
                                        Back to Question
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )   
                }
                {
                    answerSubmission&&(
                        <div className='flex flex-1 z-10 inset-0 fixed justify-center bg-transparent pointer-events-none'>
                            <motion.div 
                            initial={{opacity:100}} 
                            animate={
                                onExit?{
                                    opacity:50,
                                    translateY:[0,-200]}:{
                                    scale:[1.3,1]
                                }} 
                            transition={{
                                duration:1,
                                type:'spring'
                                }} 
                            className="z-10 mt-30 px-10 py-4 rounded-3xl flex flex-col justify-center items-center fixed bg-white">
                                <motion.span 
                                    initial={{scale:0}} 
                                    animate={
                                        onExit?{opacity:[100,0]}:{
                                        scale:[1.2,1.1]
                                    }} 
                                    transition={{
                                        type:'spring',
                                        duration:1
                                        }}>
                                    {correctAnswer?
                                    <span className="flex flex-row items-center text-lg"> 
                                        <FaCheckCircle className="text-green-600 -translate-x-3 size-6"/> 
                                        Yay! jawaban kamu benar!
                                    </span>:
                                    <span className="flex flex-row items-center text-lg"> 
                                        <MdCancel className="text-red-600 -translate-x-3 size-7"/> 
                                        Jawaban kamu salah
                                    </span>}
                                </motion.span>
                            </motion.div>
                        </div>
                    )
                }
            </>
            ):(
                <Loaders/>
            )
            
        ):(
            <div className="flex flex-col text-white items-center justify-center h-screen lg:space-y-30 md:space-y-80 space-y-15 bg-[url('/assets/space.png')] bg-cover bg-no-repeat bg-center bg-fixed">
                    <div className="flex flex-col justify-center items-center rounded-2xl font-bold p-4 bg-lime-900">
                        <img src="https://cdn.fstoppers.com/styles/large/s3/wp-content/uploads/2012/08/toofar.jpg" alt="" />
                        <h1>Please go back to the right game</h1>
                    </div>
                </div>
        )}
        
     </div>
    )
}