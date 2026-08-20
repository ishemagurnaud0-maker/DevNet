import { NextRequest,NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Event from "@/database/events.model"
import {v2 as cloudinary} from "cloudinary";
import type {IEvent} from "@/database/events.model"

export const POST = async(req: NextRequest) => {
    try{
       
        await connectDb();

        const formData = await req.formData();
        let event;

        try{
            event = Object.fromEntries(formData.entries());
        }catch(e){
            return NextResponse.json({message:"Invalid JSON data format."}, {status:400});
        }
            const file = formData.get('image') as File;

            if(!file) return NextResponse.json({message:"Please upload an image for the event."},{status:400});

            let tags = JSON.parse(formData.get('tags') as string);
            let agenda = JSON.parse(formData.get('agenda') as string);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise<{ secure_url: string }>((resolve,reject) => {
                cloudinary.uploader.upload_stream({resource_type:'image', folder: 'events'}, (error,results) => {
                    if(error) return reject(error);
                    resolve(results as { secure_url: string });
                }).end(buffer);
            });

            event.image = uploadResult.secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda
        });
        console.log(`The event with ${event.title} title has been created.`);

        return NextResponse.json({message:`The ${event.title} event has bee created.`, event: createdEvent}, {status:201});

    }catch(err){
        console.log(err);
       return NextResponse.json(
        {
          message: "Event creation failed.",
          error: err instanceof Error ? err.message : "Unknown",
          status: 500
    });
 }
}


export const GET = async(req: NextRequest): Promise<NextResponse> => {
    try{
        await connectDb();

        const events: IEvent[] = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({message:"Available events.", events},{status:200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Fetching events has failed."},{status:400});
    }
}