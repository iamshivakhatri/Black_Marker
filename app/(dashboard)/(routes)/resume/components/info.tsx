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

interface InfoProps {
    data: {
        type: string
    }
}

export function Info({ data }: InfoProps) {
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
            <div className="grid grid-cols-2 items-center gap-4 mb-5">
                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="framework">Email</Label>
                <Input id={`email-${index}`} placeholder="Johndoe@gmail.com" />
                </div>
              
             
                <div className="space-y-2">
                <Label htmlFor="framework">Address</Label>
               <Input id={`address-${index}`} placeholder="90 hidden valley drive" />
               </div>
               <div className="space-y-2"> 
                <Label htmlFor="framework">Website</Label>
               <Input id={`website-${index}`} placeholder="https://shivakhatri.com.np" />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Github</Label>
               <Input id={`github-${index}`} placeholder="https://github.com/iamshivakhatri" />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Phone Number</Label>
               <Input id={`phone-${index}`} placeholder="000-000-0000" />
               </div>

               <div className="space-y-2">
                <Label htmlFor="framework">Linkedin</Label>
               <Input id={`linkedin-${index}`} placeholder="https://linkedin.com/iamshivakhatri" />
               </div>
               
            
            </div>
          </form>
        ))}
      </CardContent>
    
    </Card>
  )
}
