import { useState,useRef } from "react"
import axios from "axios"
import Plot from 'react-plotly.js';
import "./Chat.css"
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Sidebar from "./sidebar";
import {CiLocationArrow1} from "react-icons/ci"
import {BsFillPersonFill} from "react-icons/bs" 
import {BiBot} from "react-icons/bi"

const Chat = () =>{
    const [chat,setChat] = useState(["Please Ask Question"])
    const [data,setData] = useState(false)
    const [file,setFile] = useState()
    const [error,setError] = useState()
    // const [filename,setFileName] = useState("")
    const [isloader,setisLoader] = useState(false)
    const [prompt,setPrompt] = useState()
    const scrollableContainerRef = useRef()

    const scrollToBottom = () => {
        if (scrollableContainerRef.current) {
          scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    };
    const receivedata = (data)=>{
        setFile(data)
        setData(true)
    }
    const config =  {
        headers :{
            "Content-Type": "application/json"
        }
    }
    const submitForm =async (e)=>{
        e.preventDefault()
        if(chat.length%2!==0){
            const formData = new FormData()
            formData.append('filename',file)
            formData.append('prompt',prompt)
            setChat(chat=>[...chat,prompt])
            setisLoader(true)
            const response = await axios.post("http://15.206.216.109:4000/chatpdf",formData,config)
            setError(response.data.error)
            console.log(response.data.messages)
            setChat(chat=>[...chat,response.data.messages])
            scrollToBottom();
            setisLoader(false)
        }
        
    }
    if(error){
        setisLoader(false)
    }
    const onChange = (e)=>{
        setPrompt(e.target.value)
    }
    
    return(
        <>
        <Sidebar data={receivedata} />
        {data ? 
        <div>
            <h1 className="h1">Chat with {file}</h1>
       
            <div className="container-wrapper">
            <button className="clearbtn" onClick={()=>{
                    setChat(["Please Ask Question"])
                }}>
                    Clear Chat
                </button>
                <div className="container1">
                    <form onSubmit={submitForm} className="chat">
                        
                        <input className="question" type="text" placeholder="Enter Question" onChange={onChange} />

                        <button className="button" type="submit" value="submit"><CiLocationArrow1  /></button>
                    </form>
                    <div >
                        <div className="overflow" ref={scrollableContainerRef}>
                            {chat.map((item,index)=>{
                                if (index%2===0) {
                                    return(
                                        <div key={index} className="chatbot">
                                            <BiBot className="img"/>
                                            <p>{item}</p>
                                            {/* <button> Show Script</button> */}
                                        </div>
                                        )
                                }
                                else{
                                    return(
                                        <div key={index} className="human">
                                            <BsFillPersonFill className="img1"/>
                                            <p>{item}</p>
                                        </div>
                                        )
                                }
                            })
                            }
                            {isloader? <Loader />:null}
                            {error}
                        </div>
                        
                        {/* <h1>Observation: {answer.intermediateSteps[0].observation}</h1> */}
                    </div>
                </div> 
                

            </div>
        </div>
                : 
                <div className="container">
                    <h1 className="heading">Please Choose file first!!!</h1>
                </div>
        }
        
        </>
    )
}
export default Chat