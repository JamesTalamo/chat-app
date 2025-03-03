//External Import
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { cloudinaryConfig } from './library/cloudinary.js'
cloudinaryConfig() // cloudinary config

//Internal Imports
import connectDb from './library/connectDb.js'


//Routes
import authRoutes from './routes/Users.routes.js'
import msgRoutes from './routes/Message.routes.js'


//Main Server
import express from 'express'
// const app = express()
import { app, server } from './library/socket.js'

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/message', msgRoutes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Connected to PORT ${PORT}`)
    connectDb()
})