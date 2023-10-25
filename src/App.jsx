import './App.css'
import axios from 'axios'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Chat from './component/ChatDocument/Chat'
import Chatbot from './component/Chatbot'
import DatabaseChat from './component/ChatDatabase/DatabaseChat'
import Upload from './component/ChatDocument/upload'
import Home from './component/Home'
import Loader from './component/Loader'
import TranslateAudio from './component/TranslateAudio'

function App() {
  const [fileName,setFileName] = useState()
  const receivefile = (data) =>{
    setFileName(data)
  }
  return(
    <>
    <Routes>
      <Route path='/loader' element={<Loader />}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/upload' element={<Upload files={receivefile}/>}></Route>
      <Route path='/chat' element={<Chat filename={fileName}/>}></Route>
      <Route path='/chatbot' element={<Chatbot/>}></Route>
      <Route path='/chatwithdatabase' element={<DatabaseChat/>}></Route>
      <Route path='/audio' element={<TranslateAudio/>}></Route>
    </Routes>
    </>
  )
}

export default App
