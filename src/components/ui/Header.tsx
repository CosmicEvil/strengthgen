import { UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import { auth } from '@clerk/nextjs';

export default function Header() {
    const {userId} = auth();

    return (
        <div className="flex w-[90%] h-10 mt-10 justify-between items-center font-sans text-slate-900 dark:text-white">
            <h1 className="text-xl font-extrabold">StrengthGen.Ai</h1>
            { userId ? (
                <div className="flex w-30 justify-end items-center gap-4">   
                    <Link href="/dashboard/programs" className="text-base">Your generated programs</Link>
                    <UserButton />
                </div>
            ) : (
                <div className="flex w-30 justify-end items-center gap-4">   
                    <Link href="/dashboard" className="text-base">Sign in!</Link>
                </div>
            )
            }
        </div>
    )
}
