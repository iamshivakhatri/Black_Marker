"use client";

import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ResumeInput from './components/resume-input';
import ResumeLayout from "./components/resume-layout"
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
<div className="mx-auto md:max-w-7xl flex-col sm:flex lg:flex lg:max-w-7xl xl:max-w-[90vw] 2xl:max-w-14xl space-x-5 space-y-5">

            <ResumeInput onChange={handleInputChange} />
            <ResumeLayout data={resumeData} />
        </div>
    );
};

export default Resume;
