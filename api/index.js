const express = require('express') // Iniciar servidor backend
const app = express() // Iniciar aplicacion en el servidor
const dotenv = require('dotenv') // Para ocultar credenciales
const mongoose = require('mongoose') // Para conectar con base de datos
const multer = require('multer')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

// Routes
const authRoute = require('./routes/auth') // Para conectar con base de datos
const usersRoute = require('./routes/users')
const userRoute = require('./routes/user') // Para conectar con base de datos
const postsRoute = require('./routes/posts')// Para conectar con base de datos
const postRoute = require('./routes/post')
const commentsRoute = require('./routes/comments')
const visitasRoute = require('./routes/visitas')
const usersNuevosRoute = require('./routes/usersNuevos')
const categoryRoute = require('./routes/categories')// Para conectar con base de datos

app.use(cors())

// socket conf
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
})
let count = 0
io.on('connection', (socket) => {
  if (socket.id) {
    socket.emit('count', { count })
    count = count + 1
  }
})

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Conectado a mongo'))
  .catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('El archivo a sido subido')
})

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/user', userRoute)
app.use('/api/posts', postsRoute)
app.use('/api/post', postRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/visitas', visitasRoute)
app.use('/api/usersNuevos', usersNuevosRoute)

server.listen(7000, () => {
  console.log('Server Runnig')
})
