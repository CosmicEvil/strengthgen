'use client';
import React, { useState } from "react" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { Button } from "@/src/components/ui/button"
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
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Checkbox } from "@/src/components/ui/checkbox";

export default function DashboardHomePage({}) {
    const genders = ['Male', 'Female', 'Prefer not to say']
    const goals = ['Increase strength', 'Lose weight', 'Hypertrophy']
    const experience = ['Beginner', 'Intermediate', 'Advanced']

    const [formSuccess, setFormSuccess] = useState(true)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")

    const formSchema = z.object({
        gender: z.string(),
        age: z.string(),
        days: z.string().min(1, {
            message: "Please tell us how many days per week you want to workout",
        }),
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
            age: "18",
            goals: "",
            experience: "",
            bodyweight: false
        },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
        setFormSuccess(true)
        console.log(values)
    }

    const createSelectElements= (start: number, end: number, extraText: String) => {
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

    return (
        <div className="flex min-h-screen flex-col items-center gap-10 p-24">
            {formSuccess ?
                <div>
                    {formSuccessMessage}
                    <div className="flex">
                        <button>Save this workout</button>
                        <button onClick={setFormSuccess(false)}>Start again!</button>
                    </div>
                </div>
                :
                <Card className="w-[500px]">
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
                                            You can manage email addresses in your{" "}
                                            <Link href="/examples/forms">email settings</Link>.
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
                                        <FormLabel>How many days a week would you want to workout?</FormLabel>
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
                                <div className="flex flex-col mt-1 gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="goals"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>What do you want to achieve?</FormLabel>
                                            <FormControl>
                                                <RadioGroup id="goals"   
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    { createRadioElements(goals) }
                                                </RadioGroup>
                                            </FormControl>
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
                                            <FormLabel>Tell us how experienced you are!</FormLabel>
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
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
            }

            <Button>
                <Link href="./dashboard/programs">
                    Go to your generated programs
                </Link>
            </Button>
        </div>
    );
}
