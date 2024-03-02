'use client';
import Link from 'next/link';
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";


export default function DashboardHomePage({}) {
    const generateSchedule = useAction(api.openai.chat);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Generate a new workout schedule!</h1>
            <form onSubmit={async (e) => {
                    e.preventDefault();
                    await generateSchedule({ body: name });
                }}>
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
            <Link className="flex h-10 items-center rounded-lg bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:bg-purple-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                href="./dashboard/programs">
                Go to your generated programs
            </Link>
        </main>
    );
}