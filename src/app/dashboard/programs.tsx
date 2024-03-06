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
import { useState } from 'react';

export function ProgramsHomepage(props: {
    preloaded: Preloaded<typeof api.programs.getAllPrograms>;
  }) {
    const allPrograms = usePreloadedQuery(props.preloaded);

  const { toast } = useToast()

  const deleteProgramMutation = useMutation(api.programs.deleteProgram);

  const deleteProgram = async (id: any) => {
    await deleteProgramMutation({
        id: id
    })
    toast({
        title: "Successfully deleted!"
    })
  }

  const createTags = (options) => {
    let elements : any = [];

    for (const key in options){
      if(key !== "_id" && key !== "_creationTime" && key !== "program" && key !== "userId" ) {
        if (key == "bodyweight" && options[key] == true) {
          elements.push(
            <span key={key}>
             <b>Bodyweight Exercises Only, </b>
            </span> 
          );
        } else if (options[key] !== "" && key !== "bodyweight" ) {
          elements.push(
            <span key={key}>
            {key}: <b>{options[key]}. </b>
            </span> 
          );
        }
      }
    }

    return elements;
  }

  return (
    <div suppressHydrationWarning={true} className="min-h-[100vh] w-full">
      <Toaster />
      <div className="flex min-h-screen flex-col items-center gap-4 px-4 pt-40 pb-10 sm:pt-24 sm:pb-24">
        { (allPrograms && allPrograms.length > 0) ?
          allPrograms.map((item, index) => (
            
            <Card key={index} className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[300px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
              <CardHeader>
                  <CardTitle>Workout</CardTitle>
                  <CardDescription>Used parameters: <br/>
                  { createTags(item) }
                  </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='relative overflow-hidden h-[200px] '>
                  <MarkdownView className="markdown"
                    markdown={item.program}
                  />
                  <div className='absolute w-full left-0 right-0 bottom-0 h-[150px] bg-gradient-to-t from-card'></div>
                </div>
                  
              </CardContent>
              <CardFooter className="flex pb-0 gap-6 items-end justify-between">
              
                <Button onClick={(e) => deleteProgram(item._id)} className="bg-red-500 hover:bg-red-300 text-white">Delete</Button>
                <Link
                  href={`/program/${item._id}`}
                  key={index}
                >
                  <Button  className="bg-cyan-500 hover:bg-cyan-300 text-white">See full Workout</Button>
                </Link>
              </CardFooter>
            </Card>
            
          ))
        : 
          <Card className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[500px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
            <CardHeader>
                <CardTitle>You currently have no generated workouts</CardTitle>
            </CardHeader>
            <CardContent>
                To generate some, go to the main page to generate some!
            </CardContent>
            <CardFooter className="flex gap-6 items-end justify-end"> 
                <Button className="bg-purple-500 hover:bg-purple-300 text-white shadow-lg shadow-purple-500/50">
                  <Link href="/generator">
                    Generate!
                  </Link>
                </Button>
            </CardFooter>
          </Card>
        }
      </div>
    </div>
 
  );
}
