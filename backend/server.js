import dotenv from 'dotenv'
dotenv.config()

//External Import
import cookieParser from 'cookie-parser'
import cors from 'cors'
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
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/message', msgRoutes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Connected to PORT ${PORT}`)
    connectDb()
})