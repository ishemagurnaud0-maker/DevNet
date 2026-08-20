import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/lib/mongodb";
import  Event  from "@/database/events.model";
import type {IEvent} from "@/database/events.model";



const GET = async(req:NextRequest, {params}: {params: Promise<{slug: string}>}): Promise<NextResponse> => {
    try{
        await connectDb();

        const { slug } = await params;
        if(!slug || typeof slug != 'string' || slug.trim() === '') {
            return NextResponse.json({
                message:"Invalid or missing slug parameter."},
                {status:400}
            );
        }

        const properSlug = slug.trim().toLowerCase();

        const event: IEvent = await Event.findOne({slug: properSlug}).lean();

        if(!event) return NextResponse.json({message:"This event does not exist."},{status:404});

        return NextResponse.json({message: "The event was fetched successfully", event},{status:200});

    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Failed to fetch this event."},{status:500});
    }
}