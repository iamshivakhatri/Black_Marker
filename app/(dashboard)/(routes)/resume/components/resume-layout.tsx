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
  const { projectData, skillsData, experienceData, educationData } = useGlobalContext();
  console.log("This is projectData in resume layout", projectData)

  return (
    <div className="w-3/4 h-full">
      <h1>{data.name}</h1>
      <p>{data.email}</p>

      {/* Personal information */}
      <h1>Personal Information</h1>
        

      {/* Education */}
      <h1> Education </h1>
      {educationData.map((education, index) => (
        <div key={index}>
          <h1>{education.university}</h1>
          <p>Degree: {education.major}</p>
          <p>Level: {education.level}</p>
          <p>Graduation Date: {education.graduation_date}</p>
          <p>Coursework: {education.coursework}</p>
        </div>
      ))}


       <div className="border-b  mt-2 mb-2" > </div>   
       {/* Experience */}
        <h1> Experience </h1>
        {experienceData.map((experience, index) => (
          <div key={index} >
            <h1>{experience.company}</h1>
            <p>Position: {experience.title}</p>
            <p>From: {experience.start_date}</p>
            <p>To: {experience.end_date}</p>
            <p>Description: {experience.detailed_experience}</p>
          </div>
        ))}

       <div className="border-b  mt-2 mb-2" > </div>

      {/* Project */}
      <div>
        <h1>Projects</h1>
        {projectData.map((project, index) => (
          <div key={index}>
            <h1>{project.name}</h1>
            <p>Language: {project.language}</p>
            <p>Description: {project.description}</p>
          </div>
        ))}
      </div>

      <div className="border-b  mt-2 mb-2" > </div>   

       {/* Skills */}
       <div>
        <h1>Skills</h1>
        {skillsData.map((skill, index) => (
          <div key={index}>
            <p>Language: {skill.languages}</p>
            <p>Description: {skill.frameworks}</p>
          </div>
        ))}
      </div>

      <div className="border-b  mt-2 mb-2" > </div>




    </div>
  );
};

export default ResumeLayout;
