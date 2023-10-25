import axios from "axios"
import { useLayoutEffect, useState,useRef } from "react"
import Loader from "../Loader"
import Sidebar from "./sidebar"
import "./InputDatabase.css"
import chatbot from "../../assets/chatbot.jpg"
import {BiBot} from "react-icons/bi"
import {CiLocationArrow1} from "react-icons/ci"
import {BsFillPersonFill} from "react-icons/bs"


const InputDatabase = ({database})=>{
    const [chat,setChat] = useState(["Please Ask Question From Database"])
    const [data,setData] = useState(false)
    const [file,setFile] = useState()
    const [error,setError] = useState()
    const [loader,setLoader] = useState(false)
    const [question,setQuestion] = useState("")
    const [postgres,setPostgres] = useState({
        host:"",
        port:4564,
        username:"",
        password:"",
        databasename:""
    })
    const scrollableContainerRef = useRef()

    const scrollToBottom = () => {
        if (scrollableContainerRef.current) {
          scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
      };
    const receivedata = (data)=>{
        setData(true)
         if(database==="sqlite"){
            setFile(data)
         }
         else{
            setPostgres(data)
         }
    }
    const config =  {
        headers :{
            "Content-Type": "application/json"
        }
    }
    const SubmitFile = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        let response
        setLoader(true)
        setChat(chat=>[...chat,question])
        if(database==="sqlite"){
            formData.append("prompt",question)
            formData.append('file',file)
            formData.append('type',database)
            response = await axios.post("http://15.206.216.109:4000/chatDatabase",formData)
        }
        else if(database==="postgres"){
            formData.append("prompt",question)
            formData.append('postgres',JSON.stringify(postgres))
            formData.append('type',database)
            response = await axios.post("http://15.206.216.109:4000/chatDatabase",formData,config)

        }
        setLoader(false) 
        setChat(chat=>[...chat,response.data.result.output])
        
        // setChat(chat=>[...chat,"afahgfkjagfkjhabdkasjhvkbaskvhbasdjkvb"])
        
    }
    const onChange = (e)=>{
        setQuestion(e.target.value)
    }
    useLayoutEffect(()=>{
        scrollToBottom();
    },[chat])
    // const listQuestion =  chat.forEach()
    return(
        <>   
        <Sidebar database={database} data={receivedata}/> 
        {data ? 
        <div>
            <h1 className="h1">Chat with Database</h1>
            <div className="container1">
                <form onSubmit={SubmitFile} className="chat">
                    
                    <input className="question" type="text" placeholder="Enter Question" onChange={onChange} />

                    <button className="button" type="submit" value="submit"><CiLocationArrow1  /></button>
                </form>
                <div >
                    <div className="overflow" ref={scrollableContainerRef}>
                        {chat.map((item,index)=>{
                            if (index%2===0) {
                                return(
                                    <div className="chatbot">
                                        <BiBot className="img"/>
                                        <p>{item}</p>
                                        {/* <button> Show Script</button> */}
                                    </div>
                                    )
                            }
                            else{
                                return(
                                    <div className="human">
                                        <BsFillPersonFill className="img1"/>
                                        <p>{item}</p>
                                    </div>
                                    )
                            }
                        }   
                        )}
                        {loader? <Loader />:null}
                    </div>
                    
                    {/* <h1>Observation: {answer.intermediateSteps[0].observation}</h1> */}
                </div>
            </div> 
        </div>
                : 
                <div className="container">
                    <h1 className="heading">Please Enter The Credential from the Sidebar First!!!!</h1>
                </div>
            
            } 
            
        </>
    )
}

export default InputDatabase