import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  {useState, useEffect} from "react"
import { Textarea } from "@/components/ui/textarea"
import  DatePicker  from "./datepicker"

interface EducationProps {
    data: {
        type: string
    }
}

import { useGlobalContext } from "@/context/global-context"
import { set } from "date-fns"

export function Education({ data }: EducationProps) {
  const {addEducationData} = useGlobalContext();
  const [formCount, setFormCount] = React.useState(1);
  const [education, setEducation] = useState<Array<{university: string; major: string; gpa: string; level: string; graduation_date: string; coursework: string }>>([]);

  useEffect(() => {
    const storedEducation = localStorage.getItem('education');

    if (storedEducation) {
      setEducation(JSON.parse(storedEducation));
    }
    
  }, [])


  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleChange = (index: number, key: string, value: string) => {
    if (key === 'graduation_date') {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      const updatedEducation = [...education];
    updatedEducation[index] = {...updatedEducation[index],  [key]: formattedDate};
    setEducation(updatedEducation);
    }else{
    const updatedEducation = [...education];
    updatedEducation[index] = {...updatedEducation[index],  [key]: value};
    setEducation(updatedEducation);

    }

    
  };

  const handleSaveEducation = () => {
    localStorage.setItem('education', JSON.stringify(education));
    addEducationData(education);

  };

  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <CardTitle>{data.type}</CardTitle>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index} >
            <div className="grid w-full items-center gap-4 mb-5">
              <Label htmlFor="framework">University</Label>
              <Input
               id={`university-${index}`} 
               placeholder="Northern Kentucky University"
               onChange= {e => handleChange(index, 'university', e.target.value)}
               value={education[index]?.university || ""}
               />
               <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                <div className="space-y-2">
                <Label htmlFor="framework">Major</Label>
               <Input 
               id={`major-${index}`} 
               placeholder="Computer Science" 
               onChange= {e => handleChange(index, 'major', e.target.value)}
               value={education[index]?.major || ""}

               />
               </div>
               <div className="space-y-2"> 
                <Label htmlFor="framework">GPA</Label>
               <Input
                id={`grade-${index}`}
                 placeholder="3.85"
                 onChange= {e => handleChange(index, 'gpa', e.target.value)}
                 value = {education[index]?.gpa || ""}


                 />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Level</Label>
               <Input 
               id={`level-${index}`} 
               placeholder="Bachelors"
               onChange= {e => handleChange(index, 'level', e.target.value)}
               value = {education[index]?.level || ""}

               />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Graduation</Label>
               {/* <Input
                id={`grade-${index}`} 
                placeholder="Anticipated Graduation" 
                onChange= {e => handleChange(index, 'graduation_date', e.target.value)}
                /> */}
                 <DatePicker
                  selectedDate={education[index]?.graduation_date|| undefined}
                  onSelectDate={date => handleChange(index, 'graduation_date', date as any)}
                />

               </div>
               
               </div>
                <Label htmlFor="framework">Relevant Coursework</Label>
               <Textarea 
               id={`course-description-${index}`}
                placeholder="Data Structure and Algorithm, Object Oriented Programming.." 
                onChange= {e => handleChange(index, 'coursework', e.target.value)}
                value = {education[index]?.coursework || ""}
                />
            </div>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="mr-1"onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveEducation}>Save Education</Button>
      </CardFooter>
    </Card>
  )
}
