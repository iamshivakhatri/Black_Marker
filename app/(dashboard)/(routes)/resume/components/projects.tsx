"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGlobalContext } from '@/context/global-context';
import { add } from 'date-fns';
import { Delete } from 'lucide-react';

interface ProjectsProps {
  data: {
    type: string;
  };
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { addProjectData } = useGlobalContext();
  const [formCount, setFormCount] = useState(1);
  const [projects, setProjects] = useState<Array<{ name: string; language: string; description: string }>>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
      setFormCount(JSON.parse(storedProjects).length);
    }

  },[]);


 

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleChange = (index: number, key: string, value: string) => {
  
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [key]: value };
    setProjects(updatedProjects);
  };

  const handleSaveProject = () => {
    // projects.forEach(project => addProjectData(project));
    localStorage.setItem('projects', JSON.stringify(projects));
    addProjectData(projects);
  };
  const handleDeleteAll = () => {
    localStorage.removeItem('projects');
    setProjects([]);
    addProjectData([]);
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
          <form key={index}>
            <div className="grid w-full items-center gap-4 mb-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Input
                  id={`name-${index}`}
                  placeholder="Name of your project"
                  onChange={e => handleChange(index, 'name', e.target.value)}
                  value={projects[index]?.name || ''}
                />
              </div>
              <Label htmlFor={`language-${index}`}>Language</Label>
              <Input
                id={`language-${index}`}
                placeholder="Typescript, React, Tailwind"
                onChange={e => handleChange(index, 'language', e.target.value)}
                value={projects[index]?.language || ''}
              />

              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                placeholder="Description of your project"
                onChange={e => handleChange(index, 'description', e.target.value)}
                value={projects[index]?.description || ''}
              />
            </div>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className='mr-1' onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveProject}>Save Projects</Button>
      </CardFooter>
    </Card>
  );
};
