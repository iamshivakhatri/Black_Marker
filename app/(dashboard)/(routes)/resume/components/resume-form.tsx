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
import { JobDescription } from "./job-description"
import { ResumeUpload } from "./resume-upload"
import { SectionNav } from "./section-nav"
import LayoutTools from "./LayoutTools"

import { useGlobalContext } from "@/context/global-context"
import { useEffect, useState } from "react"

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

    // Check if there's any resume data
    const { personalData, educationData, experienceData, projectData, skillsData } = useGlobalContext();
    const [hasResumeData, setHasResumeData] = useState(false);
    const [hasUploadedResume, setHasUploadedResume] = useState(false);

    useEffect(() => {
        // Check if there's any data in localStorage
        const hasData = 
            (personalData && personalData.length > 0) ||
            (educationData && educationData.length > 0) ||
            (experienceData && experienceData.length > 0) ||
            (projectData && projectData.length > 0) ||
            (skillsData && skillsData.length > 0);
        
        setHasResumeData(hasData);

        // Also listen for storage events to update hasResumeData state
        const handleStorageChange = () => {
            const hasUploadedResume = localStorage.getItem('hasUploadedResume') === 'true';
            setHasUploadedResume(hasUploadedResume);
            
            const hasData = 
                localStorage.getItem('personal') !== null ||
                localStorage.getItem('education') !== null ||
                localStorage.getItem('experienceData') !== null ||
                localStorage.getItem('projectData') !== null ||
                localStorage.getItem('skillsData') !== null;
            
            setHasResumeData(hasData || hasUploadedResume);
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Initial check for uploaded resume
        const hasUploadedResume = localStorage.getItem('hasUploadedResume') === 'true';
        setHasUploadedResume(hasUploadedResume);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [personalData, educationData, experienceData, projectData, skillsData]);

    // Define sections for the navigation sidebar
    const navSections = [
        { id: "resume-upload", label: "Upload", icon: "job-description" as const },
        { id: "job-description", label: "Job", icon: "job-description" as const },
        { id: "personal-info", label: "Info", icon: "personal-info" as const },
        { id: "education", label: "Education", icon: "education" as const },
        { id: "experience", label: "Experience", icon: "experience" as const },
        { id: "projects", label: "Projects", icon: "projects" as const },
        { id: "skills", label: "Skills", icon: "skills" as const },
        { id: "layout-tools", label: "Layout", icon: "layout-tools" as const },
    ];
      
    return (
        <div className="space-y-5 my-5 relative">
            <SectionNav sections={navSections} />
            
            <div id="resume-upload" className="scroll-mt-5">
                <ResumeUpload data={{ type: "Upload Existing Resume" }}/>
            </div>
            
            <div id="job-description" className="scroll-mt-5">
                <JobDescription data={{ type: "AI Resume Generator" }}/>
            </div>
            
            <div id="personal-info" className="scroll-mt-5">
                <Info data={{ type: "Personal Info" }}/>
            </div>
            
            <div id="education" className="scroll-mt-5">
                <Education data={{ type: "Education" }}/>
            </div>
            
            <div id="experience" className="scroll-mt-5">
                <Experience data={{ type: "Experience" }}/>
            </div>
            
            <div id="projects" className="scroll-mt-5">
                <Projects data={{ type: "Projects" }}/>
            </div>
            
            <div id="skills" className="scroll-mt-5">
                <Skills data={{ type: "Skills" }}/>
            </div>
            
            <div id="layout-tools" className="scroll-mt-5">
                <LayoutTools />
            </div>
        </div>
    )
}

