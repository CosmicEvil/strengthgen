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
                    <Link href="/dashboard" className="flex h-10 items-center rounded-lg bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:bg-purple-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Sign in!</Link>
                </div>
            )
            }
        </div>
    )
}
