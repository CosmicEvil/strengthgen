import OpenAI from 'openai';
import { action } from "./_generated/server";
import { v } from 'convex/values';

if (!process.env.OPENAI_API_KEY) {
    throw new Error(
        "Missing OPENAI_API_KEY in environment variables.\n" +
        "Set it in the project settings in the Convex dashboard:\n" +
        "  npx convex dashboard\n or https://dashboard.convex.dev"
    );
}

export const generateProgram = action({
    args: {
        gender: v.string(),
        days: v.string(),
        weeks: v.string(),
        age: v.string(),
        goals: v.string(),
        experience: v.string(),
        bodyweight: v.boolean()
    },
    handler: async (ctx, { ...args}) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            await console.log(
                "Add your OPENAI_API_KEY as an env variable in the dashboard:" +
                "https://dashboard.convex.dev"
            );
        }

        const gender = args.gender !== '' ? args.gender : 'person';
        const question = `
            Please generate me a workout schedule for a ${args.age !== '' ? args.age + ' years old' : '' } ${gender} who wants to ${args.goals} 
            and work out ${args.days} days a week, who has ${args.experience} experience with working out
            and return me just the schedule itself and maybe some extra info at the end of it.  `
        args.bodyweight && question + " Please explicitly only use calisthenics exercises for the schedule."

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        
        try {
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: "user", content: question + " Please return the answer as markdown, where every day is a h4 tag, and all the exercises are part of a ul tag, the additional tips are h3 tags. NEVER SAY YOU ARE AN AI LANGUAGE MODEL." }],
                model: "gpt-3.5-turbo",
            });
            return chatCompletion.choices[0].message.content;
        } catch (e) {
            await console.log(e)
        }
    }
});

