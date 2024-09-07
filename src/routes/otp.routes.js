import { Router } from "express";
import { 
    registerOtp
} from "../controllers/otp.controller.js";




const router = Router()

router.route("/send").post( registerOtp )


export default router