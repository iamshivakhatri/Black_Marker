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

interface ExperienceProps {
    data: {
        type: string
    }
}

export function Experience({ data }: ExperienceProps) {
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name-${index}`}>Title</Label>
                <Input id={`title-${index}`} placeholder="Software Engineering Intern" />
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <div>
                <Label htmlFor={`company-name-${index}`}>Company Name</Label>
                 <Input id={`company-name-${index}`} placeholder="Google" />

                </div>

                <div>
                <Label htmlFor={`date-${index}`}>Date</Label>
                 <Input id={`date-${index}`} placeholder="May 2024 - August 2024" />

                </div>
              
              </div>
                <label htmlFor="experiences">Detailed Experiences</label>
              <Textarea id={`experiences-${index}`} placeholder="Analyzed millions of datasets, skillfully extracting valuable insights through the utilization of Python, R, and PowerBI.." />

              

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
