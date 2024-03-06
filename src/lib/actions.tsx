import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery, useMutation } from "convex/react";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const deleteProgram = async (id: Id<"programs">) => {
    const deleteProgramMutation = useMutation(api.programs.deleteProgram);

    await deleteProgramMutation({
        id: id
    })

    revalidatePath('/dashboard', 'page');
    redirect('/dashboard')
}