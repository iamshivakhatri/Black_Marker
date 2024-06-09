import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Experience} from "./experience"
import { Projects } from "./projects"
import { Education } from "./education"
import { Info } from "./info"
import { Skills } from "./skills"
import LayoutTools from "./LayoutTools"

import { useGlobalContext } from "@/context/global-context"
import { useEffect } from "react"

export function ResumeForm() {
    // Extend ResumeFormProps to include new fields
    interface ResumeFormProps {
        username: string;
        email: string;
        address: string;
        website: string;
        github: string;
        phoneNumber: string;
        linkedin: string;
        university: string;
        level:string;
        gpa: string;
        graduation: string;
        coursework: string;
    }

    const formSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
          message: "Please enter a valid email address.",
        }),
        address: z.string(), // Add address field validation
        website: z.string().url(), // Add website field validation
        github: z.string(), // Add GitHub field validation
        phoneNumber: z.string(), // Add phone number field validation
        linkedin: z.string(), // Add LinkedIn field validation
        university: z.string(),
        level: z.string(),
        gpa: z.string(),
        graduation: z.string(),
        coursework: z.string(),

    })

    type ResumeFormValues = z.infer<typeof formSchema>;
      
    const form = useForm<ResumeFormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: ResumeFormValues) => {
        console.log(values);
    }


  

      
    return (
       
        <div className="space-y-5 my-5">
        <Info data={{ type: "Personal Info" }}/>  
        <Education data = {{type:"Education"}}/>
        <Experience data={{ type: "Experience" }}/>
        <Projects data={{ type: "Projects" }}/>
        <Skills data={{ type: "Skills" }}/>
        <LayoutTools />
        </div>
    
    )
}

