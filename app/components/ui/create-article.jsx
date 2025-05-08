'use client'
import { useState, useEffect, useRef, useMemo } from "react"
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { supabase } from "../../lib/supabase-client";
import { AnimatePresence, motion } from "framer-motion";
export default function CreateArticle(){
  const totalArray = 5;
  const inputFileRef = useRef();
  const [user,setUser] = useState({userData:[],userLoading:true, userLogged:false})
  const [trivias,setTrivias] = useState({status:false,buttonAnm:false})
  const [displayModal, setModal] = useState(false);
  const [artikel,setArtikel] = useState({judul:'', kategori:'None', isi:'', deskripsi:'', gambar:'', URLGambar:'',isLoading:true})
  const [triviadata,setData] = useState(
    Array(totalArray).fill(null).map(()=>(
      {
        question:'',
        options:[],
        answer:'A'
       }
    )))
  
  useEffect(()=>{
    async function checkSession(){
      const response = await fetch('/api/auth/me')
      if (response.statusText!=='No Content'){
        const data = await response.json()
        setUser((prev)=>{
          const clone = {...prev}
          clone.userData=data
          clone.userLogged=true
          clone.userLoading=false
          return clone
        })
      }else{
        setUser((prev)=>{
          const clone = {...prev}
          clone.userLogged=false
          clone.userLoading=false
          return clone
        })
      }

    }
    checkSession();
  },[])

  async function uploadGambar(file){
    const fileName = `${Date.now()}-${file.name}`
    try{
      const {data,error} = await supabase.storage.from('article-image').upload(fileName,file);
      const imagePath=`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
      if(error){
        toast.error('Masalah di supabase');
      }
      return imagePath;
    }
    catch(e){
      toast.error('Gambar gagal diupload');
      return e;
    }
  }
  function handleImageClick(e){
    setArtikel((prev)=>{
      const clone = {...prev}
      clone.gambar = e.target.files[0]
      return clone
    })
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setArtikel((prev)=>{
      const clone = {...prev}
      clone.URLGambar=imageURL
      return clone
    });
  }


  const submitArticle = async () => {
    console.log('trivia status',trivias.status)
    if (artikel.judul === '' || artikel.kategori === 'None' || artikel.isi === '' || artikel.deskripsi === '') {
      toast.error('Ada field artikel yang masih kosong!');
      return;
    }
    if(trivias.status){
      console.log('status aktif bos')
      if (triviadata.every((items, index)=>{
        const questionValid = items.question && items.question.trim() !== ''
        const optionsValid = items.options.every((opt,idx)=>{
          const optionsIndexValid = opt && opt.trim() !== ''
          return optionsIndexValid
        })
        const answerValid = items.answer && items.answer.trim() !== ''
        return questionValid && optionsValid && answerValid
      }) === false){
        toast.error('Ada field trivia yang masih kosong!');
        return;
      }
    }
    const responseGambar = await uploadGambar(artikel.gambar);
    if (!responseGambar) return;
    try {
      setArtikel((prev)=>{
        const clone = {...prev}
        clone.isLoading = false 
        return clone
      })
      const response = await fetch('/api/submitArticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judulArtikel:artikel.judul,
          kategoriArtikel: artikel.kategori,
          isiArtikel:artikel.isi,
          deskripsiArtikel:artikel.deskripsi,
          gambarArtikel: responseGambar,
          Trivia: trivias.status
        }),
      });
      console.log('ini response : ',response)
      if (response.ok) {
        toast.success('Hore! artikel kamu berhasil diupload!!');
        const id = await response.json()
        if (trivias.status) {          
          const triviaResponse = await fetch('/api/submitTrivia', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              triviadata,
              externalData:{
                id:id.id,
                UserID: user.userData?.sub
              }
            }),
          });
          if (triviaResponse.ok) {
            toast.success('Trivia berhasil disubmit!');
          } else {
            toast.error('Gagal mengirim trivia.');
          }
        }  
        setArtikel({judul:'', kategori:'None', isi:'', deskripsi:'',gambar:'',image:'',isLoading:false})
        setData(
          Array(totalArray).fill(null).map(()=>(
            {
              question:'',
              options:[],
              answer:'A'
             }
          )))
        setTrivias((prev)=>{
          prev.status=false
          prev.buttonAnm=false
        })
        inputFileRef.current.value = '';
  
      }else {
        toast.error('Kesalahan saat mengirim, silahkan dicoba kembali');
      }
    } catch (e) {
      console.log(e);
      toast.error('Kesalahan saat mengirim, silahkan dicoba kembali');
    }
  }; 
    return(
      <>
        <div id="create-article-button-wrapper" className="fixed z-50 flex inset-0  pointer-events-none justify-end items-end m-10">
            <motion.button
            initial={{
              backgroundColor:'#195905',
              color:'#ffffff',
              boxShadow:'0 0 0 4px #ffffff'
            }}
            whileHover={{
              backgroundColor:'#ffffff',
              color:'#195905',
              boxShadow:'0 0 0 6px #af2'
            }}
            transition={{
              duration:0.01
            }}
             id="create-article-button" className='flex cursor-pointer pointer-events-auto  py-4 px-2 transition font-bold rounded-full' 
             onClick={()=>setModal((prev)=>{
              const displayModal = !prev
                document.body.style.overflow= displayModal?'hidden':'auto'
              return displayModal
              })}>

              {!user.userLoading?(
                user.userLogged?(
                  <motion.span 
                  className="text-xl pl-2 my-1 ml-1">  
                    Create Article
                  </motion.span>
                ):(
                  <a href="/api/auth/login" className="text-xl pl-2 my-1 ml-1">Login Untuk Create Article</a>
                )
              ):(
                <span className="p-2 gap-2 flex flex-row">
                  <Loader2 className="text-4xl animate-spin"/>
                  Loading...
                </span>
              )
              }
              <FaPencilAlt className="mt-2 ml-3 mr-2 size-6"/>
            </motion.button>
          </div>
          <AnimatePresence>
            {displayModal && (
              <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:0.3}}
                className={`fixed flex-col overflow-auto  bg-white inset-0 z-50 flex transition-opacity duration-500 `}
              >
                <div className="flex pointer-events-none fixed w-full cursor-pointer h-20 justify-end items-center text-red-500 font-bold text-xl hover:text-red-700 z-50">
                  <button 
                  onClick={()=>setModal((prev)=>{
                    const displayModal = !prev
                      document.body.style.overflow= displayModal?'hidden':'auto'
                    return displayModal
                    })}
                  className="scale-200 pointer-events-auto rounded-full mr-10 bg-white border-2 border-gray-500  w-8 flex justify-center items-center cursor-pointer">
                    &times;
                  </button>
                </div>

                <div className="  flex mt-3 py-4 outline-double outline-8 outline-emerald-900 justify-center">
                  <h2 className="text-2xl font-bold text-gray-800 ">Tulis Artikel Kamu!</h2>
                </div>

                <div id="content-wrapper" className="font-semibold  inset-0 flex flex-col flex-1 m-10 text-black rounded-xl outline-double outline-8 outline-green-800">
                  <div className=" flex bg-green-400 rounded-t-xl justify-center">
                    <button className="text-white -my-4 z-20 bg-emerald-500 px-8 py-4 -ml-4 border-2 rounded-lg pointer-events-none ring-4 outline-2 outline-double ring-emerald-600">TRIHIVE</button>
                  </div>
                  
                  <div className="mt-10 ml-10">
                    <button 
                    onClick={()=>inputFileRef.current.click()}
                    className="bg-gray-500 cursor-pointer hover:text-gray-600 hover:bg-white hover:border-gray-900 font-bold border-2 border-neutral-800 transition duration-200 text-white -m-2 px-5 py-2 rounded-xl">
                      Upload Article image
                    </button>
                      <input 
                      id="" 
                      type="file" 
                      name="file-input"
                      ref={inputFileRef}
                      onChange={(e)=>handleImageClick(e)}
                      className="bg-red-500 hidden"/>
                  </div>
                  {artikel.URLGambar && (
                    <div className=" m-10 w-[400] h-[300] bg-neutral-400 border-2 rounded-2xl flex justify-center">
                      <img src={artikel.URLGambar} className="max-w-full max-h-full object-contain rounded-xl border-2" alt="tdk ada gambar" />
                    </div>
                    )
                  }
                  <div className="">
                      <div className="relative inset-0 flex mx-10 m-3 mt-2">
                        <h1 className="text-xl bg-emerald-400 rounded-e-xl text-white p-2 pl-10 pr-4 -ml-12 border">
                          Kategori
                        </h1>
                      </div>
                      <div className="relative inset-0 flex m-10 my-1 text-black font-normal">
                        <select className="border-2" 
                        value={artikel.kategori}
                        onChange={(e)=>setArtikel((prev)=>{
                          const clone = {...prev}
                          clone.kategori=e.target.value
                          return clone} 
                        )}
                        name="category"
                        id="kategori-artikel">
                          {['None','Sosiologi','Biologi','Geografi'].map((items,index)=>{
                            return(
                            <option key={index} value={items}>
                              {items}
                            </option>
                            )
                          })
                          }
                        </select>
                      </div>
                    </div>
                  {['Judul','Isi','Deskripsi'].map((items,index)=>{
                    return(
                    <div key={index} className="flex flex-col m-10 mt-6 mb-0  pb-2">
                      <div className="flex flex-row">
                        <h1 className="text-xl bg-emerald-400 rounded-e-xl text-white p-2 pl-10 pr-4 -ml-12 border">
                          {items} Artikel
                        </h1>
                      </div>
                      <div className={`flex mt-3 my-1 h-10 w-full
                        ${items==='Isi'&&("resize-y min-h-[800px] max-h-[800px] w-full border-gray-300 border-2 rounded-xl")}
                        ${items==='Deskripsi'&&('resize-y min-h-[100px] max-h-[500px] w-full text-black border-2 border-gray-300 rounded-xl')}`}>
                        <textarea 
                        value={artikel[items.toLowerCase()]}
                        onChange={(e)=>setArtikel((prev)=>{
                          const clone = {...prev}
                          clone[items.toLowerCase()]=e.target.value
                          console.log('ini clone ya',artikel)
                          return clone
                        })}
                        className={`size-full resize-none text-black border-2 border-gray-300 rounded-xl p-1 }`} 
                        placeholder={`Berikan ${items.toLowerCase()} artikel terbaikmu!`}></textarea>
                      </div>     
                    </div>
                    )
                  })}
                        
                        <div className="">
                            <div className="bg-emerald-400 gap-4 justify-center items-center flex flex-row rounded-xl text-white px-4 py-2  ">
                              <h1 className="text-xl">
                                {trivias.status?'Bangun triviamu!':'Buat trivia?'}
                              </h1>
                              <motion.div 
                              onMouseEnter={()=>setTrivias((prev)=>{
                                const clone = {...prev}
                                clone.buttonAnm=true
                                return clone
                              })}
                              onMouseLeave={()=>setTrivias((prev)=>{
                                const clone = {...prev}
                                clone.buttonAnm=false
                                return clone
                              })}
                              onClick={()=>setTrivias((prev)=>{
                                prev={
                                  status:!prev.status,
                                  buttonAnm:!prev.buttonAnm
                                }
                                return prev
                              })}
                              animate={trivias.buttonAnm?{boxShadow:'0 0 0 3px #228b22',transition:{duration:0.3}}:{...trivias.status?{}:{}}}
                              className="rounded-full cursor-pointer h-8 w-8 bg-white"> 
                                <motion.button
                                initial={{backgroundColor:'#00ff00',scale:0}}
                                animate={trivias.buttonAnm?{scale:0.2}:{...trivias.status?{scale:1,backgroundColor:'#32cd32',boxShadow:'0 0 0 2px #2a8000'}:{}}}
                                className="h-full cursor-pointer w-full rounded-full">
                                </motion.button>
                              </motion.div>
                            </div>
                          {/* </div> */}
                        </div>
                        <AnimatePresence>
                        {
                          trivias.status&&(
                            Array(totalArray).fill(null).map((item,containerIndex)=>(
                            <motion.div
                              key={containerIndex}
                              initial={{
                              translateY:200,
                              opacity:0}}
                              animate={{
                                translateY:0,
                                opacity:1
                              }}
                              transition={{duration:0.3}}
                              exit={{opacity:0,translateY:200,transition:{duration:0.3}}}
                              className="">
                                <div className="relative inset-0 flex mx-10 m-3">
                                  <h1 className="text-xl bg-emerald-400 rounded-e-xl text-white p-2 pl-10 pr-4 -ml-12 border">
                                    Soal Nomor {containerIndex+1}
                                  </h1>
                                </div>

                                <div className="relative flex-col inset-0 flex m-10 my-1">
                                  <textarea id="soal-trivia" 
                                  value={triviadata[containerIndex].question}
                                  onChange={(e)=>setData(prev=>{
                                    const clone = [...prev]
                                    clone[containerIndex].question = e.target.value
                                    return clone;
                                  })}
                                  className="resize-none min-h-[100px] max-h-[500px] w-full text-black border-2 border-gray-300 rounded-xl p-1 pl-3"
                                  placeholder="Berikan pertanyaan terbaikmu!"
                                  required>

                                  </textarea>
                              
                                  <div className="rounded-xl items-center grid grid-cols-2 gap-2 h-[200]">
                                    {
                                      ['A','B','C','D'].map((optionValue,optionIndex)=>(
                                        <div
                                        key={optionValue} 
                                        className=" h-full flex flex-col"> 
                                          <h1>
                                            Opsi {optionValue}
                                          </h1>
                                          <textarea 
                                          value={triviadata[containerIndex].options[optionIndex]}
                                          key={optionValue} 
                                          onChange={(e)=>setData(prev=>{
                                            const clone = [...prev]
                                            clone[containerIndex].options[optionIndex] = e.target.value
                                            return clone;
                                          })}
                                          id={`opsi-trivia-${optionIndex}`} 
                                          className="rounded-2xl resize-none border-gray-300 p-2 border-2 size-full">
                                          </textarea>
                                        </div>
                                      ))
                                    }
                                  </div>
                                  <div className="flex flex-col">
                                    <span>
                                      Jawaban:
                                    </span>
                                    <select  
                                    value={triviadata[containerIndex].answer}
                                    onChange={(e)=>setData(prev=>{
                                      const clone =[...prev]
                                      clone[containerIndex].answer=e.target.value
                                      return clone
                                    })}
                                    className="border-2 rounded-2xl w-20"
                                    id="">
                                      {
                                        ['A','B','C','D'].map((answerIndex)=>(
                                          <option 
                                          className="self-center" 
                                          key={answerIndex} value={answerIndex}>
                                            {answerIndex}
                                          </option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                </div>
                                            
                            </motion.div>
                            ))
                          )
                        }
                        </AnimatePresence>


                        <div className="relative flex bg-green-400 mt-8 rounded-b-xl">
                          {artikel.isLoading ?(
                            <button onClick={submitArticle} 
                            className="ml-auto text-white cursor-pointer hover:bg-white hover:border-green-950 hover:text-green-950 transition duration-200 -mb-4 bg-green-700 px-5 py-2 -mr-4 border-2 rounded-xl"> 
                              <span>Submit</span>
                            </button>    
                          ):
                          (
                            <button onClick={submitArticle} 
                            className="ml-auto text-white -mb-4 bg-green-700 px-5 py-2 -mr-4 border-2 rounded-xl">
                              
                              <span className="flex"><Loader2 className="animate-spin"/>Mengirim..</span>
                            </button>
                          )
                        }
                        </div>
                      </div>
                    </motion.div>
            )}
          </AnimatePresence>

        </>
    )
}