'use server'

import connectDb from '@/lib/mongodb';
import type { IBooking, IEvent } from '@/database';
import Booking from '@/database/bookings.model';
import Event from '@/database/events.model'



 export const createBooking = async(email: string, slug: string) => {
        await connectDb();
    
        try{
            
            const event: IEvent = await Event.findOne({slug}).lean();
            

            const sanitizedEmail = email.trim().toLowerCase();
            const booking = {
                eventId: event._id,
                email: sanitizedEmail,
            }

            await Booking.create(booking);

            return{
                success:true,
                message: `You have successfully booked a spot at the ${event.title}`,
                
            }


        }catch(error){
            console.error(error);
            return {
                success:false,
            }
        }
}

