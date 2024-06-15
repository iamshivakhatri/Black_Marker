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
import { useGlobalContext } from '@/context/global-context';
import { useState, useEffect } from "react";
import { set } from "react-hook-form"
import { Delete } from 'lucide-react';
import { toast } from "react-hot-toast";




interface SkillsProps {
    data: {
        type: string
    }
}

export function Skills({ data }: SkillsProps) {
  const {addSkillsData} = useGlobalContext();
  const [formCount, setFormCount] = React.useState(1);
  const [skills, setSkills] = useState<Array<{ languages: string; frameworks: string;  }>>([]);


  useEffect(() => {
    const storedSkills = localStorage.getItem('skills');
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }

  }, []);


  const handleChange = (index: number, key: string, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [key]: value };
    setSkills(updatedSkills);

  }

  const handleSaveSkills = () => {
    addSkillsData(skills);
    localStorage.setItem('skills', JSON.stringify(skills));
    toast.success('Skills Added on Resume');

  };

  const handleDeleteAll = () => {
    setSkills([]);
    localStorage.removeItem('skills');
    addSkillsData([]);
  }


  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
      <div className="flex justify-between">
        <CardTitle>{data.type}</CardTitle>
        <Delete  className="cursor-pointer" size={24} onClick={handleDeleteAll}  />
        </div>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index} >
            <div className="grid w-full items-center gap-4 mb-5">
              <Label htmlFor="framework">Languages</Label>
              <Input
               id={`university-${index}`} 
               placeholder="Javascript, Java, Python, C++, C ..." 
               onChange={e => handleChange(index, 'languages', e.target.value)}
               value={skills[index]?.languages || ''}
               />
              <Label htmlFor="framework">Frameworks</Label>
              <Input
               id={`university-${index}`} placeholder="React, Flask, Django, Angular ..." 
               onChange={e => handleChange(index, 'frameworks', e.target.value)}
               value={skills[index]?.frameworks || ''}
               
               />
            
            
            </div>
          </form>
        ))}


      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSkills}>Save Skills</Button>
      </CardFooter>
      
    
    </Card>
  )
}
