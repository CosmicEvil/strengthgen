"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
export default function Home() {
   
const { userId } = useAuth();
const getAllPrograms = useQuery(api.programs.getAllPrograms, {limit : 0});
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      page
    </div>
  );
}
