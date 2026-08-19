import Event from '@/database/events.model';
import connectDb from '@/lib/mongodb';
import IEvent from '@/database/events.model'


const getEventBySlug = async(slug: string) :Promise<typeof IEvent> {
    try{
        await connectDb();

        const properSlug

    }catch(err){
        console.log(err);
        throw err;
    }


}