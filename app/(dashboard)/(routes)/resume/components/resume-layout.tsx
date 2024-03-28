"use client";
import React from "react";
import { useGlobalContext } from "@/context/global-context";

interface ResumeLayoutProps {
  data: {
    name: string;
    email: string;
    // Add more fields as needed
  };
}

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ data }) => {
  const { projectData } = useGlobalContext();

  return (
    <div className="flex-1">
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <div>
        <h2>Projects</h2>
        {projectData.map((project, index) => (
          <div key={index}>
            <h3>{project.name}</h3>
            <p>Language: {project.language}</p>
            <p>Description: {project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeLayout;
