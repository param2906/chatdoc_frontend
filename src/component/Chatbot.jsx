import axios from "axios"
import { useState } from "react"
import { BubbleChat } from 'flowise-embed-react'

const Chatbot = ()=>{
    const [question,setQuestion] = useState()
    const [answer,setAnswer] = useState()
    const config =  {
        headers :{
            "Content-Type": "application/json"
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const result = axios.post("http://localhost:3000/api/v1/prediction/401480d8-0085-4248-98ce-ed1f913763f3",question,config)
        setAnswer(result.data)
    }
    
    const onChange = (e)=>{
        setQuestion(e.target.value)
    }
    return(
        <>
        <div>
            {/* <form action="" onSubmit={handleSubmit}>
            <label htmlFor="input">Enter Prompt</label>
            <input type="text" placeholder="enter prompt" onChange={onChange}/>
            <button type="submit">Submit</button>
            </form>
            {question? <p>Human: {question}</p>:null}
            {answer? <p>BOt: {answer}</p>:null} */}
            <BubbleChat chatflowid="401480d8-0085-4248-98ce-ed1f913763f3" apiHost="http://localhost:3000" />
        </div>
        </>
    )
}
export default Chatbot