import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { Navigate } from 'react-router-dom'
import "./upload.css"
import { useNavigate } from 'react-router-dom'
const Upload = ({files})=>{
  const [file,setFile] = useState()
  const [d,setData] = useState('')
  const fileReader = new FileReader();
  const SubmitFile = async(e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('file',file)
    const response = await axios.post("http://15.206.216.109:4000/post",formData)
    setData("setData",response.data)
  }
  files(file)
  const updateFile = (e) =>{
    setFile(e.target.files[0])
  }
  return (
    <>
      <div>
        <form action="" encType='multipart/form-data' onSubmit={SubmitFile}>
          <input className="inputstyle" type="file" name='file' onChange={updateFile}/>
          <input className='submit' type="submit" value="submit"/>
        </form>
        {d ? <Navigate to="/chat"></Navigate>:null}
      </div>
    </>
  )
}


export default Upload