import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const registerOtp = asyncHandler(async (req, res) => {
  try {
    const { otp, mobileNumber, success } = req.body;
     
    // Ensure otp exists and is a valid string
    if (!otp || typeof otp !== 'string') {
      throw new ApiError(400, "OTP is required and must be a string");
    }

    // Log otp for debugging purposes
   
   
    // Find the user by mobile number
    const user = await prisma.user.findFirst({
      where: { mobileNumber },
    });
    
    // If user doesn't exist, throw an error
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // If success is true, update the user verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verify: success },
    });
    
    // console.log(updatedUser);

    // Create a new OTP record, ensure otp is a string
    const userOtp = await prisma.otp.create({
      data: {
        otp, // Ensure OTP is a string
         user:{
            connect: { id: user.id }
         }
       
      },
    });
    console.log("d;jlfjfjj;fjj")
    // Send response based on the success flag
    const message = success ? "OTP sent successfully" : "OTP created successfully";
    return res.status(201).json(new ApiResponse(201, otp, message));
    
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { registerOtp };
