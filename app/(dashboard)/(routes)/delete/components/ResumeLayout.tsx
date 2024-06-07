"use client";

import React from "react";
import dynamic from "next/dynamic";
import MyDocument from "./MyDocument";
import { useGlobalContext } from "@/context/global-context";
import { useEffect } from "react";

// Dynamically import the PDFViewer component to ensure it only runs on the client side
const PDFViewer = dynamic(() => import("@react-pdf/renderer").then(mod => mod.PDFViewer), { ssr: false });

const ResumeLayout: React.FC = () => {
  const { projectData, skillsData, experienceData, educationData, personalData } = useGlobalContext();

 

  return (
    <div className="w-3/4 h-full flex flex-col items-center justify-center">
      <PDFViewer width="826px" height="1066px" style={{ border: '1px solid red', margin: '20px 0' }}>
        <MyDocument 
          projectData={projectData}
          skillsData={skillsData}
          experienceData={experienceData}
          educationData={educationData}
          personalData={personalData}
        />
      </PDFViewer>
    </div>
  );
};

export default ResumeLayout;
