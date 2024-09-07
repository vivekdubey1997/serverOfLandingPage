import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req, res) => {
    const { mobileNumber, sendStatus } = req.body;

    // Check if the user already exists based on the mobile number
    const findUser = await prisma.user.findFirst({
        where: {
            mobileNumber,
        },
    });

    // If user exists, increment their clicks count
    if (findUser) {
        await prisma.user.update({
            where: {
                id: findUser.id,
            },
            data: {
                clicks: {
                    increment: 1,
                },
            },
        });
    }

    // Create a new user every time
    const createdUser = await prisma.user.create({
        data: {
            mobileNumber,
            sendStatus,
            clicks: findUser ? findUser.clicks + 1 : 1, // Increment clicks if user exists, otherwise set it to 1
        },
    });

    // Return a success response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                otps: true,
            },
        });
        return res.status(200).json(
            new ApiResponse(200, users, "Users fetched successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "Error fetching users")
        );
    }
});

export {
    registerUser,
    getAllUser,
};
