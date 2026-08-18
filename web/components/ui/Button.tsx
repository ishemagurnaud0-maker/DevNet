'use client';
import Link from 'next/link';

const Button = ({route}: {route: string}) => {
  return (
    <button className='flex w-50 items-center justify-center rounded-full px-5 transition-colors bg-gray-900 hover:bg-gray-800 text-white h-20 mt-10'>
      <Link href={route}>Get Started</Link>
    </button>
  )
}

export default Button;