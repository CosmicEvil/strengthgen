'use client'
import { notFound } from 'next/navigation';
import MarkdownView from 'react-showdown';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery, useMutation } from "convex/react";
import { useToast } from "@/src/components/ui/use-toast";
import { Toaster } from "@/src/components/ui/toaster";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { useRouter } from 'next/navigation'

export default function ChildPage({
  preloadedPrograms,
}: {
  preloadedPrograms: Preloaded<typeof api.programs.getSpecificProgram>;
}) {
    const { toast } = useToast()
    const router = useRouter()

    const program = usePreloadedQuery(preloadedPrograms);
    const deleteProgramMutation = useMutation(api.programs.deleteProgram);

    const deleteProgram = (id: any) => {
        deleteProgramMutation({
            id: id
        })
        toast({
            title: "Successfully deleted!"
        })

        router.refresh()
        router.push("/dashboard")
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
  
    
    if (!program) {
        notFound();
    }
    
    return (
        <div suppressHydrationWarning={true} className="min-h-[100vh] w-full">
            <Toaster />
            <div className="flex min-h-screen flex-col items-center gap-2 p-4 pb-10 sm:pt-24 sm:pb-24">
                <Card className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[500px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
                    <CardHeader>
                        <CardTitle>Your Generated workout</CardTitle>
                        <CardDescription>Used parameters:<br/> { createTags(program) }</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MarkdownView className="markdown"
                            markdown={program.program}
                        />
                    </CardContent>
                    <CardFooter className="flex gap-6 items-end justify-end">
                        <Button onClick={(e) => deleteProgram(program._id)} className="bg-red-500 hover:bg-red-700 text-white">Delete this workout</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}