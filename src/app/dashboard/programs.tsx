'use client';

import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery, useMutation } from "convex/react";
import MarkdownView from 'react-showdown';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from 'next/link'
import { useToast } from "@/src/components/ui/use-toast"
import { Toaster } from "@/src/components/ui/toaster"
import { deleteProgram } from '@/src/lib/utils';

export function ProgramsHomepage(props: {
    preloaded: Preloaded<typeof api.programs.getAllPrograms>;
  }) {
  const { toast } = useToast()

  const allPrograms = usePreloadedQuery(props.preloaded);
  const deleteProgramMutation = useMutation(api.programs.deleteProgram);

  const deleteProgram = async (id: Id<"programs">) => {
    await deleteProgramMutation({
        id: id
    })
    toast({
        title: "Successfully deleted!"
    })
  }

  return (
    <div suppressHydrationWarning={true} className="mt-5 min-h-[100vh] w-full">
      <Toaster />
      <div className="flex min-h-screen flex-col items-center gap-2 p-4 pb-10 sm:pt-24 sm:pb-24">
        {allPrograms &&
          allPrograms.map((item, index) => (
            <Link
              href={`/dashboard/${item._id}/program`}
              className="rounded-md border p-2 hover:bg-gray-100"
              key={index}
            >
            <Card key={index} className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[500px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
              <CardHeader>
                  <CardTitle>Your Generated workout</CardTitle>
              </CardHeader>
              <CardContent>
                  <MarkdownView className="markdown"
                    markdown={item.program}
                  />
              </CardContent>
              <CardFooter className="flex gap-6 items-end justify-end">
                  <Button onClick={(e) => deleteProgram(item._id)} className="bg-red-500 hover:bg-red-700 text-white">Delete this workout</Button>
              </CardFooter>
            </Card>
          </Link>
          ))}
        {allPrograms.length === 0 && (
          <Card className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[500px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
          <CardHeader>
              <CardTitle>You currently have no generated workouts</CardTitle>
          </CardHeader>
          <CardContent>
              To generate some, go to the main page to generate some!
          </CardContent>
          <CardFooter className="flex gap-6 items-end justify-end"> 
              <Button className="bg-purple-500 hover:bg-purple-700 text-white shadow-lg shadow-cyan-500/50">
                <Link href="/dashboard">
                  Generate!
                </Link>
              </Button>
          </CardFooter>
        </Card>
        )}
      </div>
    </div>
  );
}

