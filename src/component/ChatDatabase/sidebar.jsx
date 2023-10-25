import { slide as Menu } from 'react-burger-menu';
import './sidebar.css'
import { useState } from 'react';

const Sidebar = ({database,data})=>{
    const [file,setFile] = useState()
    const [menuState,setMenuState] = useState(true)
    const [postgres,setPostgres] = useState({
        host:"",
        port:4564,
        username:"",
        password:"",
        databasename:""
    })
    const SubmitFile = async(e)=>{
      e.preventDefault()
      if(database==="sqlite"){
        data(file)
      }
      else if(database==="postgres"){
        data(postgres)
      }
      setMenuState(false)
  }
    const updateFile = (e)=>{
      setFile(e.target.files[0])
    }
    const postgresCredential = (e)=>{
      setMenuState(true)
      setPostgres({
          ...postgres,
          [e.target.name]:e.target.value
      })

    }
    return(
        <Menu isOpen = {menuState}>
          <h1>Set the {database} Credentials</h1>
           {database==="sqlite"?
            <div>
                <form action="" encType='multipart/form-data' onSubmit={SubmitFile}>
                    <input className="inputstyle" type="file" name='file' onChange={updateFile}/>
                    <br />
                    <br />
                    <input className='submit' type="submit" value="submit"/>
                </form>
            </div>
            : null
           }
           {database==="postgres"?
            <div>
                <form action=""  onSubmit={SubmitFile}>
                    <input className="input-prompt" type="text" name="host" onChange={postgresCredential} placeholder="Enert the host" /> 
                    <br />
                    <input className="input-prompt" type="number" name="port" onChange={postgresCredential} placeholder="Enter Port number"/>
                    <br />
                    <input className="input-prompt" type="text" name="username" onChange={postgresCredential} placeholder="Enter Username" />
                    <br />
                    <input className="input-prompt" type="password" name="password" onChange={postgresCredential} placeholder="password"/>
                    <br />
                    <input className="input-prompt" type="text" name="databasename" onChange={postgresCredential} placeholder="Enter Database Name" />
                    <br />
                    <input className="button" type="submit" value="submit"/>
                </form>
            </div>: null
            }
        </Menu>
    )
}

export default Sidebar