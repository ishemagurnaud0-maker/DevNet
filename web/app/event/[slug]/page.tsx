import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventDetailItem from "@/components/EventDetailItem";
import EventAgenda from "@/components/EventAgenda";
import EventTags from "@/components/EventTags";


type Props = {
  params: Promise<{
    slug: string;
  }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const EventDetailsPage = async({ params }: Props) => {
    const { slug } = await params;
    let event;

    try{
      const request = await fetch(`${BASE_URL}/api/events/${slug}`,{
        next: {revalidate: 60 }
      });

      if(!request.ok) {
          if(request.status === 404) return notFound();

          throw new Error(`Failed to fetch event data: ${request.statusText}`);
      }

      const response = await request.json();
      event = response.event;

      if(!event) return notFound();

    }catch(err){
      console.log("Failed to fetch event.");
      throw err;
    }

    

    if(!event) return notFound();

    const { description, overview, agenda, date, time, image , mode, audience, tags, location, organizer } = event;
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/*Left side */}
          <div className='content'>
            <Image src={image} alt='event-image' width={800} height={800} className='banner'/>
            <section className='flex-col gap-2'>
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>

            <section className='flex-col gap-2'>
              <h2>Event Details</h2>
                <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                <EventDetailItem icon="audience.svg" alt="audience" label={audience} />
            </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])} />

          <section className='flex-col gap-2'>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={JSON.parse(tags[0])} />
          </div>
         {/*Right side */}

         <aside className='booking'>
          <p className='text-lg font-semibold '>Book Event</p>
         </aside>
      </div>
    </section>
  )
}

export default EventDetailsPage;
