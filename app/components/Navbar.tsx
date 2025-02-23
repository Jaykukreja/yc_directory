import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
const Navbar = async () => {
  const session = await auth()
  return (
    <header className="px-5 py-3 bg-white shadow-sm ">
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/yc_logo.png" width={100} height={50} alt="YC logo"/>
            </Link>

            <div className="flex items-center gap-5 text-black">
                {session && session?.user ? (
                    <>
                    <Link href="/startup/create">
                        <span className='sm-hidden'>Create</span>
                            <BadgePlus className='size-6 sm:hidden' />
                    </Link>
                    <form action={async ()=> {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}>
                       <button type='submit'>
                       <span className='max-sm-hidden'>Logout</span>
                       <LogOut className='size-6 sm:hidden text-red-500' />
                        </button>
                    </form>
                    <Link href={`/user/${session?.id}`}>
                        <span>Hi, {session?.user?.name}</span>

                    </Link>
                    </>
                ) :
                (
                    <>
                    <form action={async ()=>{
                        "use server"
                        await signIn("github")
                    }}>
                        <button type='submit'>Login</button>
                    </form>
                    </>
                )
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar