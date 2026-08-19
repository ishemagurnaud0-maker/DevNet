import {Document, model, models, Schema, Types} from "mongoose";
import Event from "./events.model";
import { ThumbsUpIcon } from "lucide-react";

 export interface IBooking extends Document {
   eventId:Types.ObjectId;
   email:string;
   createdAt:Date;
   updatedAt:Date; 
}


const BookingSchema = new Schema<IBooking>(
    {
        eventId:{
            type:Schema.Types.ObjectId,
            ref:'Event',
            required:[true, "Event id is needed."]
        },
        email:{
            type:String,
            required:[true, "Email is required."],
            trim:true,
            lowercase:true,
            validate:{
                validator: (email:string) =>{
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return emailRegex.test(email);
                },
                message:"Please provide a valid email address."
            }
        },
    },
    {
        timestamps:true
    }
);

BookingSchema.pre('save',async function() {
        

        if (this.isModified('eventId') || this.isNew) {
            try {
              const eventExists = await Event.findById(this.eventId).select('_id');
        
              if (!eventExists) {
                const error = new Error(`Event with ID ${this.eventId} does not exist`);
                error.name = 'ValidationError';
                
              }
            } catch {
              const validationError = new Error('Invalid events ID format or database error');
              validationError.name = 'ValidationError';
              
            }
          }
        
   
    
});

BookingSchema.index({ eventId: 1 });

// Create compound index for common queries (events bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookups
BookingSchema.index({ email: 1 });

// Enforce one booking per events per email
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email' });
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;