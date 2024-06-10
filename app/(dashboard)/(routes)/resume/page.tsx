"use client";

import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ResumeInput from './components/resume-input';
import ResumeLayout from "./components/resume-layout"
import { useGlobalContext } from '@/context/global-context';
const Resume = () => {
    const [resumeData, setResumeData] = useState({
        name: '',
        email: '',
        // Add more fields as needed
    });

    const handleInputChange = (key: string, value: string) => {
        setResumeData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    return (
        <div className="mx-auto flex flex-col lg:flex-row lg:max-w-7xl xl:max-w-[90vw] 2xl:max-w-14xl gap-10 mb-20">
        <ResumeInput onChange={handleInputChange} />
        <ResumeLayout data={resumeData}  />
      </div>
      


    );
};

export default Resume;
