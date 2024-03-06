import {queryWithUser, mutationWithUser} from "./utils"
import { ConvexError, v } from 'convex/values';

// Return all the programs that have been generated for the current user
export const getAllPrograms = queryWithUser({
  args: {limit: v.optional(v.number())},
  handler: async (ctx, args) => {
    const userId = ctx.userId;
    const limit = args.limit ? args.limit : 999;
    const programs = await ctx.db
        .query("programs")
        .filter((q) => q.eq(q.field("userId"), userId))
        .order("desc")
        .take(limit)
    return programs
  },
});

export const getSpecificProgram = queryWithUser({
  args: { programId: v.id("programs") },
  handler: async (ctx, args) => {
    console.log(args.programId)
    const program = await ctx.db.get(args.programId);
    return program
  },
});

export const deleteProgram = mutationWithUser({
  args: {id: v.id('programs')},
  handler: async (ctx, args) => {
    const { id } = args;
    const existing = await ctx.db.get(id);
    if (existing) {
      if (existing.userId !== ctx.userId) {
        throw new ConvexError('Not your action item');
      }
      await ctx.db.delete(id);
    }
  },
});

export const saveProgram = mutationWithUser({
  args: {
    program: v.string(),
    goals: v.optional(v.string()),
    days: v.optional(v.string()),
    experience: v.optional(v.string()),
    bodyweight: v.optional(v.boolean())
  },
  handler: async (ctx, { ...args }) => {
    const userId = ctx.userId;
    const programs = await ctx.db.insert("programs", { 
      program: args.program,
      userId: userId,
      days: args.days,
      goals: args.goals,
      experience: args.experience,
      bodyweight: args.bodyweight,
    });
    return programs
  },
});