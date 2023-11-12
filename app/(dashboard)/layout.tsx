import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { ReactNode } from 'react';
import {BsFillJournalBookmarkFill} from 'react-icons/bs'
import  {AiOutlineHome,AiOutlineLineChart} from 'react-icons/ai'



type DashboardLayoutProps = {
  children: ReactNode;
};

const links = [
  { label: 'Home', href: '/', icon: <AiOutlineHome className='text-xl'/> },
  { label: 'Journals', href: '/journal', icon: <BsFillJournalBookmarkFill/> },
  { label: 'History', href: '/history', icon: <AiOutlineLineChart/> },
]

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="w-scree h-screen flex flex-col ">

      <div className="h-15 w-full shadow-lg">
        <header className=" border-black/10">
          <nav className="px-4 h-full flex justify-between items-center mx-4">
          <div className="px-4 my-4">
            <span className="text-3xl">MOOD</span>
          </div>
            <div className="flex items-center justify-end h-full mr-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
      </div>
      <div className='h-full w-full flex'>
        <aside className="h-full w-40 p-5 shadow-lg">
          <div>
            <ul className="px-2 py-4">
              {links.map((link) => (
                <li key={link.label} className="text-xl my-2 p-2 flex justify-center items-center hover:bg-gray-100 rounded-lg">
                  <div className='pr-2 text-lg'>{link.icon}</div>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="h-full w-full">{children}</div>
      </div>

    </div>
  );
};

export default DashboardLayout;

