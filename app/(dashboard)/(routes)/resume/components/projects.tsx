"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGlobalContext } from '@/context/global-context';

interface ProjectsProps {
  data: {
    type: string;
  };
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { addProjectData } = useGlobalContext();
  const [formCount, setFormCount] = useState(1);
  const [projects, setProjects] = useState<Array<{ name: string; language: string; description: string }>>([]);

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updatedProjects = [...projects];
    console.log(value);
  };

  const handleSaveProject = () => {
    projects.forEach(project => addProjectData(project));
    setProjects([]);
    setFormCount(1);
  };

  return (
    <Card className="grid-cols-2 gap-x-4 gap-y-8">
      <CardHeader>
        <CardTitle>{data.type}</CardTitle>
      </CardHeader>
      <CardContent>
        {[...Array(formCount)].map((_, index) => (
          <form key={index}>
            <div className="grid w-full items-center gap-4 mb-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Input
                  id={`name-${index}`}
                  placeholder="Name of your project"
                  onChange={e => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <Label htmlFor={`language-${index}`}>Language</Label>
              <Input
                id={`language-${index}`}
                placeholder="Typescript, React, Tailwind"
                onChange={e => handleChange(index, 'language', e.target.value)}
              />

              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                placeholder="Description of your project"
                onChange={e => handleChange(index, 'description', e.target.value)}
              />
            </div>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveProject}>Save Projects</Button>
      </CardFooter>
    </Card>
  );
};
