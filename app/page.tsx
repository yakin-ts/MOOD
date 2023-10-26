import Link from "next/link";
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal': '/new-user'

  return (
    <main className="w-screen h-screen bg-black text-white  flex justify-center items-center">
      <div className='w-full max-w-[800px] mx-auto' >
        <h1 className='text-5xl mb-5'>The best journal app.</h1>
        <p className='text-3xl text-white mb-4'>Write your thoughts and ideas in a beautiful and simple way.</p>
        <div className=''>
          <Link href={href}>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 text-xl capitalize'>Get started</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
