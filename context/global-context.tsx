// GlobalContext.tsx
"use client";
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from 'react';

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
  setUserData: Dispatch<SetStateAction<UserData[]>>;
};

const GlobalContext = createContext<GlobalContextType>({
  userId: '',
  setUserId: () => {},
  projectData: [],
  addProjectData: () => {},
  userData: [],
  addUserData: () => {},
  setUserData: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC = ({ children }) => {

  const [userId, setUserId] = useState('');
  const [projectData, setProjectData] = useState<ProjectDataType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log('This is the storedUserData:', storedUserData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const addProjectData = (project: ProjectDataType) => {
    setProjectData(prevData => [...prevData, project]);
  };

  const addUserData = (userDataItem: UserData) => {
    setUserData(prevData => [...prevData, userDataItem]);
    localStorage.setItem('userData', JSON.stringify([...userData, userDataItem]));
  };

  return (
    <GlobalContext.Provider value={{ userId, setUserId, projectData, addProjectData, userData, addUserData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
