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

interface SkillsProps {
    data: {
        type: string
    }
}

export function Skills({ data }: SkillsProps) {
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
              <Label htmlFor="framework">Languages</Label>
              <Input id={`university-${index}`} placeholder="Javascript, Java, Python, C++, C ..." />
              <Label htmlFor="framework">Frameworks</Label>
              <Input id={`university-${index}`} placeholder="React, Flask, Django, Angular ..." />
            
            
            </div>
          </form>
        ))}
      </CardContent>
     
    </Card>
  )
}
