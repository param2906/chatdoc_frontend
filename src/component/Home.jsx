import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./Home.css"

const Home = ()=>{
    const navigate = useNavigate()

    return(
        <>
            <div className="container">
                <button type="button" onClick={()=>{
                    navigate('/chatwithdatabase')
                }}>Chat with Database</button>
            
                <button type="button" onClick={()=>{
                    navigate('/chat')
                }}>Chat with documnet</button>
                
                <button type="button"onClick={()=>{
                    navigate('/chatbot')
                }}>Chat with bot</button>
                <button type="button"onClick={()=>{
                    navigate('/audio')
                }}>Transcibe audio</button>
            </div>
        </>
    )
}

export default Home