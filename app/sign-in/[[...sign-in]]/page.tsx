import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className='mt-0 ml-0 flex flex-col items-center justify-center w-full h-full'>
            <div className='w-full h-15 shadow-lg'>
                <nav className="px-4 h-full flex justify-between items-center mx-4">
                    <Link href='/' className="px-4 my-4">
                        <span className="text-3xl ">MOOD</span>
                    </Link>
                </nav>
            </div>
            <div className='mt-20 md:mt-15'>
                <SignIn signUpUrl='/sign-up'/>
            </div>
        </div>
    )
}

export default SignInPage;