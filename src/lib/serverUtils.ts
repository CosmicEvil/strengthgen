import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

export const deleteProgram = async (id: Id<"programs">) => {
    const deleteProgramMutation = useMutation(api.programs.deleteProgram);
    await deleteProgramMutation({
        id: id
    })
  }