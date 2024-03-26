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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ProjectsProps {
    data: {
        type: string
    }
}

export function Projects({ data }: ProjectsProps) {
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
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Input id={`name-${index}`} placeholder="Name of your project" />
              </div>
              <Input id={`language-${index}`} placeholder="Typescript, React, Tailwind" />
              <Textarea id={`description-${index}`} placeholder="Description of your project" />
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
