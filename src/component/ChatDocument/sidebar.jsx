import { slide as Menu } from 'react-burger-menu';
import './sidebar.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Sidebar = ({data})=>{
    
    const navigate = useNavigate()
    const [file,setFile] = useState()
    const [menuState,setMenuState] = useState(true)
    const [items,setItems] = useState([])
    const [error,setError] = useState([])
    const config =  {
      headers :{
          "Content-Type": "application/json"
      }
    }
    const SubmitFile = async(e)=>{
      e.preventDefault()
      // console.log(file)
      const formData = new FormData()
      formData.append('file',file)
      const response = await axios.post("http://15.206.216.109:4000/post",formData)
      console.log(response.data.error)
      setError(response.data.error)
      setMenuState(false)
      data(file.name)
    } 
    const updateFile = (e)=>{
      setMenuState(true)
      setFile(e.target.files[0])
    }
    const getItems = async()=>{
      const response = await axios.get("http://15.206.216.109:4000/getVectorStore")
      setItems(response.data.store)
      setMenuState(true)
    }

    const selectFile =async (e)=>{
      e.preventDefault()
      setMenuState(false)
      data(e.target.value)
     
    }
    useEffect(()=>{
       getItems()
    },[])
    return(
        <Menu isOpen = {menuState}>
          <h1>upload File</h1>
          <div>
            <form action="" encType='multipart/form-data' onSubmit={SubmitFile}>
              <input className="inputstyle" type="file" name='file' onChange={updateFile}/>
              <input className='submit' type="submit" value="submit"/>
            </form>
            <br />
            <br />
            {error}
            {/* {d ? <Navigate to="/chat"></Navigate>:null} */}
            
            <div>
              <hr/>
              <h1>Select File from Here</h1>
                <div className="scroll-container">
                  <ol className="item-list">
                    {items?.map((item,index)=>
                    
                    <input className='list-input' key={index} value={item} onClick={selectFile} readOnly/>
                    
                    )}
                  </ol>
                </div>
            </div>
            <button className="button1" onClick={()=>{
                navigate('/')
            }}>Go to home</button>
          </div>
        </Menu>
    )
}

export default Sidebar