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

    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")

    const formSchema = z.object({
        name: z.string().min(2, {
          message: "Name Should at least have 2 characters",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
    
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
                <div key={element} className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value={element} id={element} />
                    <Label htmlFor={element}>{element}</Label>
                </div>
            );
        });
        
        return elements;
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <Label htmlFor="age">How old are you</Label>
                                    <Select>
                                        <SelectTrigger id="age">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            { createSelectElements(14, 90, '') }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <Label htmlFor="gender">Tell us which gender you are</Label>
                                    <RadioGroup id="gender">
                                        { createRadioElements(genders) }
                                    </RadioGroup>
                                </div>
                                <div className="flex flex-col mt-4 gap-1">
                                    <Label htmlFor="days">How many days a week would you want to workout</Label>
                                    <Select>
                                        <SelectTrigger id="days">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            { createSelectElements(1, 7, ' Days / week') }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <Label htmlFor="goals">Tell us which gender you are</Label>
                                    <RadioGroup id="goals">
                                        { createRadioElements(goals) }
                                    </RadioGroup>
                                </div>
                                <div className="flex flex-col mt-1 gap-1">
                                    <Label htmlFor="experience">Tell us how experienced you are</Label>
                                    <RadioGroup id="experience">
                                        { createRadioElements(experience) }
                                    </RadioGroup>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="bodyweight" />
                                    <label
                                        htmlFor="bodyweight"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Only bodyweight exercises?
                                    </label>
                                </div>
                            </div>
                        </form>
                    </Form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            }

            <Button>
                <Link href="./dashboard/programs">
                    Go to your generated programs
                </Link>
            </Button>
        </main>
    );
}
