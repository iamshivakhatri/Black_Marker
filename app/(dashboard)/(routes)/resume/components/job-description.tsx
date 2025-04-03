import * as React from "react"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGlobalContext } from "@/context/global-context"
import { Loader2, AlertTriangle } from "lucide-react"

interface JobDescriptionProps {
  data: {
    type: string
  }
}

export function JobDescription({ data }: JobDescriptionProps) {
  const { 
    addPersonalData, 
    addEducationData, 
    addExperienceData, 
    addProjectData, 
    addSkillsData,
    personalData,
    educationData,
    experienceData,
    projectData,
    skillsData 
  } = useGlobalContext()
  
  const [jobDescription, setJobDescription] = useState("")
  const [aiProvider, setAiProvider] = useState("openai")
  const [isLoading, setIsLoading] = useState(false)
  const [hasUploadedResume, setHasUploadedResume] = useState(false)

  useEffect(() => {
    // Check if user has uploaded a resume
    const hasResume = localStorage.getItem('hasUploadedResume') === 'true';
    setHasUploadedResume(hasResume);
  }, []);

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
  }

  const handleAiProviderChange = (value: string) => {
    setAiProvider(value)
  }

  const handleGenerateResume = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description")
      return
    }

    setIsLoading(true)

    try {
      // Different API endpoints based on whether user has an uploaded resume
      const endpoint = hasUploadedResume ? "/api/resume-enhancer" : "/api/resume-analyzer";
      
      // Prepare request payload
      const payload: any = { 
        jobDescription, 
        aiProvider 
      };
      
      // If user has uploaded resume, include the existing data
      if (hasUploadedResume) {
        payload.existingData = {
          personal: personalData,
          education: educationData,
          experience: experienceData,
          projects: projectData,
          skills: skillsData
        };
      }
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${hasUploadedResume ? 'enhance' : 'analyze'} job description`)
      }

      const data = await response.json()

      if (data.message) {
        // This is for Google AI not implemented case
        toast.error(data.message)
        return
      }

      // If there's no uploaded resume, proceed as before - full generation
      if (!hasUploadedResume) {
        // Personal data
        if (data.personal) {
          const personalArray = [data.personal]
          addPersonalData(personalArray)
          localStorage.setItem('personal', JSON.stringify(personalArray))
        }

        // Education data
        if (data.education && data.education.length > 0) {
          addEducationData(data.education)
          localStorage.setItem('education', JSON.stringify(data.education))
        }

        // Experience data
        if (data.experience && data.experience.length > 0) {
          addExperienceData(data.experience)
          localStorage.setItem('experienceData', JSON.stringify(data.experience))
        }

        // Project data
        if (data.projects && data.projects.length > 0) {
          addProjectData(data.projects)
          localStorage.setItem('projectData', JSON.stringify(data.projects))
        }

        // Skills data
        if (data.skills) {
          const skillsArray = [data.skills]
          addSkillsData(skillsArray)
          localStorage.setItem('skillsData', JSON.stringify(skillsArray))
        }
      } else {
        // For uploaded resume case, only update bullet points and keywords
        
        // Experience data - keep existing jobs but update bullet points
        if (data.enhancedExperience && data.enhancedExperience.length > 0) {
          addExperienceData(data.enhancedExperience)
          localStorage.setItem('experienceData', JSON.stringify(data.enhancedExperience))
        }

        // Project data - keep existing projects but update bullet points and languages
        if (data.enhancedProjects && data.enhancedProjects.length > 0) {
          addProjectData(data.enhancedProjects)
          localStorage.setItem('projectData', JSON.stringify(data.enhancedProjects))
        }

        // Skills data - enhance with job-specific keywords
        if (data.enhancedSkills) {
          const skillsArray = [data.enhancedSkills]
          addSkillsData(skillsArray)
          localStorage.setItem('skillsData', JSON.stringify(skillsArray))
        }
      }

      // Force reload the form components to update their state from localStorage
      window.dispatchEvent(new Event('storage'))
      
      toast.success(hasUploadedResume 
        ? "Resume enhanced with job-specific keywords!" 
        : "Resume generated successfully!"
      );
    } catch (error) {
      console.error(`Error ${hasUploadedResume ? 'enhancing' : 'generating'} resume:`, error)
      toast.error(`Failed to ${hasUploadedResume ? 'enhance' : 'generate'} resume`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <CardTitle>{data.type}</CardTitle>
        <CardDescription>
          {hasUploadedResume 
            ? "Enhance your uploaded resume with job-specific keywords" 
            : "Generate a tailored resume from a job description"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4 mb-5">
          {hasUploadedResume && (
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200 flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-amber-800">
                Resume uploaded. AI will enhance existing content with job-specific keywords.
              </p>
            </div>
          )}
          
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            className="min-h-[200px] resize-y"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          />
          
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <Label htmlFor="ai-provider">AI Provider</Label>
              <Select value={aiProvider} onValueChange={handleAiProviderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="google">Google AI Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleGenerateResume} 
          disabled={isLoading || !jobDescription.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {hasUploadedResume ? "Enhancing..." : "Generating..."}
            </>
          ) : (
            hasUploadedResume ? "Enhance Resume" : "Generate Resume"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 