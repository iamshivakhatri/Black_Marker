// GlobalContext.tsx
"use client";
import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

type ProjectDataType = {
  name: string;
  language: string;
  description: string;
};

type UserData = {
  userId: string;
  score: number;
};

type GlobalContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  projectData: ProjectDataType[];
  addProjectData: (project: ProjectDataType) => void;
  userData: UserData[];
  addUserData: (userData: UserData) => void;
};

const GlobalContext = createContext<GlobalContextType>({
  userId: '',
  setUserId: () => {},
  projectData: [],
  addProjectData: () => {},
  userData: [],
  addUserData: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [projectData, setProjectData] = useState<ProjectDataType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);

  const addProjectData = (project: ProjectDataType) => {
    setProjectData(prevData => [...prevData, project]);
  };

  const addUserData = (userData: UserData) => {
    setUserData(prevData => [...prevData, userData]);
  };

  return (
    <GlobalContext.Provider value={{ userId, setUserId, projectData, addProjectData, userData, addUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
