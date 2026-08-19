import Image from "next/image";
import Link from "next/link";
import { NextResponse } from "next/server";


type Props = {
  params: Promise<{
    slug: string;
  }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const EventDetailsPage = async({ params }: Props) => {
    const response = await fetch(`${BASE_URL}/api/events/[slug]`);
    const { event } = await response.json();
  return (
    <div>
        
    </div>
  )
}

export default EventDetailsPage;
