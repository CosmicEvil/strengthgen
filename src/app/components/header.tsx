import { UserButton } from "@clerk/nextjs";

export default function Header() {
    
    return (
        <div className="flex w-full h-10 justify-between items-center font-sans text-slate-900 dark:text-white">
            <h1 className="text-xl font-extrabold">StrengthGen.Ai</h1>
            <div className="flex w-30 justify-end items-center gap-4">
                <div className="text-base">Your generated programs</div>
                <UserButton />
            </div>
        </div>
      
  )
}