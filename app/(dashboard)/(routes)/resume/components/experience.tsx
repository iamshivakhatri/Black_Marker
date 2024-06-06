import * as React from "react"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { useGlobalContext } from '@/context/global-context';
import  DatePicker from "./datepicker"




interface ExperienceProps {
    data: {
        type: string
    }
}

export function Experience({ data }: ExperienceProps) {
  const {addExperienceData} = useGlobalContext();
  const [formCount, setFormCount] = React.useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [experiences, setExperiences] = useState<Array<{ title: string; company: string; start_date: string; end_date: string; detailed_experience: string }>>([]);





  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
    toast.success('Experience Added');
  };

  const handleSaveExperience = () => {
    console.log("This is handleSaveExperience",experiences);
    addExperienceData(experiences);
    toast.success('Experience Saved');

  
  }

  const handleChange = (index: number, key: string, value: string) => {
    if (key === 'start_date' || key === 'end_date') {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      console.log("this is formatted date", formattedDate)

      const updatedExperience = [...experiences];
      updatedExperience[index] = {...updatedExperience[index], [key]: formattedDate};
      setExperiences(updatedExperience);
    } else{
      const updatedExperience = [...experiences];
      updatedExperience[index] = {...updatedExperience[index], [key]: value};
      setExperiences(updatedExperience);
      console.log("this is value", value)

    }



    
  }



  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <CardTitle>{data.type}</CardTitle>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index} >
            <div className="grid w-full items-center gap-4 mb-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name-${index}`}>Title</Label>
                <Input 
                id={`title-${index}`} 
                placeholder="Software Engineering Intern" 
                onChange={e => handleChange(index, 'title', e.target.value)}
                
                />
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <div>
                <Label htmlFor={`company-name-${index}`}>Company Name</Label>
                 <Input 
                 id={`company-name-${index}`} placeholder="Google" 
                 onChange={e => handleChange(index, 'company', e.target.value)}
                 
                 />

                </div>

                <div>
                <Label htmlFor={`date-${index}`}>Start Date</Label>
                <DatePicker
                  selectedDate={experiences[index]?.start_date || undefined}
                  onSelectDate={date => handleChange(index, 'start_date', date as any)}
                />
                </div>

                <div>
                <Label htmlFor={`date-${index}`}>End Date</Label>
                <DatePicker
                  selectedDate={experiences[index]?.end_date || undefined}
                  onSelectDate={date => handleChange(index, 'end_date', date as any)}
                />
                

                </div>
              
              </div>
                <label htmlFor="experiences">Detailed Experiences</label>
                <Textarea 
                id={`experiences-${index}`}
                placeholder="Analyzed millions of datasets, skillfully extracting valuable insights through the utilization of Python, R, and PowerBI.." 
                onChange={e => handleChange(index, 'detailed_experience', e.target.value)}
                />

              

            </div>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="mr-1" onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveExperience}>Save Experience</Button>
      </CardFooter>
    </Card>
  )
}
