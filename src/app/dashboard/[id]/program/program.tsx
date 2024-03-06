'use client'
import { notFound } from 'next/navigation';
import MarkdownView from 'react-showdown';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery, useMutation } from "convex/react";
import { useToast } from "@/src/components/ui/use-toast";
import { Toaster } from "@/src/components/ui/toaster";

export function ChildPage(props: {
    preloaded: Preloaded<typeof api.programs.getAllPrograms>;
  }) {
    const { toast } = useToast()

    const program = usePreloadedQuery(props.preloaded);
    const deleteProgramMutation = useMutation(api.programs.deleteProgram);

    const deleteProgram = async (id: Id<"programs">) => {
        await deleteProgramMutation({
            id: id
        })
        toast({
            title: "Successfully deleted!"
        })
    }


    if (!program) {
        notFound();
    }
    
    return (
        <>
        <Toaster />
        <MarkdownView className="markdown"
            markdown={program.program}
            />
        </>
    );
}