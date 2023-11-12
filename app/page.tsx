import Link from "next/link";
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal' : '/new-user'

  return (
    <main className="w-full h-screen bg-black text-white  flex flex-col justify-center items-center">
      <div className='w-full h-15 shadow-lg  bg-black shadow-blue-300'>
        <div className='w-full flex justify-between items-center py-4 px-10'>
          <div className='flex items-center'>
            <h1 className='text-3xl'>MOOD</h1>
          </div>
          <div className='flex items-center'>
            {/* <Link href='/sign-in'>
              <span className='text-xl mr-8 bg-blue-500 rounded-lg px-2 py-2'>Login</span>
            </Link>
            <Link href='/sign-up'>
              <span className='text-xl bg-blue-500 rounded-lg px-2 py-2'>Sign up</span>
            </Link> */}
          </div>
        </div>
      </div>
      
        <div className='flex flex-col w-full h-full mt-40 md:mt-20 sm:mt-10'>
          <div className='w-full h-full max-w-[800px] mx-auto' >
            <h1 className='text-5xl mb-5'>The best journaling app, Period.</h1>
            <p className='text-3xl text-white mb-4'>Life is your canvas, MOOD your palette—be authentic, let emotions unfold effortlessly. Elevate mood tracking to an art form, embracing the extraordinary. Welcome to MOOD, where honesty meets sophistication.</p>
            <div className=''>
              <Link href={href}>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 text-xl capitalize'>Get started</button>
              </Link>
            </div>
          </div>
        </div>
      
    </main>
  )
}
