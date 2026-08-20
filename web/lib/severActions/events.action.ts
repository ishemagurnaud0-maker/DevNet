'use server';

import Event from '@/database/events.model';
import connectDb from '@/lib/mongodb';
import type {IEvent} from '@/database/events.model'


 export const getSimilarEventBySlug = async(slug: string): Promise<IEvent[]> => {
    try{
        await connectDb();

        const event = await Event.findOne({slug});
        const similarEvents: IEvent[] = await Event.find({ _id: { $ne: event._id}, tags: { $in: event.tags} }).lean();

        return similarEvents;

    }catch(err){
        console.log(err);
        return [];
    }


}
 