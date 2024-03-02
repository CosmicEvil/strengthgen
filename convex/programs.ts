import { query, action } from "./_generated/server";
import { v } from 'convex/values';

// Return all the programs that have been generated for the current user
export const getAllPrograms = query({
  args: {limit: v.number(), user: v.string()},
  handler: async (ctx, args) => {
    args.limit === 0 ? args.limit = 999 : '';
    const programs = await ctx.db
        .query("programs")
        .filter((q) => q.eq(q.field("user"), args.user))
        .order("desc")
        .take(args.limit)
    return programs
  },
});

export const pushNewProgram = action ({
    args: { a: v.number(), b: v.number() },
    handler: (_, args) => {
        // do something with `args.a` and `args.b`

        // optionally return a value
        return "success";
    },
})