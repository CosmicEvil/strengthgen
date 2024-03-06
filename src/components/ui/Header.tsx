import { UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import { auth } from '@clerk/nextjs';
import { Button } from "./button";

export default function Header() {
    const { userId } = auth();
    
    return (
        <>
            { userId ? (
                <div className="absolute z-10 flex w-full pl-4 sm:pl-6 pr-24 h-40 sm:h-20 pt-6  justify-between items-start sm:items-center font-sans text-white flex-col sm:flex-row gap-1 sm:gap-4">   
                    <h1 className="text-xl font-extrabold">StrengthGen.Ai</h1>
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <Button className="bg-purple-500 hover:bg-purple-700 text-white shadow-lg hover:shadow-md shadow-purple-500/50 hover:shadow-purple-500/50">
                            <Link href="/generator">
                                Generate
                            </Link>
                        </Button>
                        <Button className="bg-cyan-500 hover:bg-cyan-700 text-white shadow-lg hover:shadow-md shadow-cyan-500/50 hover:shadow-cyan-500/50">
                            <Link href="/dashboard">
                                Your programs
                            </Link>
                        </Button>
                    </div>
                    <div className="absolute top-6 right-6 sm:top-7">
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-16 h-16 sm:w-12 sm:h-12 shadow-md shadow-cyan-500/50",
                            },
                        }} />
                    </div>
                </div>
            ) : (
                <div className="flex w-full pl-4 sm:pl-6 pr-24 h-20 sm:h-10 pt-6 sm:pt-10 justify-between items-start sm:items-end font-sans text-white flex-col sm:flex-row gap-1 sm:gap-4">   
                    <h1 className="text-xl font-extrabold">StrengthGen.Ai</h1>
                    <Button className="bg-cyan-500 hover:bg-cyan-700 text-white shadow-lg hover:shadow-md shadow-cyan-500/50 hover:shadow-cyan-500/50">
                        <Link href="/dashboard">
                            Log in!
                        </Link>
                    </Button>
                </div>
            )
            }
        </>
    )
}
