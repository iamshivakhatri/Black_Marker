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
import { toast } from "react-hot-toast";

interface ProjectsProps {
  data: {
    type: string;
  };
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { addProjectData } = useGlobalContext();
  const [formCount, setFormCount] = useState(1);
  const [projects, setProjects] = useState<Array<{ name: string; language: string; description: string; github: string }>>([]);

  useEffect(() => {
    const loadProjectData = () => {
      const storedProjects = localStorage.getItem('projectData');
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        setProjects(parsedProjects);
        setFormCount(Math.max(parsedProjects.length, 1));
      }
    };

    // Initial load
    loadProjectData();
    
    // Listen for storage events (triggered when AI generates data)
    const handleStorageChange = () => {
      loadProjectData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
  };

  const handleChange = (index: number, key: string, value: string) => {
  
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [key]: value };
    setProjects(updatedProjects);
  };

  const handleSaveProjects = () => {
    localStorage.setItem('projectData', JSON.stringify(projects));
    addProjectData(projects);
    toast.success('Projects Added on Resume');

  };

  const handleDeleteAll = () => {
    localStorage.removeItem("projectData");
    setProjects([]);
    addProjectData([]);
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    localStorage.setItem('projectData', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setFormCount(prevCount => prevCount - 1);
    addProjectData(updatedProjects);
  };

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
                <div className='flex justify-between items-center'> 
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Button className="text-red-500" onClick={() => handleDeleteProject(index)}>-</Button>
                </div>

                
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
               <Label htmlFor={`github-${index}`}>Github</Label>
              <Input
                id={`github-${index}`}
                placeholder="Github link"
                onChange={e => handleChange(index, 'github', e.target.value)}
                value={projects[index]?.github || ''}
              />

              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                placeholder="Description of your project"
                onChange={e => handleChange(index, 'description', e.target.value)}
                value={projects[index]?.description || ''}
              />
            </div>
            {index < formCount - 1 && <hr className="border-gray-600 mb-5" />}

          </form>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className='mr-1' onClick={handleAddForm}>+1</Button>
        <Button onClick={handleSaveProjects}>Save Projects</Button>
      </CardFooter>
    </Card>
  );
};
