import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } },
        });

        // filter bookings because the above query returns all bookings for that hotel
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            );

            // add userBookings to hotel
            const hotelWithUserBookings : HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            };
            return hotelWithUserBookings;
        });

        // send results only for the current user
        res.status(200).send(results);
    } catch (error) {
        console.log("Error getting bookings:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

export default router;