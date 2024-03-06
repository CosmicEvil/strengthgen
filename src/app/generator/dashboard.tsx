'use client';
import React, { useState } from "react" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/convex/_generated/api";
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import Loader from "@/src/components/ui/loader"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/src/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Checkbox } from "@/src/components/ui/checkbox";
import { useAction, useMutation } from "convex/react";
import MarkdownView from 'react-showdown';
import { useToast } from "@/src/components/ui/use-toast"
import { Toaster } from "@/src/components/ui/toaster"

export default function DashboardHomePage() {
    const genders = ['Male', 'Female', 'Prefer not to say']
    const goals = ['Increase strength', 'Lose weight', 'Hypertrophy']
    const experience = ['Beginner', 'Intermediate', 'Advanced']

    const [formSuccess, setFormSuccess] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isSaved, setSaved] = useState<boolean>(false)

    const [formSuccessMessage, setFormSuccessMessage] = useState<string>("")
    const [queryValues, setQueryValues] = useState<array>([])

    const getAllPrograms = useAction(api.openai.generateProgram);
    const saveProgram = useMutation(api.programs.saveProgram);
    const { toast } = useToast()

    const formSchema = z.object({
        gender: z.string(),
        age: z.string(),
        days: z.string().min(1, {
            message: "Please tell us how many days per week you want to workout",
        }),
        weeks: z.string(),
        goals: z.string().min(2, {
            message: "Please tell us what you want to achieve",
        }),
        experience: z.string().min(2, {
            message: "Please tell us your experience level",
        }),
        bodyweight: z.boolean(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "",
            days: "",
            weeks: "",
            age: "18",
            goals: "",
            experience: "",
            bodyweight: false
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        const result = await getAllPrograms( values );
        if (result) {
            setQueryValues(values)
            setFormSuccess(true)
            setFormSuccessMessage(result!)
            setLoading(false)
        }
    }

    const createSelectElements = (start: number, end: number, extraText: String) => {
        var elements = [];
        for(let i = start; i < end + 1; i++){
            elements.push(<SelectItem key={i} value={i.toString()}>{i}{extraText && extraText}</SelectItem>);
        }
        return elements;
    }

    const createRadioElements= (options: Array<string>) => {
        let elements : any = [];

        options.forEach(element => {
            elements.push(
                <FormItem key={element} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        <RadioGroupItem value={element} id={element} />
                    </FormControl>
                    <FormLabel className="font-normal">
                        {element}
                    </FormLabel>
                </FormItem>
            );
        });
        
        return elements;
    }

    const refreshForm = () => {
        setFormSuccess(false)
        setFormSuccessMessage("")
        setQueryValues([])
    }

    const saveWorkout = async () => {
        if(isSaved) {
            console.log("already saved")
            toast({
                variant: "destructive",
                title: "This workout was already saved!",
                description: "Find it again in your generated workouts!",
            })
      
            return 
        }
        await saveProgram({
            program: formSuccessMessage, 
            days: queryValues.days, 
            goals: queryValues.goals,
            experience: queryValues.experience,
            bodyweight: queryValues.bodyweight
        })
        setSaved(true)
        toast({
            title: "Saved!",
            description: "You will be able to find your workout again in your generated workouts!"
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center gap-12 p-4 pb-10 sm:pt-24 sm:pb-24">
            <Toaster />
            <Card className="sm:w-[540px] md:w-[750px] px-4 py-8 min-h-[500px] border-solid border-2 border-cyan-500 shadow-xl shadow-cyan-500/90">
            { isLoading ? 
                <>
                    <CardHeader>
                        <CardTitle className="text-xl">Please wait while we do the calculations</CardTitle>
                        <CardDescription>This can take up to a minute.</CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[400px] flex items-center justify-center">
                        <Loader />
                    </CardContent>
                </>
            :
            (formSuccess == true) ?
                <>
                    <CardHeader>
                        <CardTitle>Your Generated workout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarkdownView className="markdown"
                            markdown={formSuccessMessage}
                        />
                    </CardContent>
                    <CardFooter className="flex gap-6 items-center justify-center mt-20">
                        <Button variant="secondary" onClick={refreshForm}>Start again!</Button>
                        <Button onClick={saveWorkout} className="bg-cyan-500 text-white shadow-lg shadow-cyan-500/50">Save this workout</Button>
                    </CardFooter>
                </>
                :
                <>
                    <CardHeader>
                        <CardTitle>Generate a new workout schedule!</CardTitle>
                        <CardDescription>Give the machine some information so it can create a tailor made program</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col mt-1 gap-1">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>How old are you?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your age" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                { createSelectElements(14, 90, '') }
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Adding your age can help us finetune it more for you personally. 
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>How can we best describe you?</FormLabel>
                                            <FormControl>
                                                <RadioGroup id="gender"   
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    { createRadioElements(genders) }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col mt-4 gap-1">
                                    <FormField
                                        control={form.control}
                                        name="days"
                                        render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>How many days a week would you want to workout? *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select amount of days" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                { createSelectElements(1, 7, ' Days / week') }
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select an amount that will fit your weekly schedule. The most important part for achieving goals is having a program that you can keep sticking to.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="flex flex-col mt-4 gap-1">
                                    <FormField
                                        control={form.control}
                                        name="weeks"
                                        render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>How many days a week would you want to workout?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select number of weeks" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                { createSelectElements(4, 12, ' weeks') }
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            The length of the program is very important, as this is a cycle that you can repeat. Always try to do the full length of a program, and afterwards take a deload week to let your body rest before starting again.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="goals"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>What do you want to achieve? *</FormLabel>
                                            <FormControl>
                                                <RadioGroup id="goals"   
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    { createRadioElements(goals) }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Selecting a goal is important, as this is what you will work towards. 
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tell us how experienced you are! *</FormLabel>
                                            <FormControl>
                                                <RadioGroup id="experience"   
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    { createRadioElements(experience) }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="bodyweight"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 my-4 border-2 border-cyan-500 shadow-xl shadow-cyan-500/50">
                                                <FormControl>
                                                    <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Only bodyweight exercises?
                                                    </FormLabel>
                                                    <FormDescription>
                                                        When this is checked, we will only suggest exercises that don't use free weights or machines. This way you can have a schedule even if you don't have a gym nearby!
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                        />
                                </div>
                            </div>
                            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/50">Submit</Button>
                        </form>
                    </Form>
                    </CardContent>
            </>
            }
            </Card>
        </div>
    );
}
