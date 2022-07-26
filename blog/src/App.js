import React from 'react'
import AuthProvider from './auth/AuthProvider'
import AppRouter from './routers/AppRouter'
// import io from 'socket.io-client'
// import axios from 'axios'
/*
//  Conf socket
const socket = io.connect('https://api-blog-nine.vercel.app')
function App () {
  const [visitas, setVisitas] = useState(0)

  socket.on('count', data => {
    setVisitas(data.count)
  })
  useEffect(() => {
    const enviarVisitas = async () => {
      const newvisitas = {
        total: visitas,
        totalDia: visitas
      }
      try {
        await axios.put('/visitas/62adf849f4f9c09381c80068', newvisitas)
      } catch (err) { console.log(err) }
    }
    enviarVisitas()
  }, [visitas])
*/
function App () {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
