import * as React from "react"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useGlobalContext } from "@/context/global-context"
import { add } from "date-fns"


const LayoutTools = () => {
    const [font, setFont] = useState("Carlito");
    const [fontSize, setFontSize] = useState(10.5); // Convert the initial value to a string
    const { addFont, addFontSize } = useGlobalContext();

    useEffect(() => {
        addFont(font);
        addFontSize(fontSize);
    }, []);

    const handleFontChange = (value: string) => {
        setFont(value);
        addFont(value);
    };

    const handleFontSizeChange = (value: string) => {
        const numberValue = parseFloat(value);
        setFontSize(numberValue); // Convert the number value to a string
        addFontSize(numberValue);
    };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Layout</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-8">
        <div className="space-y-2">
        <Label htmlFor="Font">Level</Label>

        
        <Select defaultValue="Carlito" onValueChange={handleFontChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fonts</SelectLabel>
              <SelectItem value="Carlito">Carlito</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

        <div className="space-y-2">
        <Label htmlFor="Font Size">Font Size</Label>
       
        
        <Select defaultValue="10.5" onValueChange={handleFontSizeChange}>
          <SelectTrigger className="w-[180px] mt-4">
            <SelectValue placeholder="Select font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Font Sizes</SelectLabel>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="9.5">9.5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="10.5">10.5</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="11.5">11.5</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LayoutTools;
