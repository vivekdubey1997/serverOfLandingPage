import dotenv from "dotenv"
import {app} from './app.js'
dotenv.config({
  
})
console.log(" hi connected to vercel ")
app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})



