"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';

type ProjectDataType = {
  name: string;
  language: string;
  description: string;
};

type UserData = {
  userId: string;
  score: number;
};

type Skill = {
  languages: string;
  frameworks: string;

};

type Experience = {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  detailed_experience: string;

};

type Education = {
  university: string;
  major: string;
  gpa: string;
  level: string;
  graduation_date: string;
  coursework: string;
};


type GlobalContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  projectData: ProjectDataType[];
  addProjectData: (projects: ProjectDataType[]) => void;
  userData: UserData[];
  addUserData: (userData: UserData) => void;
  setUserData: Dispatch<SetStateAction<UserData[]>>;

  // skills
  skillsData: Skill[];
  addSkillsData: (skills: Skill[]) => void;

  // Experience
  experienceData: Experience[];
  addExperienceData: (experience: Experience[]) => void;

  // Education
  educationData: Education[];
  addEducationData: (education: Education[]) => void;

};

const GlobalContext = createContext<GlobalContextType>({
  userId: '',
  setUserId: () => {},
  projectData: [],
  addProjectData: () => {},
  userData: [],
  addUserData: () => {},
  setUserData: () => {},
  skillsData: [],
  addSkillsData: () => {},

  experienceData: [],
  addExperienceData: () => {},

  educationData: [],
  addEducationData: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [projectData, setProjectData] = useState<ProjectDataType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [educationData, setEducationData] = useState<Education[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log('This is the storedUserData:', storedUserData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const addProjectData = (projects: ProjectDataType[]) => {
    console.log('This is the project:', projects);
    setProjectData(projects);
    console.log('This is the projectData:', projectData);
  };

  const addUserData = (userDataItem: UserData) => {
    setUserData((prevData) => [...prevData, userDataItem]);
    localStorage.setItem('userData', JSON.stringify([...userData, userDataItem]));
  };

  const addSkillsData = (skills: Skill[]) => {
    setSkillsData(skills);
  }

  const addExperienceData = (experience: Experience[]) => {
    setExperienceData(experience);
  }

  const addEducationData = (education: Education[]) => {
    setEducationData(education);
  }


  return (
    <GlobalContext.Provider value={{ 
      userId, setUserId, projectData, addProjectData, userData, addUserData, setUserData,
      skillsData, addSkillsData , experienceData, addExperienceData, educationData, addEducationData
      
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
