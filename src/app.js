import express from 'express'
import cors from "cors"
const app = express()


app.use(
  cors({
    origin: '*',
    credentials:true
  })

)


app.use(express.json())

app.use(express.urlencoded({extended:true,}))

import userRouter from './routes/user.routes.js'
import  otpRouter  from './routes/otp.routes.js'
app.use("/api/v1/users", userRouter)
app.use("/api/v1/otp",otpRouter)
export {app}



