import * as React from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useGlobalContext } from '@/context/global-context';
import DatePicker from "./datepicker";
import { Delete } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { setPriority } from "os";

interface ExperienceProps {
  data: {
    type: string;
  };
}

export function Experience({ data }: ExperienceProps) {
  const { addExperienceData } = useGlobalContext();
  const [formCount, setFormCount] = React.useState(1);
  const [experiences, setExperiences] = useState<Array<{ title: string; company: string; start_date: string; end_date: string; detailed_experience: string; isEndPresent: boolean }>>([]);

  useEffect(() => {
    const loadExperienceData = () => {
      const storedExperience = localStorage.getItem('experienceData');
      if (storedExperience) {
        const parsedExperience = JSON.parse(storedExperience);
        setExperiences(parsedExperience);
        setFormCount(Math.max(parsedExperience.length, 1));
      }
    };

    // Initial load
    loadExperienceData();
    
    // Listen for storage events (triggered when AI generates data)
    const handleStorageChange = () => {
      loadExperienceData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleSaveExperience = () => {
    localStorage.setItem('experienceData', JSON.stringify(experiences));
    addExperienceData(experiences);
    toast.success('Experience Added on Resume');
  };

  const handleChange = (index: number, key: string, value: string | Date) => {
    const updatedExperiences = [...experiences];
    if (key === 'start_date' || key === 'end_date') {
      const date = new Date(value as string);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      updatedExperiences[index] = { ...updatedExperiences[index], [key]: formattedDate };
    } else {
      updatedExperiences[index] = { ...updatedExperiences[index], [key]: value };
    }
    setExperiences(updatedExperiences);
  };

  const handleCheckboxChange = (index: number) => {
    try{

          const updatedExperiences = [...experiences];
        
          // Check if the index is within the valid range
          if (index >= 0 && index < updatedExperiences.length) {
            // Toggle the value of isEndPresent
            const isEndPresent = !updatedExperiences[index].isEndPresent;
            updatedExperiences[index] = {
              ...updatedExperiences[index],
              isEndPresent,
              end_date: isEndPresent ? 'Present' : ''
            };
            setExperiences(updatedExperiences);
          } else if (index === updatedExperiences.length) {
            // If the index corresponds to a new experience
            const newExperience = {
              title: '',
              company: '',
              start_date: '',
              end_date: '',
              detailed_experience: '',
              isEndPresent: false  // Assuming isEndPresent should be false by default for new experiences
            };
            const isEndPresent = !newExperience.isEndPresent;
            const updatedExperience = {
              ...newExperience,
              isEndPresent,
              end_date: isEndPresent ? 'Present' : ''
            };
            setExperiences([...updatedExperiences, updatedExperience]);

          } else {
            console.error('Invalid index:', index);
          }
      }catch(e){
        console.log(e);
    }
  };
  
  

  const handleDeleteAll = () => {
    localStorage.removeItem("experienceData");
    setExperiences([]);
    addExperienceData([]);
  };
  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    localStorage.setItem('experienceData', JSON.stringify(updatedExperiences));
    setExperiences(updatedExperiences);
    setFormCount(prevCount => prevCount - 1);
    addExperienceData(updatedExperiences);
    
  };

  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{data.type}</CardTitle>
          <Delete className="cursor-pointer" size={24} onClick={handleDeleteAll} />
        </div>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index}>
            <div className="grid w-full items-center gap-4 mb-5">

              <div className="flex items-center">
                <div className="flex flex-col space-y-1.5 flex-grow">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`name-${index}`}>Title</Label>
                    <Button className="text-red-500" onClick={() => handleDeleteExperience(index)}>-</Button>
                  </div>
                  <Input 
                    className="w-full"
                    id={`title-${index}`}
                    placeholder="Software Engineering Intern"
                    onChange={e => handleChange(index, 'title', e.target.value)}
                    value={experiences[index]?.title || ""}
                  />
                </div>
            </div>



              <div className="grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor={`company-name-${index}`}>Company Name</Label>
                  <Input
                    id={`company-name-${index}`}
                    placeholder="Google"
                    onChange={e => handleChange(index, 'company', e.target.value)}
                    value={experiences[index]?.company || ""}
                  />
                </div>

                <div className="flex flex-col justify-center  gap-1 ml-auto">
                  <Label htmlFor={`date-${index}`}>Start Date</Label>
                  <DatePicker
                    selectedDate={experiences[index]?.start_date || undefined}
                    onSelectDate={date => handleChange(index, 'start_date', date as any)}
                  />
                </div>

                <div className="flex gap-5">
                  <div>
                    <Label htmlFor={`date-${index}`}>End Date</Label>
                    <DatePicker
                      selectedDate={experiences[index]?.end_date === 'Present' ? undefined : experiences[index]?.end_date}
                      onSelectDate={(date) => handleChange(index, 'end_date', date as any)}
                      disabled={experiences[index]?.isEndPresent}
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id={`present-${index}`}
                      checked={experiences[index]?.isEndPresent || false}
                      onCheckedChange={() => handleCheckboxChange(index)}
                    />
                    <Label htmlFor={`present-${index}`} className="ml-2">Present</Label>
                  </div>
                </div>
              </div>





              
              <Label htmlFor="experiences">Detailed Experiences</Label>
              <Textarea
                id={`experiences-${index}`}
                placeholder="Analyzed millions of datasets, skillfully extracting valuable insights through the utilization of Python, R, and PowerBI.."
                onChange={e => handleChange(index, 'detailed_experience', e.target.value)}
                value={experiences[index]?.detailed_experience || ""}
              />
            </div>
            {index < formCount - 1 && <hr className="border-gray-600 mb-5" />}

          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="mr-1" onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveExperience}>Save Experience</Button>
      </CardFooter>
    </Card>
  );
}
