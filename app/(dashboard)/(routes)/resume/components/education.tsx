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

import { Textarea } from "@/components/ui/textarea"

interface EducationProps {
    data: {
        type: string
    }
}

export function Education({ data }: EducationProps) {
  const [formCount, setFormCount] = React.useState(1);

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
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
              <Input id={`university-${index}`} placeholder="Northern Kentucky University" />
               <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                <div className="space-y-2">
                <Label htmlFor="framework">Major</Label>
               <Input id={`major-${index}`} placeholder="Computer Science" />
               </div>
               <div className="space-y-2"> 
                <Label htmlFor="framework">GPA</Label>
               <Input id={`grade-${index}`} placeholder="3.85" />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Level</Label>
               <Input id={`level-${index}`} placeholder="Bachelors" />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Graduation</Label>
               <Input id={`grade-${index}`} placeholder="Anticipated Graduation" />
               </div>
               
               </div>
                <Label htmlFor="framework">Relevant Coursework</Label>
              <Textarea id={`course-description-${index}`} placeholder="Data Structure and Algorithm, Object Oriented Programming.." />
            </div>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAddForm}>+1</Button>
      </CardFooter>
    </Card>
  )
}
