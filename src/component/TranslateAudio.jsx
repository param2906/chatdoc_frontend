import axios from "axios"
import { useState, useEffect } from "react"
import './TranslateAudio.css'

const TranslateAudio = () => {
    const [data, setData] = useState("")
    // useEffect(() => {
        
    //     console.log("call");
    // }, [])
    const SubmitFile = (e)=>{
        e.preventDefault()
        getData()
    }
    const getData = async () => {
        const response = await axios.get("http://localhost:4000/translateAudio")
        console.log(response.data)
        const result = response.data.result[0].pageContent
        setData(result)
    }
    return (
        <>
            <div>
                <form action="" encType='multipart/form-data' onSubmit={SubmitFile}>
                {/* <input className="inputstyle" type="file" name='file' onChange={updateFile}/> */}
                <input className='submit' type="submit" value="submit"/>
                </form>
            </div>
            {data}
        </>
    )
}
export default TranslateAudio