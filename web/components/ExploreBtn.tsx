"use client"
import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-8 mx-auto" onClick={() =>{console.log("I have been clicked.")}}>
        <a href="#events">Explore Events</a>
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
        </button>
  )
}

export default ExploreBtn