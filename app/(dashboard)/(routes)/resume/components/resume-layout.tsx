"use client";
import React from "react";
import { useGlobalContext } from "@/context/global-context";
import MyDocument from "./MyDocument";
import dynamic from "next/dynamic";

interface ResumeLayoutProps {
  data: {
    name: string;
    email: string;
    // Add more fields as needed
  };
}

const PDFViewer = dynamic(() => import("@react-pdf/renderer").then(mod => mod.PDFViewer), { ssr: false });

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ data }) => {
  const { projectData, skillsData, experienceData, educationData, personalData, font, fontSize } = useGlobalContext();
  console.log('This is the font:', font);
  console.log('This is the fontSize:', fontSize);


  return (
    // 826 1066
    <div className="w-3/4 h-full flex justify-center">
  
      <PDFViewer width="826px" height="1066px" style={{ border: '1px solid red', margin: '20px 0' }}>
        <MyDocument 
          projectData={projectData}
          skillsData={skillsData}
          experienceData={experienceData}
          educationData={educationData}
          personalData={personalData}
          font={font}
          fontSize={fontSize}
        />
      </PDFViewer>




    </div>

  );
};

export default ResumeLayout;