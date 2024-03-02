import { query, mutation } from "./_generated/server";
import {queryWithUser, mutationWithUser} from "./utils"
import { v } from 'convex/values';

// Return all the programs that have been generated for the current user
export const getAllPrograms = queryWithUser({
  args: {limit: v.number()},
  handler: async (ctx, args) => {
    const userId = ctx.userId;
    args.limit === 0 ? args.limit = 999 : '';
    const programs = await ctx.db
        .query("programs")
        .filter((q) => q.eq(q.field("user"), userId))
        .order("desc")
        .take(args.limit)
    return programs
  },
});

export const saveProgram = mutationWithUser({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, { storageId }) => {
    const userId = ctx.userId;
    let fileUrl = (await ctx.storage.getUrl(storageId)) as string;

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
      generatingTranscript: true,
      generatingTitle: true,
      generatingActionItems: true,
    });

    // // await ctx.scheduler.runAfter(0, internal.whisper.chat, {
    // //   fileUrl,
    // //   id: noteId,
    // // });

    return noteId;
  },
});