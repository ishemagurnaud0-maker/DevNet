import connectDb from '@/lib/mongodb';
import type { IBooking, IEvent } from '@/database';
import Booking from '@/database/bookings.model';
import Event from '@/database/events.model'
import { notFound } from 'next/navigation';


 export const createBooking = async(email: string, slug: string) => {
        await connectDb();
    
        try{
            const event: IEvent = await Event.findOne({slug}).lean();
            if(!event) return notFound();

            const sanitizedEmail = email.split("@")[0].toLowerCase();
            const booking = {
                eventId: event._id,
                email: sanitizedEmail,
            }

            const createdBooking: IBooking = await Booking.create(booking);
            return{
                message: `You have successfully booked a spot at the ${event.title}`,
                booking: createdBooking
            }


        }catch(err){
            console.log(err);
            throw new Error('Failed to create a booking. Please try again later.');
        }
}

