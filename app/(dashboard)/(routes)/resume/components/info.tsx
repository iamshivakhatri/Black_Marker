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
import e from "express"
import { add, set } from "date-fns"
import { useGlobalContext } from "@/context/global-context"

interface InfoProps {
    data: {
        type: string
    }
}

export function Info({ data }: InfoProps) {
  const {addPersonalData} = useGlobalContext();
  const [formCount, setFormCount] = React.useState(1);
  const [personal, setPersonal] = React.useState<Array<{name: string; gpa: string; email: string; city: string; state: string; website: string; github: string; phone: string; linkedin: string }>>([]);

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleChange = (index: number, key: string, value: string) => {
    console.log("this is value", value)
    console.log("this is key", key)
    const updatedPersonal = [...personal];
    updatedPersonal[index] = {...updatedPersonal[index],  [key]: value};
    setPersonal(updatedPersonal);

  }

  const handleSavePersonal = () => {
    console.log("This is handleSaveEducation",personal);
    addPersonalData(personal);

  }

  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <CardTitle>{data.type}</CardTitle>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index} >
            <div className="grid grid-cols-2 items-center gap-4 mb-5">
                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                id="name" 
                placeholder="John Doe" 
                onChange={e => handleChange(index, 'name', e.target.value)}

                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="framework">Email</Label>
                <Input 
                id={`email-${index}`} 
                placeholder="Johndoe@gmail.com" 
                onChange={e => handleChange(index, 'email', e.target.value)}

                />
                </div>
              
             
                <div className="space-y-2">
                <Label htmlFor={`city-${index}`} >City</Label>
               <Input 
               id={`city-${index}`} 
               placeholder="Cincinnati" 
               onChange={e => handleChange(index, 'city', e.target.value)}

               
               />
               </div>

               <div className="space-y-2">
                <Label htmlFor={`state-${index}`} >State</Label>
               <Input 
               id={`state-${index}`} 
               placeholder="Ohio" 
               onChange={e => handleChange(index, 'state', e.target.value)}
               />

               </div>


               <div className="space-y-2"> 
                <Label htmlFor={`website-${index}`}>Website</Label>
               <Input 
               id={`website-${index}`} 
               placeholder="https://shivakhatri.com.np" 
               onChange={e => handleChange(index, 'website', e.target.value)}

               />
               </div>

               <div className="space-y-2">
                <Label htmlFor={`github-${index}`}>Github</Label>
               <Input
                id={`github-${index}`} 
                placeholder="https://github.com/iamshivakhatri" 
                onChange={e => handleChange(index, 'github', e.target.value)}

                />
               </div>

               <div className="space-y-2">
                <Label htmlFor={`phone-${index}`}>Phone Number</Label>
               <Input 
               id={`phone-${index}`} 
               placeholder="000-000-0000" 
               onChange={e => handleChange(index, 'phone', e.target.value)}

               />
               </div>

               <div className="space-y-2">
                <Label htmlFor={`linkedin-${index}`}>Linkedin</Label>
               <Input 
               id={`linkedin-${index}`}
                placeholder="https://linkedin.com/iamshivakhatri" 
                onChange={e => handleChange(index, 'linkedin', e.target.value)}
                
                />
               </div>
               
            
            </div>
          </form>
        ))}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSavePersonal}>Save Prersonal Info</Button>
      </CardFooter>
    
    </Card>
  )
}
