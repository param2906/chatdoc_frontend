import axios from "axios"
import { useState } from "react"
import { BubbleChat } from 'flowise-embed-react'
import "./DatabaseChat.css"
import InputDatabase from "./InputDatabase"
import Sidebar from "./sidebar"

const DatabaseChat = () =>{
    const [database,setDatabase] = useState()
    
    const selectDatabase = (e)=>{
        setDatabase(e.target.value)
    }
    return(
        <>
            {!database ? 
            <div>
                <div className="custom-select">
                    <select onClick={selectDatabase}>
                        <option value="">Select the Database</option>
                        <option value="sqlite">Sqlite</option>
                        <option value="postgres">Postgres</option>
                        <option value="mysql">My SQL</option>
                    </select>
                </div>
                <br />
                <br />
            </div>
            :<InputDatabase database = {database} />}
            <div>
            <BubbleChat chatflowid="34bb84ed-67ab-4f2d-8925-422daaa6d047" apiHost="http://localhost:3000" />
            </div>
        </>
    )
}

export default DatabaseChat