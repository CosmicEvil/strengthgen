"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import Header from "./components/header";

export default function Home() {
  const { userId } = useAuth();
  const getAllPrograms = useQuery(api.programs.getAllPrograms, {limit : 0, user: userId!});
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      
      <div className="flex w-full justify-center items-center font-sans text-slate-900 dark:text-white">
        {getAllPrograms?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        <button>GENERATE</button>
      </div>
    </main>
  );
}
