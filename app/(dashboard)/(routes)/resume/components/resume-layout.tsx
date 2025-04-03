"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/global-context";
import MyDocument from "./MyDocument";
import EditableResume from "./editable-resume";
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
  const [showPdfView, setShowPdfView] = useState(true);

  const toggleView = () => {
    setShowPdfView(!showPdfView);
  };

  return (
    // 826 1066
    <div className=" md:w-3/4  md:flex md:justify-center mx-auto">
      <div className="w-full max-w-screen-md">
        {showPdfView ? (
          <PDFViewer className="mobile-viewer" style={{  margin: '20px 0', width: '100%', height:'100%' }}>
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
        ) : (
          <EditableResume togglePdfView={toggleView} />
        )}
      </div>
    </div>

  );
};

export default ResumeLayout;