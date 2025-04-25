import { createClient } from '@supabase/supabase-js'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Page Imports
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'

/* Font Imports */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing navigate={navigate} supabase={supabase}/>} />
        <Route path="/login" element={<Login navigate={navigate} supabase={supabase}/>} />
        <Route path="/signup" element={<Signup navigate={navigate} supabase={supabase}/>} />
        <Route path="/home" element={<Home navigate={navigate} supabase={supabase}/>} />
        <Route path="/create-post" element={<CreatePost navigate={navigate} supabase={supabase}/>} />
        <Route path="/post/:id" element={<Post navigate={navigate} supabase={supabase}/>} />
        <Route path="/edit-post/:id" element={<EditPost navigate={navigate} supabase={supabase}/>} />
        <Route path="/*" element={<NotFound navigate={navigate} supabase={supabase}/>} />
      </Routes>

    </>
  )
}

export default App
