import { Router } from "express";
import { 
    registerUser, 
    getAllUser
} from "../controllers/user.controller.js";




const router = Router()

router.route("/register").post( registerUser )
router.route("/").get(getAllUser)


export default router