import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import ScrollTop from '../components/scrollTop/ScrollTop'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/home/Home'
import Posts from '../components/posts/Posts'
import Write from '../pages/write/Write'
import SinglePost from '../components/singlePost/SinglePost'
import TableUsers from '../pages/TableUsers/TableUsers'
import TablePosts from '../pages/tablePosts/TablePosts'
import Contact from '../pages/contact/Contact'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import PrivateRoute from './PrivateRoute'
import Settings from '../pages/settings/Settings'
import { useContext, useState } from 'react'
import { Context } from '../context/Context'
import Single from '../pages/single/Single'
import Dashboard from '../pages/dashboard/Dashboard'

export default function AppRouter () {
  const { user } = useContext(Context)

  const [loading, setLoading] = useState(true)
  const spinner = document.getElementById('spinner')

  if (spinner) {
    setTimeout(() => {
      spinner.style.display = 'none'
      setLoading(false)
    }, 2000)
  }
  return (
    !loading && (
      <>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/posts' element={<PrivateRoute><Posts /></PrivateRoute>} />
            <Route exact path='/dashboard' element={<PrivateRoute hasRole='admin'><Dashboard /></PrivateRoute>} />
            <Route exact path='/post/:postId' element={<PrivateRoute><SinglePost /></PrivateRoute>} />
            <Route exact path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route exact path='/perfil/:username' element={<PrivateRoute><Single /></PrivateRoute>} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/write' element={<PrivateRoute><Write /></PrivateRoute>} />
            <Route exact path='/tableUsers' element={<PrivateRoute hasRole='admin'><TableUsers /></PrivateRoute>} />
            <Route exact path='/tablePosts' element={<PrivateRoute hasRole='admin'><TablePosts /></PrivateRoute>} />
            <Route exact path='/login' element={user ? <Home /> : <Login />} />
            <Route exact path='/register' element={<Register />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ScrollTop />
        </Router>
      </>)
  )
}
